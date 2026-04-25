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
  getDocs,
  limit,
  onSnapshot,
  query,
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
const ordersTableEl     = document.getElementById('ordersTableBody');
const tableCountEl      = document.getElementById('tableCount');
const resultsSummaryEl  = document.getElementById('resultsSummary');
const activeFiltersEl   = document.getElementById('activeFilters');
const datePresetEl      = document.getElementById('datePreset');
const startDateEl       = document.getElementById('startDate');
const endDateEl         = document.getElementById('endDate');
const typeFilterEl      = document.getElementById('typeFilter');
const statusFilterEl    = document.getElementById('statusFilter');
const searchEl          = document.getElementById('searchInput');
const clearFiltersBtn   = document.getElementById('clearFiltersBtn');

// ── State ─────────────────────────────────────────────────────────────────────
let allOrders    = [];
let stopWatching = null;
const SOURCE_PREF_KEY = 'AHARA_ORDER_DASH_SOURCE_PREF';
const BACKEND_BASE_URL = window.AHARA_BACKEND_BASE_URL || 'http://localhost:5050';

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
  const isSignedIn = Boolean(user);
  authScreenEl.classList.toggle('hidden', isSignedIn);
  dashboardAppEl.classList.toggle('hidden', !isSignedIn);
  authStateEl.textContent = isSignedIn
    ? 'Signed in · ' + (user.email ?? user.uid)
    : 'Not signed in';

  if (!isSignedIn) {
    if (stopWatching) { stopWatching(); stopWatching = null; }
    allOrders = [];
    applyFiltersAndRender();
    collectionLabelEl.textContent = 'Collection: not configured.';
    connectionHintEl.textContent = 'Sign in to load order history.';
    setAuthView('signin');
    return;
  }

  startDataFeed(user);
});

startDateEl.disabled = true;
endDateEl.disabled   = true;

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
  connectionHintEl.textContent  = 'Connecting\u2026';
  collectionLabelEl.textContent = 'Collection: ' + path;

  stopWatching = onSnapshot(
    collection(db, path),
    (snap) => {
      allOrders = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => toMs(bestDate(b)) - toMs(bestDate(a)));

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

// ── Filters ───────────────────────────────────────────────────────────────────
datePresetEl.addEventListener('change', () => {
  const custom = datePresetEl.value === 'custom';
  startDateEl.disabled = !custom;
  endDateEl.disabled   = !custom;
  if (!custom) { startDateEl.value = ''; endDateEl.value = ''; }
  applyFiltersAndRender();
});
startDateEl.addEventListener('change',    applyFiltersAndRender);
endDateEl.addEventListener('change',      applyFiltersAndRender);
typeFilterEl.addEventListener('change',   applyFiltersAndRender);
statusFilterEl.addEventListener('change', applyFiltersAndRender);
searchEl.addEventListener('input',        applyFiltersAndRender);

clearFiltersBtn.addEventListener('click', () => {
  datePresetEl.value   = 'all';
  startDateEl.value    = '';
  endDateEl.value      = '';
  typeFilterEl.value   = 'all';
  statusFilterEl.value = 'all';
  searchEl.value       = '';
  startDateEl.disabled = true;
  endDateEl.disabled   = true;
  applyFiltersAndRender();
});

function applyFiltersAndRender() {
  const preset       = datePresetEl.value;
  const typeFilter   = typeFilterEl.value;
  const statusFilter = statusFilterEl.value;
  const query        = searchEl.value.toLowerCase().trim();
  const now          = new Date();

  function dateFrom() {
    if (preset === '7d')   { const d = new Date(now); d.setDate(d.getDate() - 7);  return d; }
    if (preset === '30d')  { const d = new Date(now); d.setDate(d.getDate() - 30); return d; }
    if (preset === '90d')  { const d = new Date(now); d.setDate(d.getDate() - 90); return d; }
    if (preset === 'year') return new Date(now.getFullYear(), 0, 1);
    if (preset === 'custom' && startDateEl.value) return new Date(startDateEl.value);
    return null;
  }
  function dateTo() {
    if (preset === 'custom' && endDateEl.value) {
      const d = new Date(endDateEl.value); d.setHours(23, 59, 59, 999); return d;
    }
    return null;
  }

  const from = dateFrom();
  const to   = dateTo();

  const filtered = allOrders.filter((o) => {
    const d = asDate(bestDate(o));
    if (from && d && d < from) return false;
    if (to   && d && d > to)   return false;
    if (typeFilter   !== 'all' && inferType(o)              !== typeFilter)   return false;
    if (statusFilter !== 'all' && normalizeStatus(o.status) !== statusFilter) return false;
    if (query) {
      const blob = [o.title, o.orderId, o.id, o.distributorName, o.vendorName, o.note, o.status]
        .join(' ').toLowerCase();
      if (!blob.includes(query)) return false;
    }
    return true;
  });

  const chips = [];
  if (preset !== 'all')       chips.push(datePresetEl.options[datePresetEl.selectedIndex].text);
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
  const byStatus = { pending: [], approved: [], rejected: [] };
  const byType   = { Manual: [], Distributor: [], Receipt: [] };
  let   totalItems = 0;

  for (const o of orders) {
    const st = normalizeStatus(o.status);
    if (!byStatus[st]) byStatus[st] = [];
    byStatus[st].push(o);
    const ty = inferType(o);
    if (!byType[ty]) byType[ty] = [];
    byType[ty].push(o);
    totalItems += countItems(o);
  }

  const today = new Date();
  const todayCount = orders.filter((o) => {
    const d = asDate(bestDate(o));
    return d && d.toDateString() === today.toDateString();
  }).length;

  summaryGridEl.innerHTML = [
    statCard('Total',    orders.length,               'matching orders'),
    statCard('Pending',  byStatus.pending.length,     pct(byStatus.pending.length,  orders.length) + '%'),
    statCard('Approved', byStatus.approved.length,    pct(byStatus.approved.length, orders.length) + '%'),
    statCard('Rejected', byStatus.rejected.length,    pct(byStatus.rejected.length, orders.length) + '%'),
    statCard('Items',    totalItems,                  'across filtered orders'),
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
    ordersTableEl.innerHTML = '<tr><td colspan="6"><div class="empty-state">No orders match the current filters.</div></td></tr>';
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
    rows += '<tr class="group-row"><td colspan="6">' + esc(label) + ' \u2013 ' + g.length + ' order' + (g.length === 1 ? '' : 's') + '</td></tr>';
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
  const name       = o.title || ('Order #' + (o.orderId || o.id));
  const detailId   = detailRowId(o, key);
  const note       = o.note
    ? '<span class="order-meta">' + esc(o.note.slice(0, 60)) + (o.note.length > 60 ? '\u2026' : '') + '</span>'
    : '';
  const mainRow = '<tr>'
    + '<td><div class="order-title"><div class="order-title-row"><button class="expand-btn" type="button" data-detail-toggle="' + esc(detailId) + '" aria-expanded="false"><span class="arrow">▸</span></button><strong>' + esc(name) + '</strong></div>' + note + '</div></td>'
    + '<td>' + esc(distributor) + '</td>'
    + '<td>' + esc(dateLabel) + '</td>'
    + '<td>' + items + '</td>'
    + '<td><span class="tag">' + esc(type) + '</span></td>'
    + '<td><span class="tag ' + esc(status) + '">' + esc(status) + '</span></td>'
    + '</tr>';
  const detailRow = '<tr id="' + esc(detailId) + '" class="order-details-row hidden"><td colspan="6">' + renderOrderDetails(o) + '</td></tr>';
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

  const rows = items.map((item) => {
    const itemName = item.name || 'Item';
    const qty = item.quantity ?? '—';
    const unit = item.unit || '';
    const price = item.price != null ? ('$' + Number(item.price).toFixed(2)) : '—';
    return '<tr>'
      + '<td>' + esc(itemName) + '</td>'
      + '<td>' + esc(String(qty) + (unit ? ' ' + unit : '')) + '</td>'
      + '<td>' + esc(price) + '</td>'
      + '</tr>';
  }).join('');

  return '<div class="details-panel">'
    + '<table class="details-table">'
    + '<thead><tr><th>Item</th><th>Quantity</th><th>Price</th></tr></thead>'
    + '<tbody>' + rows + '</tbody>'
    + '</table>'
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

  return list.map(normalizeOrderItem).filter(Boolean);
}

function normalizeOrderItem(item) {
  if (item == null) return null;
  if (typeof item === 'string') {
    return { name: item, quantity: null, price: null };
  }
  if (typeof item !== 'object') return { name: String(item), quantity: null, price: null };

  const name = item.name || item.itemName || item.productName || item.title || item.item || item.ingredient || item.id;
  const quantity = item.quantity ?? item.qty ?? item.count ?? item.amount ?? null;
  const unit = item.unit || item.measurement || item.uom || '';
  const rawPrice = item.price ?? item.unitPrice ?? item.cost ?? null;
  const price = rawPrice == null || rawPrice === '' || Number.isNaN(Number(rawPrice)) ? null : Number(rawPrice);

  return {
    name: name ? String(name) : 'Item',
    quantity,
    unit,
    price,
  };
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
