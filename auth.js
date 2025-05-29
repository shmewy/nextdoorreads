// auth.js
// 1) Your Firebase config (replace with yours):
const firebaseConfig = {
  apiKey: "...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
const storage = firebase.storage();

// 2) Elements:
const loginBtn  = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const greeting  = document.getElementById('user-greeting');

// 3) Auth state observer:
auth.onAuthStateChanged(user => {
  if (user) {
    loginBtn.classList.add('d-none');
    logoutBtn.classList.remove('d-none');
    greeting.textContent = `Hello, ${user.displayName || user.email}`; 
  } else {
    loginBtn.classList.remove('d-none');
    logoutBtn.classList.add('d-none');
    greeting.textContent = '';
  }
});

// 4) Simple login / logout (email popup):
loginBtn.addEventListener('click', () => {
  const email = prompt('Email:');
  const pw    = prompt('Password:');
  auth.signInWithEmailAndPassword(email, pw)
    .catch(err => alert(err.message));
});
logoutBtn.addEventListener('click', () => auth.signOut());
