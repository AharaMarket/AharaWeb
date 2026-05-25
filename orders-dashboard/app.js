import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import {
  getAuth,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  writeBatch,
  where,
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

// ── Firebase config ───────────────────────────────────────────────────────────
const LOCAL_CONFIG_KEY = 'AHARA_FIREBASE_CONFIG';

function isValidFirebaseConfig(config) {
  return Boolean(
    config &&
    typeof config === 'object' &&
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.apiKey !== 'REPLACE_ME',
  );
}

function getStoredConfig() {
  try {
    const raw = localStorage.getItem(LOCAL_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function renderSetupScreen() {
  document.body.innerHTML = `
    <main style="max-width:760px;margin:32px auto;padding:0 16px;">
      <section class="card">
        <div class="eyebrow">Setup required</div>
        <h3 style="margin:0 0 10px">Paste your Firebase Web config</h3>
        <p class="muted" style="margin-bottom:12px;">From Firebase Console &rarr; Project settings &rarr; Your apps &rarr; Web app.</p>
        <textarea id="firebaseConfigJson" rows="10" style="width:100%;border:1px solid #e6ecf7;border-radius:14px;padding:12px;font-family:ui-monospace,monospace;font-size:12px;">{
  "apiKey": "",
  "authDomain": "",
  "projectId": "",
  "storageBucket": "",
  "messagingSenderId": "",
  "appId": ""
}</textarea>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button id="saveFirebaseConfigBtn">Save and reload</button>
          <button id="clearFirebaseConfigBtn" class="ghost">Clear saved config</button>
        </div>
        <p id="setupMsg" class="muted" style="margin-top:10px;"></p>
        <p class="muted" style="margin-top:14px;">Alternatively, edit <strong>orders-dashboard/config.js</strong> directly.</p>
      </section>
    </main>`;

  const textarea = document.getElementById('firebaseConfigJson');
  const saveBtn  = document.getElementById('saveFirebaseConfigBtn');
  const clearBtn = document.getElementById('clearFirebaseConfigBtn');
  const setupMsg = document.getElementById('setupMsg');
  const existing = getStoredConfig();
  if (existing) textarea.value = JSON.stringify(existing, null, 2);

  saveBtn.addEventListener('click', () => {
    try {
      const parsed = JSON.parse(textarea.value);
      if (!isValidFirebaseConfig(parsed)) {
        setupMsg.textContent = 'Config is invalid.';
        return;
      }
      localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(parsed));
      window.location.reload();
    } catch {
      setupMsg.textContent = 'Invalid JSON. Please paste a valid Firebase config object.';
    }
  });

  clearBtn.addEventListener('click', () => {
    localStorage.removeItem(LOCAL_CONFIG_KEY);
    setupMsg.textContent = 'Saved config cleared.';
  });
}

const cfg = isValidFirebaseConfig(window.AHARA_FIREBASE_CONFIG)
  ? window.AHARA_FIREBASE_CONFIG
  : getStoredConfig();

if (!isValidFirebaseConfig(cfg)) {
  renderSetupScreen();
  throw new Error('Missing Firebase config.');
}

const app  = initializeApp(cfg);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── DOM refs ──────────────────────────────────────────────────────────────────
const authScreenEl      = document.getElementById('authScreen');
const dashboardAppEl    = document.getElementById('dashboardApp');
const authMessageEl     = document.getElementById('authMessage');
const authTabEls        = document.querySelectorAll('[data-auth-view]');
const openViewEls       = document.querySelectorAll('[data-open-view]');
const signInFormEl      = document.getElementById('signInForm');
const signUpFormEl      = document.getElementById('signUpForm');
const forgotFormEl      = document.getElementById('forgotForm');
const signInEmailEl     = document.getElementById('signInEmail');
const signInPasswordEl  = document.getElementById('signInPassword');
const rememberMeEl      = document.getElementById('rememberMe');
const signUpNameEl      = document.getElementById('signUpName');
const signUpEmailEl     = document.getElementById('signUpEmail');
const signUpPasswordEl  = document.getElementById('signUpPassword');
const signUpConfirmEl   = document.getElementById('signUpConfirmPassword');
const forgotEmailEl     = document.getElementById('forgotEmail');
const signOutBtn        = document.getElementById('signOutBtn');
const authStateEl       = document.getElementById('authState');
const connectionHintEl  = document.getElementById('connectionHint');
const collectionLabelEl = document.getElementById('collectionLabel');
const summaryGridEl     = document.getElementById('summaryGrid');
const statusBucketsEl   = document.getElementById('statusBuckets');
const typeBucketsEl     = document.getElementById('typeBuckets');
const monthBucketsEl    = document.getElementById('monthBuckets');
const historySectionEl  = document.getElementById('historySection');
const ordersViewTabEl   = document.getElementById('ordersViewTab');
const ordersEditTabEl   = document.getElementById('ordersEditTab');
const ordersTableEl     = document.getElementById('ordersTableBody');
const tableCountEl      = document.getElementById('tableCount');
const resultsSummaryEl  = document.getElementById('resultsSummary');
const activeFiltersEl   = document.getElementById('activeFilters');
const datePresetEl      = document.getElementById('datePreset');
const categoryFilterEl  = document.getElementById('categoryFilter');
const typeFilterEl      = document.getElementById('typeFilter');
const statusFilterEl    = document.getElementById('statusFilter');
const searchEl          = document.getElementById('searchInput');
const clearFiltersBtn   = document.getElementById('clearFiltersBtn');

// ── State ─────────────────────────────────────────────────────────────────────
let allOrders    = [];
let stopWatching = null;
let stopCategoriesWatch = null;
let allCategories = [];
let stopCatalogWatch = null;
let catalogPriceMap = new Map(); // lowerName -> { price, unit }
let catalogPriceNormalizedMap = new Map(); // normalizedName -> { price, unit }
let stopGlobalCatalogRootWatch = null;
const stopGlobalCatalogItemWatchByKey = new Map();
const globalCatalogDistributorPriceMapByKey = new Map();
const globalCatalogDistributorPriceNormMapByKey = new Map();
const globalCatalogRootKeys = new Set();
const globalCatalogOrderKeys = new Set();
let globalCatalogRenderTimer = null;
let globalCatalogPriceMap = new Map(); // lowerName -> { price, unit }
let globalCatalogPriceNormalizedMap = new Map(); // normalizedName -> { price, unit }
let currentUser = null;
let currentCollectionPath = '';
let currentGroupId = '';
let currentCategoriesPath = '';
let dataSourceMode = '';
let lastRenderedOrders = [];
let ordersMode = 'view';
const selectedOrderIds = new Set();
const selectedItemRefs = new Set();
const SOURCE_PREF_KEY = 'AHARA_ORDER_DASH_SOURCE_PREF';
const BACKEND_BASE_URL = window.AHARA_BACKEND_BASE_URL || 'http://localhost:5050';
const ITEM_REF_SEPARATOR = '::';

ordersTableEl.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-detail-toggle]');
  if (!btn) return;
  const detailId = btn.getAttribute('data-detail-toggle');
  const detailRow = document.getElementById(detailId);
  if (!detailRow) return;
  const isOpen = !detailRow.classList.contains('hidden');
  detailRow.classList.toggle('hidden', isOpen);
  btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  btn.querySelector('.arrow')?.classList.toggle('open', !isOpen);
});

ordersViewTabEl?.addEventListener('click', () => setOrdersMode('view'));
ordersEditTabEl?.addEventListener('click', () => setOrdersMode('edit'));

function setOrdersMode(mode) {
  ordersMode = mode === 'edit' ? 'edit' : 'view';
  const viewMode = ordersMode === 'view';
  historySectionEl?.classList.toggle('mode-view', viewMode);
  historySectionEl?.classList.toggle('mode-edit', !viewMode);
  ordersViewTabEl?.classList.toggle('active', viewMode);
  ordersEditTabEl?.classList.toggle('active', !viewMode);
  ordersViewTabEl?.setAttribute('aria-selected', viewMode ? 'true' : 'false');
  ordersEditTabEl?.setAttribute('aria-selected', viewMode ? 'false' : 'true');
  if (!viewMode) {
    // Reset all filters when entering edit mode
    const datePresetEl   = document.getElementById('datePreset');
    const typeFilterEl   = document.getElementById('typeFilter');
    const statusFilterEl = document.getElementById('statusFilter');
    const searchInputEl  = document.getElementById('searchInput');
    if (datePresetEl)   datePresetEl.value   = datePresetEl.options[0]?.value ?? 'all';
    if (categoryFilterEl) categoryFilterEl.value = 'all';
    if (typeFilterEl)   typeFilterEl.value   = 'all';
    if (statusFilterEl) statusFilterEl.value = 'all';
    if (searchInputEl)  searchInputEl.value  = '';
    applyFiltersAndRender();
  }
}

setOrdersMode('view');

function getItemRefsForOrder(orderId) {
  const order = allOrders.find((o) => String(o.id) === String(orderId));
  if (!order) return [];
  const normalizedOrderId = String(order.id);
  return extractOrderItems(order)
    .filter((item) => item?.itemKey)
    .map((item) => normalizedOrderId + ITEM_REF_SEPARATOR + item.itemKey);
}

function syncOrderCheckboxUi(orderId) {
  const normalized = String(orderId);
  const isChecked = selectedOrderIds.has(normalized);
  const orderCheckboxes = ordersTableEl.querySelectorAll('input[data-order-select]');
  for (const input of orderCheckboxes) {
    if (String(input.getAttribute('data-order-select')) === normalized) {
      input.checked = isChecked;
    }
  }
}

function syncItemCheckboxesUi(orderId) {
  const prefix = String(orderId) + ITEM_REF_SEPARATOR;
  const itemCheckboxes = ordersTableEl.querySelectorAll('input[data-item-select]');
  for (const input of itemCheckboxes) {
    const ref = String(input.getAttribute('data-item-select') || '');
    if (!ref.startsWith(prefix)) continue;
    input.checked = selectedItemRefs.has(ref);
  }
}

ordersTableEl.addEventListener('change', (event) => {
  const checkbox = event.target.closest('[data-order-select]');
  if (checkbox) {
    const orderId = checkbox.getAttribute('data-order-select');
    if (!orderId) return;
    const normalizedOrderId = String(orderId);
    const itemRefs = getItemRefsForOrder(normalizedOrderId);
    if (checkbox.checked) {
      selectedOrderIds.add(normalizedOrderId);
      for (const ref of itemRefs) selectedItemRefs.add(ref);
    } else {
      selectedOrderIds.delete(normalizedOrderId);
      for (const ref of itemRefs) selectedItemRefs.delete(ref);
    }
    syncItemCheckboxesUi(normalizedOrderId);
    refreshSelectionUI();
    return;
  }

  const itemCheckbox = event.target.closest('[data-item-select]');
  if (!itemCheckbox) return;
  const itemRef = itemCheckbox.getAttribute('data-item-select');
  if (!itemRef) return;
  if (itemCheckbox.checked) selectedItemRefs.add(itemRef);
  else selectedItemRefs.delete(itemRef);

  const sep = itemRef.indexOf(ITEM_REF_SEPARATOR);
  const orderId = sep >= 0 ? itemRef.slice(0, sep) : '';
  if (orderId) {
    const orderItemRefs = getItemRefsForOrder(orderId);
    if (orderItemRefs.length && orderItemRefs.every((ref) => selectedItemRefs.has(ref))) {
      selectedOrderIds.add(orderId);
    } else {
      selectedOrderIds.delete(orderId);
    }
    syncOrderCheckboxUi(orderId);
  }

  refreshSelectionUI();
});

// ── Auth ──────────────────────────────────────────────────────────────────────
authTabEls.forEach((btn) => {
  btn.addEventListener('click', () => setAuthView(btn.dataset.authView));
});
openViewEls.forEach((btn) => {
  btn.addEventListener('click', () => setAuthView(btn.dataset.openView));
});

signInFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  showAuthMessage('');
  const email = signInEmailEl.value.trim();
  const password = signInPasswordEl.value;
  if (!email || !password) {
    showAuthMessage('Email and password are required.', 'error');
    return;
  }
  try {
    await setPersistence(auth, rememberMeEl.checked ? browserLocalPersistence : browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    showAuthMessage(e.message || 'Unable to sign in.', 'error');
  }
});

signUpFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  showAuthMessage('');
  const email = signUpEmailEl.value.trim();
  const password = signUpPasswordEl.value;
  const confirm = signUpConfirmEl.value;
  const name = signUpNameEl.value.trim();
  if (!email || !password || !confirm) {
    showAuthMessage('Please fill all required fields.', 'error');
    return;
  }
  if (password !== confirm) {
    showAuthMessage('Passwords do not match.', 'error');
    return;
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    showAuthMessage('Account created successfully.', 'success');
    setAuthView('signin');
    signInEmailEl.value = email;
    signInPasswordEl.value = '';
  } catch (e) {
    showAuthMessage(e.message || 'Unable to create account.', 'error');
  }
});

forgotFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  showAuthMessage('');
  const email = forgotEmailEl.value.trim();
  if (!email) {
    showAuthMessage('Email is required.', 'error');
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    showAuthMessage('Password reset email sent.', 'success');
  } catch (e) {
    showAuthMessage(e.message || 'Unable to send reset email.', 'error');
  }
});

signOutBtn.addEventListener('click', async () => {
  try { await signOut(auth); }
  catch (e) { showAuthMessage(e.message || String(e), 'error'); }
});

onAuthStateChanged(auth, (user) => {
  currentUser = user || null;
  const isSignedIn = Boolean(user);
  authScreenEl.classList.toggle('hidden', isSignedIn);
  dashboardAppEl.classList.toggle('hidden', !isSignedIn);
  authStateEl.textContent = isSignedIn
    ? 'Signed in · ' + (user.email ?? user.uid)
    : 'Not signed in';

  if (!isSignedIn) {
    if (stopWatching) { stopWatching(); stopWatching = null; }
    if (stopCategoriesWatch) { stopCategoriesWatch(); stopCategoriesWatch = null; }
    if (stopCatalogWatch)    { stopCatalogWatch();    stopCatalogWatch    = null; }
    if (stopGlobalCatalogRootWatch) { stopGlobalCatalogRootWatch(); stopGlobalCatalogRootWatch = null; }
    stopAllGlobalCatalogItemWatches();
    catalogPriceMap = new Map();
    catalogPriceNormalizedMap = new Map();
    globalCatalogPriceMap = new Map();
    globalCatalogPriceNormalizedMap = new Map();
    allOrders = [];
    allCategories = [];
    selectedOrderIds.clear();
    selectedItemRefs.clear();
    currentCollectionPath = '';
    currentGroupId = '';
    currentCategoriesPath = '';
    dataSourceMode = '';
    renderCategoryUI();
    applyFiltersAndRender();
    collectionLabelEl.textContent = 'Collection: not configured.';
    connectionHintEl.textContent = 'Sign in to load order history.';
    setAuthView('signin');
    return;
  }

  startDataFeed(user);
});

function resolveCollectionPath(user) {
  const queryPath = new URLSearchParams(window.location.search).get('collection');
  if (queryPath) return sanitizePath(queryPath);

  const saved = getSavedSourcePrefs();
  if (saved.sourceMode === 'custom' && saved.collectionPath) {
    return sanitizePath(saved.collectionPath);
  }
  if (saved.groupId) {
    return 'groups/' + saved.groupId.trim() + '/orders';
  }

  if (window.AHARA_DEFAULT_ORDERS_COLLECTION) {
    return sanitizePath(window.AHARA_DEFAULT_ORDERS_COLLECTION);
  }

  return '';
}

function buildCandidatePaths(user) {
  const paths = [];
  const push = (path) => {
    const clean = sanitizePath(path);
    if (clean && !paths.includes(clean)) paths.push(clean);
  };

  const explicitPath = resolveCollectionPath(user);
  if (explicitPath) push(explicitPath);

  if (user?.uid) {
    push('groups/' + user.uid + '/orders');
    push('restaurants/' + user.uid + '/orders');
  }
  if (user?.email) {
    push('groups/' + user.email + '/orders');
    push('restaurants/' + user.email + '/orders');
  }

  return paths;
}

async function findGroupOrdersPathForUser(user) {
  if (!user?.uid) return '';
  try {
    const q = query(
      collection(db, 'groups'),
      where('admins', 'array-contains', user.uid),
      limit(1),
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return 'groups/' + snap.docs[0].id + '/orders';
    }
  } catch (err) {
    console.warn('Could not resolve group path from groups collection:', err);
  }
  return '';
}

async function startDataFeed(user) {
  connectionHintEl.textContent = 'Resolving order collection…';
  const candidates = buildCandidatePaths(user);
  const discoveredGroupPath = await findGroupOrdersPathForUser(user);
  if (discoveredGroupPath && !candidates.includes(discoveredGroupPath)) {
    candidates.unshift(discoveredGroupPath);
  }
  let index = 0;

  const tryNextPath = (previousError) => {
    if (index >= candidates.length) {
      loadOrdersFromBackend(user, previousError);
      return;
    }
    const path = candidates[index++];
    startWatch(path, {
      onError: (err) => {
        const code = String(err?.code || '');
        const retryable = code.includes('permission-denied')
          || code.includes('not-found')
          || code.includes('failed-precondition')
          || code.includes('unavailable')
          || code.includes('invalid-argument');

        if (retryable) {
          tryNextPath(err);
          return;
        }
        loadOrdersFromBackend(user, err);
      },
    });
  };

  if (!candidates.length) {
    loadOrdersFromBackend(user);
    return;
  }

  tryNextPath();
}

function startWatch(path, options = {}) {
  if (stopWatching) { stopWatching(); stopWatching = null; }
  dataSourceMode = 'firestore';
  currentCollectionPath = path;
  currentGroupId = extractGroupIdFromOrdersPath(path);
  currentCategoriesPath = getCategoriesPathFromOrdersPath(path);
  startCategoriesWatch(currentCategoriesPath);
  startCatalogWatch(currentGroupId);
  startGlobalCatalogWatch();
  connectionHintEl.textContent  = 'Connecting\u2026';
  collectionLabelEl.textContent = 'Collection: ' + path;

  stopWatching = onSnapshot(
    collection(db, path),
    (snap) => {
      allOrders = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => toMs(bestDate(b)) - toMs(bestDate(a)));

      syncGlobalCatalogWatchesFromOrders(allOrders);

      connectionHintEl.textContent = 'Live \u00b7 ' + allOrders.length + ' order' + (allOrders.length === 1 ? '' : 's');
      applyFiltersAndRender();
    },
    (err) => {
      connectionHintEl.textContent = 'Firestore path blocked or unavailable.';
      console.error(err);
      if (typeof options.onError === 'function') {
        options.onError(err);
        return;
      }
      showAuthMessage(err.message || String(err), 'error');
    },
  );
}

async function loadOrdersFromBackend(user, previousError) {
  if (stopWatching) { stopWatching(); stopWatching = null; }
  if (stopCatalogWatch) { stopCatalogWatch(); stopCatalogWatch = null; }
  if (stopGlobalCatalogRootWatch) { stopGlobalCatalogRootWatch(); stopGlobalCatalogRootWatch = null; }
  stopAllGlobalCatalogItemWatches();
  catalogPriceMap = new Map();
  catalogPriceNormalizedMap = new Map();
  globalCatalogPriceMap = new Map();
  globalCatalogPriceNormalizedMap = new Map();
  dataSourceMode = 'backend';
  currentCollectionPath = '';
  currentGroupId = '';
  currentCategoriesPath = '';
  selectedOrderIds.clear();
  selectedItemRefs.clear();
  startCategoriesWatch('');
  startGlobalCatalogWatch();
  const email = user?.email;
  if (!email) {
    connectionHintEl.textContent = 'No readable orders source found.';
    showAuthMessage('Signed in user email is missing.', 'error');
    return;
  }

  try {
    connectionHintEl.textContent = 'Loading via backend API…';
    collectionLabelEl.textContent = 'Source: backend /orders/get';
    const url = BACKEND_BASE_URL + '/orders/get?email=' + encodeURIComponent(email);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Backend API returned ' + response.status);
    }

    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : [];
    allOrders = rows
      .map((row, idx) => ({ id: row.id || row._id || String(idx), ...row }))
      .sort((a, b) => toMs(bestDate(b)) - toMs(bestDate(a)));

    syncGlobalCatalogWatchesFromOrders(allOrders);

    connectionHintEl.textContent = 'API live · ' + allOrders.length + ' order' + (allOrders.length === 1 ? '' : 's');
    applyFiltersAndRender();

    if (previousError) {
      showAuthMessage('Loaded via backend because Firestore path was not accessible.', 'success');
    }
  } catch (err) {
    connectionHintEl.textContent = 'Unable to load orders.';
    const prefix = previousError ? 'Firestore + API failed. ' : '';
    showAuthMessage(prefix + (err.message || String(err)), 'error');
  }
}

function setAuthView(view) {
  const selected = view || 'signin';
  signInFormEl.classList.toggle('hidden', selected !== 'signin');
  signUpFormEl.classList.toggle('hidden', selected !== 'signup');
  forgotFormEl.classList.toggle('hidden', selected !== 'forgot');
  authTabEls.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.authView === selected);
  });
}

function showAuthMessage(message, tone = '') {
  authMessageEl.textContent = message;
  authMessageEl.classList.remove('error', 'success');
  if (tone) authMessageEl.classList.add(tone);
}

function getSavedSourcePrefs() {
  try {
    const raw = localStorage.getItem(SOURCE_PREF_KEY);
    if (!raw) return { sourceMode: 'group', groupId: '', collectionPath: '' };
    const saved = JSON.parse(raw);
    return {
      sourceMode: saved?.sourceMode || 'group',
      groupId: saved?.groupId || '',
      collectionPath: saved?.collectionPath || '',
    };
  } catch {
    return { sourceMode: 'group', groupId: '', collectionPath: '' };
  }
}

function sanitizePath(path) {
  return String(path || '').trim().replace(/^\/+|\/+$/g, '');
}

function extractGroupIdFromOrdersPath(path) {
  const match = String(path || '').match(/^groups\/([^/]+)\/orders$/);
  return match ? match[1] : '';
}

function getCategoriesPathFromOrdersPath(path) {
  const match = String(path || '').match(/^(.*)\/orders$/);
  return match ? (match[1] + '/categories') : '';
}

function chunk(items, size = 450) {
  const parts = [];
  for (let i = 0; i < items.length; i += size) parts.push(items.slice(i, i + size));
  return parts;
}

function ensureCategoryToolbar() {
  if (document.getElementById('categoryToolbar')) return;
  const tableWrap = ordersTableEl.closest('.table-wrap');
  if (!tableWrap || !tableWrap.parentElement) return;

  const toolbar = document.createElement('div');
  toolbar.id = 'categoryToolbar';
  toolbar.className = 'category-toolbar edit-only';
  toolbar.innerHTML = ''
    + '<div class="category-toolbar-row">'
    + '<input id="newCategoryName" type="text" placeholder="Create category" />'
    + '<button id="addCategoryBtn" type="button">Add</button>'
    + '<select id="bulkCategorySelect">'
    + '<option value="">Assign selected to…</option>'
    + '</select>'
    + '<button id="applySelectionCategoryBtn" type="button">Apply to selected</button>'
    + '<button id="selectAllVisibleBtn" class="ghost" type="button">Select visible</button>'
    + '<button id="clearSelectionBtn" class="ghost" type="button">Clear</button>'
    + '<span id="selectedCountLabel" class="muted">0 selected</span>'
    + '</div>'
    + '<p id="categoryToolbarHint" class="muted">Categories are available when Firestore group orders are loaded.</p>'
    + '<div id="categoryPills" class="chips"></div>';

  tableWrap.parentElement.insertBefore(toolbar, tableWrap);

  toolbar.addEventListener('click', async (event) => {
    try {
      const addBtn = event.target.closest('#addCategoryBtn');
      const applySelectionBtn = event.target.closest('#applySelectionCategoryBtn');
      const selectVisibleBtn = event.target.closest('#selectAllVisibleBtn');
      const clearBtn = event.target.closest('#clearSelectionBtn');
      const renameBtn = event.target.closest('[data-rename-cat-id]');
      const archiveBtn = event.target.closest('[data-archive-cat-id]');

      if (addBtn) {
        await createCategoryFromInput();
        return;
      }

      if (applySelectionBtn) {
        await applyCategoryToSelection();
        return;
      }

      if (selectVisibleBtn) {
        for (const order of lastRenderedOrders) {
          if (order?.id != null) selectedOrderIds.add(String(order.id));
        }
        refreshSelectionUI();
        applyFiltersAndRender();
        return;
      }

      if (clearBtn) {
        selectedOrderIds.clear();
        selectedItemRefs.clear();
        refreshSelectionUI();
        applyFiltersAndRender();
        return;
      }

      if (renameBtn) {
        const categoryId = renameBtn.getAttribute('data-rename-cat-id');
        if (!categoryId || !currentCategoriesPath || !currentUser) return;
        const category = allCategories.find((c) => c.id === categoryId);
        const renamed = window.prompt('Rename category', category?.name || '');
        if (!renamed || !renamed.trim()) return;

        const clean = renamed.trim();
        const duplicateQuery = query(
          collection(db, currentCategoriesPath),
          where('nameLower', '==', clean.toLowerCase()),
          where('archived', '==', false),
          limit(1),
        );
        const duplicate = await getDocs(duplicateQuery);
        if (!duplicate.empty && duplicate.docs[0].id !== categoryId) {
          setCategoryToolbarHint('Category name already exists.', 'error');
          return;
        }

        await updateDoc(doc(db, currentCategoriesPath + '/' + categoryId), {
          name: clean,
          nameLower: clean.toLowerCase(),
          updatedAt: serverTimestamp(),
          updatedBy: currentUser.uid,
        });
        setCategoryToolbarHint('Category renamed.', 'success');
        return;
      }

      if (archiveBtn) {
        const categoryId = archiveBtn.getAttribute('data-archive-cat-id');
        if (!categoryId || !currentCategoriesPath || !currentUser) return;
        await updateDoc(doc(db, currentCategoriesPath + '/' + categoryId), {
          archived: true,
          updatedAt: serverTimestamp(),
          updatedBy: currentUser.uid,
        });
        setCategoryToolbarHint('Category archived.', 'success');
      }
    } catch (err) {
      setCategoryToolbarHint(getFirebaseActionErrorMessage(err), 'error');
      console.error(err);
    }
  });

  const categoryInput = toolbar.querySelector('#newCategoryName');
  categoryInput?.addEventListener('keydown', async (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    await createCategoryFromInput();
  });
}

function setCategoryToolbarHint(message, tone = '') {
  const hintEl = document.getElementById('categoryToolbarHint');
  if (!hintEl) return;
  hintEl.textContent = message;
  hintEl.classList.remove('error', 'success');
  if (tone) hintEl.classList.add(tone);
}

function refreshSelectionUI() {
  const selectedCountLabel = document.getElementById('selectedCountLabel');
  if (selectedCountLabel) {
    selectedCountLabel.textContent = selectedOrderIds.size + ' orders, ' + selectedItemRefs.size + ' items selected';
  }
}

function renderCategoryUI() {
  ensureCategoryToolbar();

  const addBtn = document.getElementById('addCategoryBtn');
  const applySelectionBtn = document.getElementById('applySelectionCategoryBtn');
  const selectVisibleBtn = document.getElementById('selectAllVisibleBtn');
  const clearSelectionBtn = document.getElementById('clearSelectionBtn');
  const bulkCategorySelect = document.getElementById('bulkCategorySelect');
  const newCategoryName = document.getElementById('newCategoryName');
  const categoryPills = document.getElementById('categoryPills');

  const categoriesEnabled = Boolean(currentCategoriesPath && currentUser && dataSourceMode === 'firestore');
  if (addBtn) addBtn.disabled = !categoriesEnabled;
  if (applySelectionBtn) applySelectionBtn.disabled = !categoriesEnabled;
  if (selectVisibleBtn) selectVisibleBtn.disabled = !categoriesEnabled;
  if (clearSelectionBtn) clearSelectionBtn.disabled = !categoriesEnabled;
  if (bulkCategorySelect) bulkCategorySelect.disabled = !categoriesEnabled;
  if (newCategoryName) newCategoryName.disabled = !categoriesEnabled;

  if (!currentUser) {
    setCategoryToolbarHint('Sign in to manage categories and assign them.');
  } else if (dataSourceMode !== 'firestore') {
    setCategoryToolbarHint('Category updates are disabled in backend mode. Use Firestore source.', 'error');
  } else if (!currentCategoriesPath) {
    setCategoryToolbarHint('Collection must end with /orders to enable categories.', 'error');
  } else {
    setCategoryToolbarHint('Create categories, then apply to selected orders/items with one button.');
  }

  if (bulkCategorySelect) {
    bulkCategorySelect.innerHTML = '<option value="">Assign selected to…</option>'
      + allCategories.map((c) => '<option value="' + esc(c.id) + '">' + esc(c.name || 'Unnamed') + '</option>').join('');
  }

  if (categoryFilterEl) {
    const prior = categoryFilterEl.value;
    categoryFilterEl.innerHTML = '<option value="all">All categories</option>'
      + '<option value="uncategorized">Uncategorized</option>'
      + allCategories.map((c) => '<option value="' + esc(c.id) + '">' + esc(c.name || 'Unnamed') + '</option>').join('');
    const hasPrior = Array.from(categoryFilterEl.options).some((opt) => opt.value === prior);
    categoryFilterEl.value = hasPrior ? prior : 'all';
  }

  if (categoryPills) {
    categoryPills.innerHTML = allCategories.map((c) => ''
      + '<span class="chip">'
      + esc(c.name || 'Unnamed')
      + '<button type="button" class="chip-action" data-rename-cat-id="' + esc(c.id) + '">Rename</button>'
      + '<button type="button" class="chip-action" data-archive-cat-id="' + esc(c.id) + '">Archive</button>'
      + '</span>'
    ).join('');
  }

  refreshSelectionUI();
}

function startCategoriesWatch(categoriesPath) {
  if (stopCategoriesWatch) { stopCategoriesWatch(); stopCategoriesWatch = null; }
  allCategories = [];
  renderCategoryUI();

  if (!categoriesPath) return;

  stopCategoriesWatch = onSnapshot(
    query(
      collection(db, categoriesPath),
      where('archived', '==', false),
    ),
    (snap) => {
      allCategories = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
      renderCategoryUI();
    },
    () => {
      allCategories = [];
      renderCategoryUI();
    },
  );
}

function startCatalogWatch(groupId) {
  if (stopCatalogWatch) { stopCatalogWatch(); stopCatalogWatch = null; }
  catalogPriceMap = new Map();
  catalogPriceNormalizedMap = new Map();
  if (!groupId) return;
  const catalogPath = 'groups/' + groupId + '/catalog';
  stopCatalogWatch = onSnapshot(
    collection(db, catalogPath),
    (snap) => {
      catalogPriceMap = new Map();
      catalogPriceNormalizedMap = new Map();
      for (const d of snap.docs) {
        const data = d.data();
        const name = String(data.name || data.itemName || data.productName || data.ingredient || d.id || '').toLowerCase().trim();
        const normalizedName = normalizeProductName(name);
        if (!name) continue;
        const price = extractPriceFromAny(data);
        const unit  = data.unit || data.uom || '';
        if (price != null && !Number.isNaN(Number(price))) {
          const entry = { price: Number(price), unit };
          catalogPriceMap.set(name, entry);
          if (normalizedName) catalogPriceNormalizedMap.set(normalizedName, entry);
        }
      }
      // Re-render with updated prices (if orders are loaded)
      if (allOrders.length) applyFiltersAndRender();
    },
    () => {
      catalogPriceMap = new Map();
      catalogPriceNormalizedMap = new Map();
    },
  );
}

function stopAllGlobalCatalogItemWatches() {
  if (globalCatalogRenderTimer) {
    clearTimeout(globalCatalogRenderTimer);
    globalCatalogRenderTimer = null;
  }
  for (const unsub of stopGlobalCatalogItemWatchByKey.values()) {
    try { unsub(); } catch {}
  }
  stopGlobalCatalogItemWatchByKey.clear();
  globalCatalogDistributorPriceMapByKey.clear();
  globalCatalogDistributorPriceNormMapByKey.clear();
  globalCatalogRootKeys.clear();
  globalCatalogOrderKeys.clear();
}

function rebuildGlobalCatalogMergedMaps() {
  const merged = new Map();
  const mergedNorm = new Map();

  for (const byName of globalCatalogDistributorPriceMapByKey.values()) {
    for (const [name, entry] of byName.entries()) {
      merged.set(name, entry);
    }
  }
  for (const byNorm of globalCatalogDistributorPriceNormMapByKey.values()) {
    for (const [name, entry] of byNorm.entries()) {
      mergedNorm.set(name, entry);
    }
  }

  globalCatalogPriceMap = merged;
  globalCatalogPriceNormalizedMap = mergedNorm;
}

function scheduleGlobalCatalogRender() {
  if (!allOrders.length) return;
  if (globalCatalogRenderTimer) clearTimeout(globalCatalogRenderTimer);
  globalCatalogRenderTimer = setTimeout(() => {
    globalCatalogRenderTimer = null;
    applyFiltersAndRender();
  }, 60);
}

function normalizeGlobalCatalogKey(value) {
  return String(value || '').trim().replace(/^\/+|\/+$/g, '');
}

function addGlobalCatalogKeyCandidate(rawValue, outSet) {
  const raw = normalizeGlobalCatalogKey(rawValue);
  if (!raw) return;

  const fromPath = raw.match(/global_distributor_catalog\/([^/]+)/i);
  if (fromPath?.[1]) {
    const keyFromPath = normalizeGlobalCatalogKey(fromPath[1]);
    if (keyFromPath) outSet.add(keyFromPath);
  }

  if (raw.includes('/')) return;
  if (raw.length < 2) return;

  if (/^[A-Za-z0-9_-]+$/.test(raw)) outSet.add(raw);

  const lower = raw.toLowerCase();
  if (/^[a-z0-9_-]{2,}$/.test(lower)) outSet.add(lower);

  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  if (slug.length >= 2) outSet.add(slug);
}

function extractGlobalCatalogKeysFromOrder(order) {
  const found = new Set();
  const orderCandidates = [
    order?.distributorKey,
    order?.globalDistributorKey,
    order?.catalogKey,
    order?.distributorId,
    order?.distributorSlug,
    order?.distributorName,
    order?.vendorName,
    order?.vendor,
    order?.distributor,
    order?.distributorPath,
  ];
  for (const value of orderCandidates) addGlobalCatalogKeyCandidate(value, found);

  const items = extractOrderItems(order);
  for (const item of items) {
    addGlobalCatalogKeyCandidate(item?.distributorKey, found);
    addGlobalCatalogKeyCandidate(item?.globalDistributorKey, found);
    addGlobalCatalogKeyCandidate(item?.catalogKey, found);
    addGlobalCatalogKeyCandidate(item?.distributorId, found);
    addGlobalCatalogKeyCandidate(item?.vendorName, found);
    addGlobalCatalogKeyCandidate(item?.distributorName, found);
  }

  return Array.from(found);
}

function createGlobalCatalogMapsFromDocs(docs) {
  const byName = new Map();
  const byNorm = new Map();

  for (const d of docs) {
    const data = d.data();
    const name = String(data.name || data.itemName || data.productName || data.ingredient || d.id || '').toLowerCase().trim();
    if (!name) continue;
    const normalizedName = normalizeProductName(name);
    const price = extractPriceFromAny(data);
    const unit = data.unit || data.uom || '';
    if (price == null || Number.isNaN(Number(price))) continue;
    const entry = { price: Number(price), unit };
    byName.set(name, entry);
    if (normalizedName) byNorm.set(normalizedName, entry);
  }

  return { byName, byNorm };
}

function ensureGlobalCatalogItemsWatch(key) {
  if (!key || stopGlobalCatalogItemWatchByKey.has(key)) return;
  const itemsPath = 'global_distributor_catalog/' + key + '/items';

  getDocs(query(collection(db, itemsPath), limit(1000)))
    .then((snap) => {
      const { byName, byNorm } = createGlobalCatalogMapsFromDocs(snap.docs);
      globalCatalogDistributorPriceMapByKey.set(key, byName);
      globalCatalogDistributorPriceNormMapByKey.set(key, byNorm);
      rebuildGlobalCatalogMergedMaps();
      scheduleGlobalCatalogRender();
    })
    .catch(() => {});

  const unsub = onSnapshot(
    collection(db, itemsPath),
    (itemsSnap) => {
      const { byName, byNorm } = createGlobalCatalogMapsFromDocs(itemsSnap.docs);
      globalCatalogDistributorPriceMapByKey.set(key, byName);
      globalCatalogDistributorPriceNormMapByKey.set(key, byNorm);
      rebuildGlobalCatalogMergedMaps();
      scheduleGlobalCatalogRender();
    },
    () => {
      globalCatalogDistributorPriceMapByKey.delete(key);
      globalCatalogDistributorPriceNormMapByKey.delete(key);
      stopGlobalCatalogItemWatchByKey.delete(key);
      rebuildGlobalCatalogMergedMaps();
      scheduleGlobalCatalogRender();
    },
  );

  stopGlobalCatalogItemWatchByKey.set(key, unsub);
}

function reconcileGlobalCatalogItemWatches() {
  const desired = new Set([...globalCatalogRootKeys, ...globalCatalogOrderKeys]);

  for (const key of Array.from(stopGlobalCatalogItemWatchByKey.keys())) {
    if (desired.has(key)) continue;
    const unsub = stopGlobalCatalogItemWatchByKey.get(key);
    try { unsub?.(); } catch {}
    stopGlobalCatalogItemWatchByKey.delete(key);
    globalCatalogDistributorPriceMapByKey.delete(key);
    globalCatalogDistributorPriceNormMapByKey.delete(key);
  }

  for (const key of desired) ensureGlobalCatalogItemsWatch(key);

  rebuildGlobalCatalogMergedMaps();
  scheduleGlobalCatalogRender();
}

function syncGlobalCatalogWatchesFromOrders(orders) {
  globalCatalogOrderKeys.clear();
  const maxKeys = 60;
  for (const order of orders || []) {
    for (const key of extractGlobalCatalogKeysFromOrder(order)) {
      globalCatalogOrderKeys.add(key);
      if (globalCatalogOrderKeys.size >= maxKeys) break;
    }
    if (globalCatalogOrderKeys.size >= maxKeys) break;
  }
  reconcileGlobalCatalogItemWatches();
}

function startGlobalCatalogWatch() {
  if (stopGlobalCatalogRootWatch) { stopGlobalCatalogRootWatch(); stopGlobalCatalogRootWatch = null; }
  stopAllGlobalCatalogItemWatches();
  globalCatalogPriceMap = new Map();
  globalCatalogPriceNormalizedMap = new Map();

  stopGlobalCatalogRootWatch = onSnapshot(
    collection(db, 'global_distributor_catalog'),
    (snap) => {
      globalCatalogRootKeys.clear();
      for (const d of snap.docs) {
        const key = normalizeGlobalCatalogKey(d.id);
        if (key) globalCatalogRootKeys.add(key);
      }
      reconcileGlobalCatalogItemWatches();
    },
    () => {
      globalCatalogRootKeys.clear();
      reconcileGlobalCatalogItemWatches();
    },
  );

  syncGlobalCatalogWatchesFromOrders(allOrders);
}

async function createCategoryFromInput() {
  if (!currentCategoriesPath || !currentUser || dataSourceMode !== 'firestore') {
    setCategoryToolbarHint('Category management is available only for Firestore group orders.', 'error');
    return;
  }

  const input = document.getElementById('newCategoryName');
  const name = (input?.value || '').trim();
  if (!name) {
    setCategoryToolbarHint('Enter a category name first.', 'error');
    return;
  }

  try {
    const duplicateQuery = query(
      collection(db, currentCategoriesPath),
      where('nameLower', '==', name.toLowerCase()),
      where('archived', '==', false),
      limit(1),
    );
    const duplicate = await getDocs(duplicateQuery);
    if (!duplicate.empty) {
      setCategoryToolbarHint('Category already exists.', 'error');
      return;
    }

    await addDoc(collection(db, currentCategoriesPath), {
      name,
      nameLower: name.toLowerCase(),
      archived: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: currentUser.uid,
      updatedBy: currentUser.uid,
    });

    input.value = '';
    setCategoryToolbarHint('Category added.', 'success');
  } catch (err) {
    setCategoryToolbarHint(getFirebaseActionErrorMessage(err), 'error');
    console.error(err);
  }
}

async function applyCategoryToSelection() {
  if (!selectedOrderIds.size && !selectedItemRefs.size) {
    setCategoryToolbarHint('Select at least one order or item.', 'error');
    return;
  }
  if (!currentCollectionPath || !currentCategoriesPath || !currentUser || dataSourceMode !== 'firestore') {
    setCategoryToolbarHint('Categorization works only on Firestore group orders.', 'error');
    return;
  }

  const select = document.getElementById('bulkCategorySelect');
  const categoryId = String(select?.value || '');
  if (!categoryId) {
    setCategoryToolbarHint('Pick a category first.', 'error');
    return;
  }

  try {
    const updatesByOrder = new Map();

    for (const orderId of selectedOrderIds) {
      const normalizedOrderId = String(orderId);
      if (!updatesByOrder.has(normalizedOrderId)) updatesByOrder.set(normalizedOrderId, {});
      const patch = updatesByOrder.get(normalizedOrderId);
      patch.categoryId = categoryId;
      patch.categorizedAt = serverTimestamp();
      patch.categorizedBy = currentUser.uid;
    }

    for (const ref of selectedItemRefs) {
      const sep = ref.indexOf(ITEM_REF_SEPARATOR);
      if (sep < 0) continue;
      const orderId = ref.slice(0, sep);
      const itemKey = ref.slice(sep + ITEM_REF_SEPARATOR.length);
      if (!orderId || !itemKey) continue;

      if (!updatesByOrder.has(orderId)) updatesByOrder.set(orderId, {});
      const patch = updatesByOrder.get(orderId);
      const order = allOrders.find((o) => String(o.id) === String(orderId));
      const existingMap = patch.itemCategories
        || (order && typeof order.itemCategories === 'object' && order.itemCategories ? { ...order.itemCategories } : {});
      existingMap[itemKey] = categoryId;
      patch.itemCategories = existingMap;
    }

    const orderIds = Array.from(updatesByOrder.keys());
    for (const idsChunk of chunk(orderIds, 450)) {
      const batch = writeBatch(db);
      for (const orderId of idsChunk) {
        const payload = {
          ...updatesByOrder.get(orderId),
          updatedAt: serverTimestamp(),
        };
        batch.update(doc(db, currentCollectionPath + '/' + orderId), payload);
      }
      await batch.commit();
    }

    const orderCount = selectedOrderIds.size;
    const itemCount = selectedItemRefs.size;
    selectedOrderIds.clear();
    selectedItemRefs.clear();
    refreshSelectionUI();
    setCategoryToolbarHint('Category applied to ' + orderCount + ' order' + (orderCount === 1 ? '' : 's') + ' and ' + itemCount + ' item' + (itemCount === 1 ? '' : 's') + '.', 'success');
  } catch (err) {
    setCategoryToolbarHint(getFirebaseActionErrorMessage(err), 'error');
    console.error(err);
  }
}

// ── Filters ───────────────────────────────────────────────────────────────────
datePresetEl.addEventListener('change', applyFiltersAndRender);
categoryFilterEl.addEventListener('change', applyFiltersAndRender);
typeFilterEl.addEventListener('change',   applyFiltersAndRender);
statusFilterEl.addEventListener('change', applyFiltersAndRender);
searchEl.addEventListener('input',        applyFiltersAndRender);

clearFiltersBtn.addEventListener('click', () => {
  datePresetEl.value   = 'all';
  categoryFilterEl.value = 'all';
  typeFilterEl.value   = 'all';
  statusFilterEl.value = 'all';
  searchEl.value       = '';
  applyFiltersAndRender();
});

function normalizeCategoryToken(value) {
  return String(value || '').trim().toLowerCase();
}

function resolveCategoryName(categoryToken) {
  const token = String(categoryToken || '').trim();
  if (!token) return 'Uncategorized';
  const byId = allCategories.find((c) => String(c.id) === token);
  if (byId) return byId.name || 'Uncategorized';
  const norm = normalizeCategoryToken(token);
  const byName = allCategories.find((c) => normalizeCategoryToken(c.name) === norm);
  if (byName) return byName.name || token;
  return token;
}

function categoryTokenMatchesFilter(categoryToken, selectedCategoryId, selectedCategoryNameNorm) {
  const token = String(categoryToken || '').trim();
  if (!token) return false;
  if (token === selectedCategoryId) return true;
  if (selectedCategoryId && (token.endsWith('/' + selectedCategoryId) || token.includes('/categories/' + selectedCategoryId))) return true;
  const tokenNorm = normalizeCategoryToken(token);
  if (selectedCategoryNameNorm && tokenNorm === selectedCategoryNameNorm) return true;
  if (selectedCategoryNameNorm && tokenNorm.includes(selectedCategoryNameNorm)) return true;
  const byId = allCategories.find((c) => String(c.id) === token);
  return Boolean(byId && normalizeCategoryToken(byId.name) === selectedCategoryNameNorm);
}

function collectCategoryTokens(value, outSet) {
  if (value == null) return;
  if (typeof value === 'string' || typeof value === 'number') {
    const token = String(value).trim();
    if (token) outSet.add(token);
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) collectCategoryTokens(entry, outSet);
    return;
  }
  if (typeof value !== 'object') return;

  // Common shapes: { categoryId }, { category }, { id, name }, etc.
  const directKeys = ['categoryId', 'category', 'categoryName', 'category_id', 'id', 'name', 'label', 'path', 'ref', 'value'];
  for (const key of directKeys) {
    if (!(key in value)) continue;
    const token = String(value[key] ?? '').trim();
    if (token) outSet.add(token);
  }
}

function orderTextMatchesCategory(order, selectedCategoryId, selectedCategoryNameNorm) {
  const blob = JSON.stringify(order || {}).toLowerCase();
  if (!blob) return false;
  if (selectedCategoryId && (blob.includes(selectedCategoryId.toLowerCase()) || blob.includes('/categories/' + selectedCategoryId.toLowerCase()))) {
    return true;
  }
  if (selectedCategoryNameNorm && blob.includes(selectedCategoryNameNorm)) {
    return true;
  }
  return false;
}

function getOrderCategoryTokens(order) {
  const tokens = new Set();

  // Order-level category fields
  collectCategoryTokens(order?.categoryId, tokens);
  collectCategoryTokens(order?.category, tokens);
  collectCategoryTokens(order?.categoryName, tokens);

  // Item-level category map (can be string values or object values)
  const map = order?.itemCategories;
  if (map && typeof map === 'object') {
    for (const val of Object.values(map)) collectCategoryTokens(val, tokens);
  }

  // Item-level embedded category fields
  for (const item of extractOrderItems(order)) {
    collectCategoryTokens(item?.categoryId, tokens);
    collectCategoryTokens(item?.category, tokens);
    collectCategoryTokens(item?.categoryName, tokens);
  }

  return tokens;
}

function applyFiltersAndRender() {
  const preset       = datePresetEl.value;
  const categoryFilter = categoryFilterEl.value;
  const typeFilter   = typeFilterEl.value;
  const statusFilter = statusFilterEl.value;
  const query        = searchEl.value.toLowerCase().trim();
  const now          = new Date();

  function dateFrom() {
    if (preset === '7d')   { const d = new Date(now); d.setDate(d.getDate() - 7);  return d; }
    if (preset === '30d')  { const d = new Date(now); d.setDate(d.getDate() - 30); return d; }
    if (preset === '90d')  { const d = new Date(now); d.setDate(d.getDate() - 90); return d; }
    if (preset === 'year') return new Date(now.getFullYear(), 0, 1);
    return null;
  }

  const from = dateFrom();
  const selectedCategory = allCategories.find((c) => c.id === categoryFilter);
  const selectedCategoryNameNorm = normalizeCategoryToken(selectedCategory?.name || '');

  const filtered = allOrders.filter((o) => {
    const d = asDate(bestDate(o));
    if (from && d && d < from) return false;
    const categoryTokens = getOrderCategoryTokens(o);
    const hasAnyCategoryId = categoryTokens.size > 0;
    if (categoryFilter === 'uncategorized' && hasAnyCategoryId) return false;
    if (categoryFilter !== 'all' && categoryFilter !== 'uncategorized') {
      const matchesByTokens = Array.from(categoryTokens)
        .some((token) => categoryTokenMatchesFilter(token, categoryFilter, selectedCategoryNameNorm));
      const matchesByText = orderTextMatchesCategory(o, categoryFilter, selectedCategoryNameNorm);
      if (!matchesByTokens && !matchesByText) return false;
    }
    if (typeFilter   !== 'all' && inferType(o)              !== typeFilter)   return false;
    if (statusFilter !== 'all' && normalizeStatus(o.status) !== statusFilter) return false;
    if (query) {
      const categoryName = resolveCategoryName(o.categoryId ?? o.category ?? '');
      const blob = [o.title, o.orderId, o.id, o.distributorName, o.vendorName, o.note, o.status, categoryName]
        .join(' ').toLowerCase();
      if (!blob.includes(query)) return false;
    }
    return true;
  });

  const chips = [];
  if (preset !== 'all')       chips.push(datePresetEl.options[datePresetEl.selectedIndex].text);
  if (categoryFilter === 'uncategorized') chips.push('Category: Uncategorized');
  if (categoryFilter !== 'all' && categoryFilter !== 'uncategorized') {
    const cat = allCategories.find((c) => c.id === categoryFilter);
    chips.push('Category: ' + (cat?.name || 'Unknown'));
  }
  if (typeFilter !== 'all')   chips.push('Type: ' + typeFilter);
  if (statusFilter !== 'all') chips.push('Status: ' + statusFilter);
  if (query)                  chips.push('Search: "' + query + '"');
  activeFiltersEl.innerHTML = chips.map((c) => '<span class="chip">' + esc(c) + '</span>').join('');

  resultsSummaryEl.textContent = allOrders.length
    ? filtered.length + ' of ' + allOrders.length + ' orders match the current filters.'
    : 'Load a collection to see orders.';

  renderDashboard(filtered);
}

// ── Render ────────────────────────────────────────────────────────────────────
function renderDashboard(orders) {
  renderCategoryUI();
  lastRenderedOrders = orders;

  const validIds = new Set(allOrders.map((o) => String(o.id)));
  for (const selectedId of Array.from(selectedOrderIds)) {
    if (!validIds.has(selectedId)) selectedOrderIds.delete(selectedId);
  }
  const validItemRefs = new Set();
  for (const order of allOrders) {
    const orderId = String(order.id);
    const items = extractOrderItems(order);
    for (const item of items) {
      if (!item?.itemKey) continue;
      validItemRefs.add(orderId + ITEM_REF_SEPARATOR + item.itemKey);
    }
  }
  for (const selectedRef of Array.from(selectedItemRefs)) {
    if (!validItemRefs.has(selectedRef)) selectedItemRefs.delete(selectedRef);
  }
  refreshSelectionUI();

  // Use filtered orders for all widget stats so category filters are reflected
  const byStatus = { pending: [], approved: [], rejected: [] };
  const byType   = { Manual: [], Distributor: [], Receipt: [] };
  let   totalItems = 0;
  let   totalSpend  = 0;
  for (const o of orders) {
    const st = normalizeStatus(o.status);
    if (!byStatus[st]) byStatus[st] = [];
    byStatus[st].push(o);
    const ty = inferType(o);
    if (!byType[ty]) byType[ty] = [];
    byType[ty].push(o);
    totalItems += countItems(o);
    // sum order-level total; fall back to summing item prices
    const orderTotal = Number(o.total ?? o.orderTotal ?? o.subtotal ?? NaN);
    if (!Number.isNaN(orderTotal)) {
      totalSpend += orderTotal;
    } else {
      for (const item of extractOrderItems(o)) {
        const ip = Number(item.price ?? NaN);
        const qty = Number(item.quantity ?? 1);
        if (!Number.isNaN(ip)) totalSpend += ip * qty;
      }
    }
  }
  const today = new Date();
  const todayCount = orders.filter((o) => {
    const d = asDate(bestDate(o));
    return d && d.toDateString() === today.toDateString();
  }).length;
  const isFiltered = orders.length !== allOrders.length;
  const fmtMoney = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  summaryGridEl.innerHTML = [
    statCard('Orders',   orders.length,   isFiltered ? 'of ' + allOrders.length + ' total' : 'total orders'),
    statCard('Spend',    fmtMoney(totalSpend), isFiltered ? 'filtered total' : 'total spend'),
    statCard('Pending',  byStatus.pending.length,     pct(byStatus.pending.length,  orders.length) + '%'),
    statCard('Approved', byStatus.approved.length,    pct(byStatus.approved.length, orders.length) + '%'),
    statCard('Items',    totalItems,                  isFiltered ? 'in filtered orders' : 'across all orders'),
    statCard('Today',    todayCount,                  'orders placed today'),
  ].join('');

  statusBucketsEl.innerHTML = renderProgressBuckets([
    { key: 'pending',  label: 'Pending',  value: byStatus.pending.length  },
    { key: 'approved', label: 'Approved', value: byStatus.approved.length },
    { key: 'rejected', label: 'Rejected', value: byStatus.rejected.length },
  ], orders.length);

  typeBucketsEl.innerHTML = renderProgressBuckets([
    { key: 'approved', label: 'Distributor', value: byType.Distributor.length },
    { key: 'pending',  label: 'Manual',      value: byType.Manual.length      },
    { key: 'rejected', label: 'Receipt',     value: byType.Receipt.length     },
  ], orders.length);

  // monthly breakdown
  const byMonth = {};
  for (const o of orders) {
    const d   = asDate(bestDate(o));
    const key = d
      ? d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
      : 'Unknown';
    byMonth[key] = (byMonth[key] || 0) + 1;
  }
  const monthKeys = Object.keys(byMonth).sort().reverse().slice(0, 8);
  const maxMonth  = Math.max(1, ...monthKeys.map((k) => byMonth[k]));
  monthBucketsEl.innerHTML = monthKeys.length
    ? '<div class="bucket-list">' + monthKeys.map((k) => {
        const label = k === 'Unknown' ? 'Unknown' : fmtMonthKey(k);
        const val   = byMonth[k];
        const p     = Math.round((val / maxMonth) * 100);
        return '<div class="bucket-item">'
          + '<div class="bucket-head"><span>' + esc(label) + '</span>'
          + '<span class="bucket-subtext">' + val + ' order' + (val === 1 ? '' : 's') + '</span></div>'
          + '<div class="progress"><span style="width:' + p + '%"></span></div>'
          + '</div>';
      }).join('') + '</div>'
    : '<p class="muted">No data yet.</p>';

  // table
  tableCountEl.textContent = orders.length + ' order' + (orders.length === 1 ? '' : 's');

  if (!orders.length) {
    ordersTableEl.innerHTML = '<tr><td colspan="7"><div class="empty-state">No orders match the current filters.</div></td></tr>';
    return;
  }

  const groups = {};
  for (const o of orders) {
    const d   = asDate(bestDate(o));
    const key = d
      ? d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
      : 'Unknown';
    if (!groups[key]) groups[key] = [];
    groups[key].push(o);
  }

  let rows = '';
  Object.keys(groups).sort().reverse().forEach((key) => {
    const label = key === 'Unknown' ? 'Unknown date' : fmtMonthKey(key);
    const g = groups[key];
    rows += '<tr class="group-row"><td colspan="7">' + esc(label) + ' \u2013 ' + g.length + ' order' + (g.length === 1 ? '' : 's') + '</td></tr>';
    rows += g.map((o, idx) => orderRow(o, key + '-' + idx)).join('');
  });
  ordersTableEl.innerHTML = rows;
}

// ── Card / row builders ───────────────────────────────────────────────────────
function statCard(title, value, sub) {
  return '<article class="stat">'
    + '<div class="k">' + esc(title) + '</div>'
    + '<div class="v">' + value + '</div>'
    + '<div class="s">' + esc(sub ?? '') + '</div>'
    + '</article>';
}

function renderProgressBuckets(items, total) {
  const safe = total || 1;
  return '<div class="bucket-list">' + items.map((item) => {
    const p = Math.round((item.value / safe) * 100);
    return '<div class="bucket-item">'
      + '<div class="bucket-head"><span>' + esc(item.label) + '</span>'
      + '<span class="bucket-subtext">' + item.value + ' \u00b7 ' + p + '%</span></div>'
      + '<div class="progress ' + esc(item.key) + '"><span style="width:' + p + '%"></span></div>'
      + '</div>';
  }).join('') + '</div>';
}

function orderRow(o, key) {
  const d          = asDate(bestDate(o));
  const dateLabel  = d ? formatDateTime(d) : 'No date';
  const distributor = o.distributorName || o.vendorName || '\u2014';
  const items      = countItems(o);
  const status     = normalizeStatus(o.status);
  const type       = inferType(o);
  const categoryId = String(o.categoryId ?? o.category ?? '');
  const categoryName = resolveCategoryName(categoryId);
  const name       = o.title || ('Order #' + (o.orderId || o.id));
  const detailId   = detailRowId(o, key);
  const selected   = selectedOrderIds.has(String(o.id)) ? ' checked' : '';
  const note       = o.note
    ? '<span class="order-meta">' + esc(o.note.slice(0, 60)) + (o.note.length > 60 ? '\u2026' : '') + '</span>'
    : '';
  // compute order total: prefer stored field, fall back to summing item prices
  let orderTotal = Number(o.total ?? o.orderTotal ?? o.subtotal ?? NaN);
  if (Number.isNaN(orderTotal)) {
    let sum = 0, hasPrice = false;
    for (const item of extractOrderItems(o)) {
      const ip = Number(item.price ?? NaN);
      const qty = Number(item.quantity ?? 1);
      if (!Number.isNaN(ip)) { sum += ip * qty; hasPrice = true; }
    }
    orderTotal = hasPrice ? sum : NaN;
  }
  const totalLabel = !Number.isNaN(orderTotal)
    ? '$' + orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '—';
  const mainRow = '<tr>'
    + '<td class="select-col"><input type="checkbox" data-order-select="' + esc(String(o.id)) + '"' + selected + ' /></td>'
    + '<td><div class="order-title"><div class="order-title-row"><button class="expand-btn" type="button" data-detail-toggle="' + esc(detailId) + '" aria-expanded="false"><span class="arrow">▸</span></button><strong>' + esc(name) + '</strong></div>' + note + '</div></td>'
    + '<td>' + esc(distributor) + '</td>'
    + '<td>' + esc(dateLabel) + '</td>'
    + '<td>' + items + ' <span class="order-total-inline">' + esc(totalLabel) + '</span></td>'
    + '<td><span class="tag">' + esc(type) + '</span></td>'
    + '<td><span class="tag">' + esc(categoryName) + '</span> <span class="tag ' + esc(status) + '">' + esc(status) + '</span></td>'
    + '</tr>';
  const detailRow = '<tr id="' + esc(detailId) + '" class="order-details-row hidden"><td colspan="7">' + renderOrderDetails(o) + '</td></tr>';
  return mainRow + detailRow;
}

function detailRowId(order, key) {
  const seed = String(order.id || order.orderId || key || 'order').replace(/[^a-zA-Z0-9_-]/g, '_');
  return 'order-details-' + seed;
}

function renderOrderDetails(order) {
  const items = extractOrderItems(order);
  if (!items.length) {
    return '<div class="details-panel"><p class="muted">No item details available for this order.</p></div>';
  }

  const itemCategoryMap = order && typeof order.itemCategories === 'object' && order.itemCategories
    ? order.itemCategories
    : {};

  const activeCategoryFilter = categoryFilterEl?.value || 'all';
  const selectedCategory = allCategories.find((c) => c.id === activeCategoryFilter);
  const selectedCategoryNameNorm = normalizeCategoryToken(selectedCategory?.name || '');

  const visibleItems = items.filter((item) => {
    if (activeCategoryFilter === 'all') return true;

    const itemTokens = new Set();
    const mappedCategoryId = String(itemCategoryMap[item.itemKey] || '');
    collectCategoryTokens(mappedCategoryId, itemTokens);
    collectCategoryTokens(item?.categoryId, itemTokens);
    collectCategoryTokens(item?.category, itemTokens);
    collectCategoryTokens(item?.categoryName, itemTokens);

    if (activeCategoryFilter === 'uncategorized') {
      return itemTokens.size === 0;
    }

    return Array.from(itemTokens)
      .some((token) => categoryTokenMatchesFilter(token, activeCategoryFilter, selectedCategoryNameNorm));
  });

  if (!visibleItems.length) {
    return '<div class="details-panel"><p class="muted">No items in this order match the selected category filter.</p></div>';
  }

  const rows = visibleItems.map((item, idx) => {
    const itemName = item.name || 'Item';
    const qty = item.quantity ?? '—';
    const unit = item.unit || '';
    const price = item.price != null ? ('$' + Number(item.price).toFixed(2)) : '—';
    const itemRef = String(order.id) + ITEM_REF_SEPARATOR + item.itemKey;
    const checked = selectedItemRefs.has(itemRef) ? ' checked' : '';
    const itemCategoryId = String(itemCategoryMap[item.itemKey] || '');
    const itemDirectCategory = String(item.categoryId ?? item.category ?? '');
    const fallbackCategoryId = String(order.categoryId ?? order.category ?? '');
    const resolvedCategoryId = itemCategoryId || itemDirectCategory || fallbackCategoryId;
    const categoryName = resolveCategoryName(resolvedCategoryId);
    return '<tr>'
      + '<td class="select-col"><input type="checkbox" data-item-select="' + esc(itemRef) + '"' + checked + ' /></td>'
      + '<td>' + esc(itemName) + '</td>'
      + '<td>' + esc(String(qty) + (unit ? ' ' + unit : '')) + '</td>'
      + '<td>' + esc(price) + '</td>'
      + '<td><span class="tag">' + esc(categoryName) + '</span></td>'
      + '</tr>';
  }).join('');

  // compute subtotal from visible item prices
  let subtotal = 0, hasItemPrices = false;
  for (const item of visibleItems) {
    const ip = Number(item.price ?? NaN);
    const qty = Number(item.quantity ?? 1);
    if (!Number.isNaN(ip)) { subtotal += ip * qty; hasItemPrices = true; }
  }
  // fall back to order-level total only when showing all items
  if (!hasItemPrices && activeCategoryFilter === 'all') {
    const ot = Number(order.total ?? order.orderTotal ?? order.subtotal ?? NaN);
    if (!Number.isNaN(ot)) { subtotal = ot; hasItemPrices = true; }
  }
  const subtotalLine = hasItemPrices
    ? '<div class="detail-subtotal">' + (activeCategoryFilter === 'all' ? 'Order total' : 'Filtered total') + ': <strong>$' + subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</strong></div>'
    : '';

  return '<div class="details-panel">'
    + '<table class="details-table">'
    + '<thead><tr><th class="select-col">Select</th><th>Item</th><th>Quantity</th><th>Price</th><th>Category</th></tr></thead>'
    + '<tbody>' + rows + '</tbody>'
    + '</table>'
    + subtotalLine
    + '<p class="muted">Select specific items above, then use "Apply to selected".</p>'
    + '</div>';
}

function extractOrderItems(order) {
  const raw = order?.items;
  if (!raw) return [];

  let source = raw;
  if (typeof raw === 'string') {
    try {
      source = JSON.parse(raw);
    } catch {
      return [{ name: raw.slice(0, 120), quantity: null, price: null }];
    }
  }

  let list = [];
  if (Array.isArray(source)) {
    list = source;
  } else if (typeof source === 'object') {
    const vals = Object.values(source);
    list = vals.length ? vals : [source];
  }

  return list.map((item, index) => normalizeOrderItem(item, index)).filter(Boolean);
}

function normalizeProductName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function toNumberOrNull(value) {
  if (value == null) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const cleaned = String(value).replace(/[^0-9.-]+/g, '');
  if (!cleaned || cleaned === '-' || cleaned === '.' || cleaned === '-.') return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function extractPriceFromAny(source) {
  if (!source || typeof source !== 'object') return null;

  const directKeys = [
    'price', 'unitPrice', 'cost', 'marketPrice', 'lastPrice',
    'extendedPrice', 'lineTotal', 'amount', 'avgPrice', 'latestPrice',
  ];
  for (const key of directKeys) {
    const num = toNumberOrNull(source[key]);
    if (num != null) return num;
  }

  const stack = [source];
  const seen = new Set();
  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== 'object' || seen.has(current)) continue;
    seen.add(current);
    for (const [key, value] of Object.entries(current)) {
      if (value == null) continue;
      if (typeof value === 'object') {
        stack.push(value);
        continue;
      }
      if (typeof value !== 'string' && typeof value !== 'number') continue;
      if (!/(price|cost|amount|total)/i.test(key)) continue;
      if (/(qty|quantity|count|stock|tax|fee|discount|id)/i.test(key)) continue;
      const num = toNumberOrNull(value);
      if (num != null) return num;
    }
  }
  return null;
}

function lookupCatalogPriceByName(name) {
  const lowerName = String(name || '').toLowerCase().trim();
  if (!lowerName) return null;

  const exact = catalogPriceMap.get(lowerName);
  if (exact) return exact;
  const globalExact = globalCatalogPriceMap.get(lowerName);
  if (globalExact) return globalExact;

  const normalized = normalizeProductName(lowerName);
  if (!normalized) return null;

  const normalizedExact = catalogPriceNormalizedMap.get(normalized);
  if (normalizedExact) return normalizedExact;
  const globalNormalizedExact = globalCatalogPriceNormalizedMap.get(normalized);
  if (globalNormalizedExact) return globalNormalizedExact;

  // Fuzzy fallback for OCR abbreviations: token-overlap against normalized catalog names.
  const tokens = normalized.split(' ').filter(Boolean);
  if (!tokens.length) return null;
  let best = null;
  let bestScore = 0;
  const mergedEntries = [
    ...catalogPriceNormalizedMap.entries(),
    ...globalCatalogPriceNormalizedMap.entries(),
  ];
  for (const [catalogName, entry] of mergedEntries) {
    let score = 0;
    for (const token of tokens) {
      if (token.length < 2) continue;
      if (catalogName.includes(token)) score += token.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  // Guard against weak false positives.
  return bestScore >= 8 ? best : null;
}

function normalizeOrderItem(item, index = 0) {
  if (item == null) return null;
  if (typeof item === 'string') {
    return { name: item, quantity: null, price: null, itemKey: 'idx-' + index };
  }
  if (typeof item !== 'object') return { name: String(item), quantity: null, price: null, itemKey: 'idx-' + index };

  const name = item.name || item.itemName || item.productName || item.title || item.item || item.ingredient || item.id;
  const quantity = item.quantity ?? item.qty ?? item.count ?? item.amount ?? null;
  const unit = item.unit || item.measurement || item.uom || '';
  let price = extractPriceFromAny(item);
  // Fall back to catalog price if item has no stored price
  if (price == null && (catalogPriceMap.size > 0 || catalogPriceNormalizedMap.size > 0 || globalCatalogPriceMap.size > 0 || globalCatalogPriceNormalizedMap.size > 0)) {
    const catalogEntry = lookupCatalogPriceByName(name);
    if (catalogEntry) price = catalogEntry.price;
  }
  const rawKey = item.id ?? item.itemId ?? item.sku ?? item.productId ?? name;
  const itemKey = String(rawKey || ('idx-' + index)).replace(/[^a-zA-Z0-9_-]/g, '_') + '__' + index;

  return {
    name: name ? String(name) : 'Item',
    quantity,
    unit,
    price,
    categoryId: item.categoryId ?? item.category ?? null,
    category: item.category ?? item.categoryName ?? null,
    categoryName: item.categoryName ?? null,
    itemKey,
  };
}

function getFirebaseActionErrorMessage(err) {
  const code = String(err?.code || '');
  if (code.includes('permission-denied')) {
    return 'Missing permissions. Ensure Firestore rules are deployed and your user is an admin in this group.';
  }
  if (code.includes('failed-precondition')) {
    return 'Firestore index missing. Deploy firestore.indexes.json, then retry.';
  }
  if (code.includes('unavailable')) {
    return 'Network is temporarily unavailable. Please retry.';
  }
  if (code.includes('not-found')) {
    return 'Collection path not found for this user/group.';
  }
  return err?.message || 'Action failed. Check Firestore rules and indexes.';
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function normalizeStatus(raw) {
  const s = String(raw || '').toLowerCase().trim();
  if (s.includes('approved') || s.includes('accept') || s.includes('complete')) return 'approved';
  if (s.includes('reject')   || s.includes('cancel'))                            return 'rejected';
  return 'pending';
}

function inferType(order) {
  const note = String(order.note || order.source || '').toLowerCase();
  if (note.includes('receipt') || note.includes('ocr'))             return 'Receipt';
  if (order.distributorId || order.distributorName || order.vendorName) return 'Distributor';
  return 'Manual';
}

function countItems(order) {
  if (Array.isArray(order.items))           return order.items.length;
  if (!order.items)                          return 0;
  if (typeof order.items === 'object')       return Object.keys(order.items).length;
  if (typeof order.items === 'string') {
    try {
      const p = JSON.parse(order.items);
      return Array.isArray(p) ? p.length : Object.keys(p).length;
    } catch { return 0; }
  }
  return 0;
}

function bestDate(o) { return o.createdAt ?? o.orderDate ?? o.date ?? null; }

function asDate(field) {
  if (!field) return null;
  if (field instanceof Date) return field;
  if (typeof field === 'number') return new Date(field < 1e11 ? field * 1000 : field);
  if (typeof field === 'string') { const d = new Date(field); return isNaN(d) ? null : d; }
  if (field.seconds != null)     return new Date(field.seconds * 1000);
  if (typeof field.toDate === 'function') return field.toDate();
  return null;
}

function toMs(field) { const d = asDate(field); return d ? d.getTime() : 0; }

function formatDate(d) {
  if (!d) return '\u2014';
  return String(d.getMonth() + 1).padStart(2, '0') + '/'
       + String(d.getDate()).padStart(2, '0') + '/'
       + d.getFullYear();
}

function formatDateTime(d) {
  return formatDate(d) + ' '
       + String(d.getHours()).padStart(2, '0') + ':'
       + String(d.getMinutes()).padStart(2, '0');
}

function fmtMonthKey(key) {
  const [y, m] = key.split('-');
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return names[parseInt(m, 10) - 1] + ' ' + y;
}

function pct(n, total) { return total ? Math.round((n / total) * 100) : 0; }

function esc(value) {
  return String(value ?? '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

applyFiltersAndRender();
