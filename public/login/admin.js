 
document.getElementById("signupForm").addEventListener("submit", async (e) =>{
    e.preventDefault();

    const email= document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response =await fetch("http://localhost:8000/api/admin/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    });

    const data =await response.json();

    if(data.success){
          window.location.href=data.redirectTo;
    } else{
        alert(data.message);
    }
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

// Opening Google Form - 

document.getElementById("verification").addEventListener("click", function(){
      window.open("https://forms.gle/JsMiFKYSX3R94Z5z6","_blank")
});

 