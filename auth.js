// auth.js
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET"
});
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const greeting = document.getElementById('user-greeting');

auth.onAuthStateChanged(user => {
  if (user) {
    loginBtn.classList.add('d-none');
    logoutBtn.classList.remove('d-none');
    greeting.textContent = user.email;
    loadCartCount();
  } else {
    loginBtn.classList.remove('d-none');
    logoutBtn.classList.add('d-none');
    greeting.textContent = '';
  }
});

loginBtn.addEventListener('click', () => {
  const email = prompt('Email:');
  const pw = prompt('Password:');
  auth.signInWithEmailAndPassword(email, pw).catch(err => alert(err.message));
});
logoutBtn.addEventListener('click', () => auth.signOut());

async function loadCartCount() {
  const user = auth.currentUser;
  if (!user) return;
  const snap = await db.collection('carts').doc(user.uid).collection('items').get();
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = snap.size);
}
