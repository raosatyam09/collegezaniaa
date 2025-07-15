
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth,GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQV7ipB7zZhiymVhLwdXl6kjijfVK8z1w",
  authDomain: "login-d811e.firebaseapp.com",
  projectId: "login-d811e",
  storageBucket: "login-d811e.appspot.com", // Fixed storageBucket
  messagingSenderId: "776005841828",
  appId: "1:776005841828:web:26115f31f9265cf36e8731",
  measurementId: "G-C4EQNHF86Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

// Google Login (Popup)-
document.getElementById('google').addEventListener("click", () => {
  signInWithPopup(auth, provider)
  .then((result) => {
      if (result && result.user) {
          const user = result.user;
          console.log("User Logged in:", user);

          // Save user data to Firebase Realtime Database
          set(ref(db, 'users/' + user.uid), {
              name: user.displayName,
              email: user.email,
              profilePicture: user.photoURL
          });

          // Store user details in localStorage
          localStorage.setItem('user', JSON.stringify({
              name: user.displayName,
              profilePicture: user.photoURL
          }));

          // Redirect to index.html
          window.location.replace("../collegezania/index.html");
      }
  })
  .catch((error) => {
      console.error("Google sign-in error:", error.message);
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginBtn.addEventListener('click', function() {
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    signupBtn.addEventListener('click', function() {
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
});

// Get submit button
const submit = document.getElementById('submit');

submit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent page reload

    // Fetch email and password inside the event listener
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        alert(`Account created successfully!`);
      })

      .catch((error) => {
        console.error("Error signing up:", error.message); // Debugging: Display error message
        alert(error.message);
    });

});
