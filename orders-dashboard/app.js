import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

const cfg = window.AHARA_FIREBASE_CONFIG;
if (!cfg || !cfg.apiKey || cfg.apiKey === 'REPLACE_ME') {
  document.body.innerHTML = `
    <main class="container" style="margin-top:24px;">
      <section class="card">
        <h2>Dashboard setup required</h2>
        <p class="muted">Set <strong>web_dashboard/config.js</strong> with your Firebase Web config before deploying.</p>
      </section>
    </main>
  `;
  throw new Error('Missing Firebase web config in web_dashboard/config.js');
}

const app = initializeApp(cfg);
const auth = getAuth(app);
const db = getFirestore(app);

const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const authStateEl = document.getElementById('authState');
const groupIdEl = document.getElementById('groupId');
const loadBtn = document.getElementById('loadBtn');
const summaryGridEl = document.getElementById('summaryGrid');
const statusBucketsEl = document.getElementById('statusBuckets');
const typeBucketsEl = document.getElementById('typeBuckets');

let stopWatching = null;

signInBtn.addEventListener('click', async () => {
  try {
    await signInWithEmailAndPassword(auth, emailEl.value.trim(), passwordEl.value);
  } catch (e) {
    alert(e.message || String(e));
  }
});

signOutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
  } catch (e) {
    alert(e.message || String(e));
  }
});

onAuthStateChanged(auth, (user) => {
  authStateEl.textContent = user
    ? `Signed in as ${user.email ?? user.uid}`
    : 'Not signed in';
});

loadBtn.addEventListener('click', () => {
  const groupId = groupIdEl.value.trim();
  if (!groupId) {
    alert('Enter groupId');
    return;
  }
  watchGroupOrders(groupId);
});

function watchGroupOrders(groupId) {
  if (stopWatching) {
    stopWatching();
    stopWatching = null;
  }

  const q = query(
    collection(db, 'groups', groupId, 'orders'),
    orderBy('createdAt', 'desc')
  );

  stopWatching = onSnapshot(
    q,
    (snap) => {
      const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      renderDashboard(orders);
    },
    (err) => {
      alert(err.message || String(err));
    }
  );
}

function renderDashboard(orders) {
  const byStatus = {
    pending: [],
    approved: [],
    rejected: [],
  };

  const byType = {
    Receipt: [],
    Distributor: [],
    Manual: [],
  };

  for (const o of orders) {
    const status = normalizeStatus(o.status);
    if (!byStatus[status]) byStatus[status] = [];
    byStatus[status].push(o);

    const type = inferType(o);
    if (!byType[type]) byType[type] = [];
    byType[type].push(o);
  }

  summaryGridEl.innerHTML = [
    statCard('Total Orders', orders.length),
    statCard('Pending', byStatus.pending.length),
    statCard('Approved', byStatus.approved.length),
    statCard('Rejected', byStatus.rejected.length),
    statCard('Receipt Imports', byType.Receipt.length),
    statCard('Manual Orders', byType.Manual.length),
  ].join('');

  statusBucketsEl.innerHTML = [
    bucket('Pending', byStatus.pending),
    bucket('Approved', byStatus.approved),
    bucket('Rejected', byStatus.rejected),
  ].join('');

  typeBucketsEl.innerHTML = [
    bucket('Receipt', byType.Receipt),
    bucket('Distributor', byType.Distributor),
    bucket('Manual', byType.Manual),
  ].join('');
}

function normalizeStatus(raw) {
  const s = String(raw || 'pending').toLowerCase();
  if (s === 'approved' || s === 'rejected') return s;
  return 'pending';
}

function inferType(order) {
  const note = String(order.note || '').toLowerCase();
  if (note.includes('receipt') || note.includes('imported from receipt')) {
    return 'Receipt';
  }
  if (order.distributorId) return 'Distributor';
  return 'Manual';
}

function statCard(title, value) {
  return `<article class="stat"><div class="k">${escapeHtml(title)}</div><div class="v">${value}</div></article>`;
}

function bucket(title, orders) {
  const rows = orders.length
    ? orders.map((o) => orderRow(o)).join('')
    : `<div class="order-row"><div class="meta">No orders</div><div></div><div></div></div>`;

  return `<details class="bucket" open>
    <summary>${escapeHtml(title)} (${orders.length})</summary>
    ${rows}
  </details>`;
}

function orderRow(o) {
  const date = asDate(o.orderDate) || asDate(o.createdAt);
  const dateLabel = date ? formatDate(date) : 'No date';
  const distributor = o.distributorName || 'No distributor';
  const itemCount = Array.isArray(o.items) ? o.items.length : 0;
  const status = normalizeStatus(o.status);

  return `<div class="order-row">
    <div>
      <div>${escapeHtml(o.title || 'Order')}</div>
      <div class="meta">${escapeHtml(distributor)} · ${dateLabel} · ${itemCount} items</div>
    </div>
    <span class="tag">${escapeHtml(inferType(o))}</span>
    <span class="tag">${escapeHtml(status)}</span>
  </div>`;
}

function asDate(field) {
  if (!field) return null;
  if (field.seconds) return new Date(field.seconds * 1000);
  if (field.toDate) return field.toDate();
  return null;
}

function formatDate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}/${String(d.getFullYear()).slice(-2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
