
// here we have changed-
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase configuration-
const firebaseConfig = {
  apiKey: "AIzaSyCQV7ipB7zZhiymVhLwdXl6kjijfVK8z1w",
  authDomain: "login-d811e.firebaseapp.com",
  projectId: "login-d811e",
  storageBucket: "login-d811e.appspot.com",
  messagingSenderId: "776005841828",
  appId: "1:776005841828:web:26115f31f9265cf36e8731",
  measurementId: "G-C4EQNHF86Q"
};
// Initialize Firebase

    const app = initializeApp(firebaseConfig);
    const auth =getAuth(app);
    const provider=new GoogleAuthProvider();
    const db =getDatabase(app);

// hiding the profile and username-

 document.addEventListener("DOMContentLoaded", function(){

  const profilePic = document.getElementById("profile");
  const userName = document.getElementById("username");

// check users data is exists or not 

    const userData =localStorage.getItem("user");
    if(userData){
       const user =JSON.parse(userData);

// set user details-

    profilePic.src =user.profilePicture;
    userName.textContent=user.name.trim();

// Show profile section -
        profilePic.classList.remove("hidden");
        userName.classList.remove("hidden");
           }else{
              console.log("Login Failed !!");
           }
   });

// till here !!

const scroller = document.getElementById("scroller");
const leftButton = document.querySelector(".scroll-btn.left");
const rightButton = document.querySelector(".scroll-btn.right");
                                      
                                          // hide the left button
 leftButton.classList.add("hidden");
                                          // Function to scroll left
 function scrollLeft() {
 scroller.scrollBy({ left: -500, behavior: "smooth" });
 }
                                           // Function to scroll right
 function scrollRight() {
 scroller.scrollBy({ left: 500, behavior: "smooth" });
 }
                                           // Update button visibility based on scroll position
 function updateButtons() {
 const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;                               
                                           // Hide left button if at the start
 if (scroller.scrollLeft <= 0) {
leftButton.classList.add("hidden");
 } else {
  leftButton.classList.remove("hidden");
  }
                                                   // Hide right button if at the end
  if (scroller.scrollLeft >= maxScrollLeft) {
   rightButton.classList.add("hidden");
   } else {
     rightButton.classList.remove("hidden");
     }
  }   
                                                   // Event listeners for button clicks
  leftButton.addEventListener("click", () => {
   scrollLeft();
    setTimeout(updateButtons, 300);               // Updating buttons after scrolling animation
  });
   rightButton.addEventListener("click", () => {
  scrollRight();
    setTimeout(updateButtons, 300);              // Update buttons after scrolling animation
   });                            
                                               // Event listener for scrolling
scroller.addEventListener("scroll", updateButtons);
                                              //  typewriter effect on front page
const fixedPart = "Search";
const changeableWords = ["Genuine Colleges,", "Courses,", "Programs"];
const typewriterElement = document.querySelector(".typewriter");
let currentSentence = fixedPart;         
let wordIndex = 0;
let charIndex = 0;
let repeatCount = 0;                                       
function typeWriterEffect() {
const currentWord = changeableWords[wordIndex];                     
if (charIndex <= currentWord.length) {
typewriterElement.textContent = `${currentSentence} ${currentWord.substring(0, charIndex)}`;
charIndex++;
} else {
currentSentence += ` ${currentWord}`;
charIndex = 0;
wordIndex++;
if (wordIndex === changeableWords.length) {
repeatCount++;
if (repeatCount > 2) {
typewriterElement.textContent = currentSentence;
return;
}
wordIndex = 0;                            // Restart the effect for two extra runs
currentSentence = fixedPart;              // Reset to fixed part for reruns
setTimeout(typeWriterEffect, 1000);
return;
}
                                         // Pause before starting the next word
setTimeout(typeWriterEffect, 1000);
return;
}
setTimeout(typeWriterEffect, 150); 
}                                 
typeWriterEffect();
                                          // Effect for main page slider of college images 
const imagesWrapper=document.querySelector('.slideshow-container');
const images =document.querySelectorAll('.slideshow-container');
let currentIndex=0;
function slideImages(){
  if(currentIndex<images.length-1){
    currentIndex++;
    imagesWrapper.computedStyleMap.tranform =`translateX(-${currentIndex*100}%)`;
    setTimeout(slideImages,2500);
  }else{
    // stop after all the images are shown
   console.log("slideshow complete.");
  }
}
// swiper effect on page load
 window.onload=()=>{
  setTimeout(slideImages,1000);   
 };
                                                              //User click on any course div and 2nd page will be open
const courseDivs = document.querySelectorAll(".category");
courseDivs.forEach(function(courseDiv) {
  courseDiv.addEventListener("click", function() {          // Redirect to the course page when any course div is clicked
    window.location.href = "/course";
  });
});

function fetchNews(){
  let today=new Date();
  let sevenDaysAgo =new Date();
  sevenDaysAgo.setDate(today.getDate()-7);
  let formattedDate =sevenDaysAgo.toISOString().split('T')[0];
  var newsApiUrl = `https://newsapi.org/v2/everything?q=education&domains=ndtv.com,thehindu.com,jagran.com,indiatoday.in,hindustantimes.com,timesofindia.com,livemint.com&from=${formattedDate}&pageSize=4&sortBy=popularity&apiKey=4064bcad297349eba3a6f0ea217d885b`;
  
// Fetch data from API
   fetch(newsApiUrl)
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    console.log(data); // Check the API response in the console

    let container = document.getElementById("scroller_news"); 
    if (!container) {
      console.error("not found in HTML");
      return; 
    }   
       container.innerHTML = "";       // Clear existing content
// Check if articles exist before looping
  if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        let newsItem = document.createElement("div");
        newsItem.classList.add("card_news")
        newsItem.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <hr>
        `;
        container.appendChild(newsItem);
      });
    } else {
      container.innerHTML = "<p>No news found.</p>";
    }
  })
.catch(error => console.error("Error fetching data:", error));
}
fetchNews();
function refreshAtMidnight() {
  let now = new Date();
  let midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // Set time to midnight
  let timeUntilMidnight = midnight - now;
  setTimeout(() => {
      location.reload(); // Refresh the page at midnight
  }, timeUntilMidnight);
}
refreshAtMidnight();
setInterval(fetchNews, 12*60*60*1000);