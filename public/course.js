document.addEventListener("DOMContentLoaded", function () {
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");
    const courseSelect = document.getElementById("course");
    const submitButton = document.getElementById("submit-button");
    const cardContainer = document.getElementById("card-container");

    const courses = [
        "Engineering", "Management", "Medical", "Science", "Animation",
        "Hotel Management", "Nursing", "Agriculture", "Pharmacy", "Law",
        "Paramedical", "Dental", "Commerce", "Mass Communication"
    ];

// Function to populate courses dropdown
    function populateCourses() {
        courseSelect.innerHTML = "<option value=''>Select Course</option>";
        courses.forEach((course) => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseSelect.appendChild(option);
        });
    }
// Function to populate states

    function populateStates(data) {
        stateSelect.innerHTML = "<option value=''>Select State</option>";
        for (let state in data) {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        }

        if (stateSelect.options.length > 1) {
            populateCities(data[stateSelect.options[1].value]);
        }

        stateSelect.addEventListener("change", function () {
            const selectedState = stateSelect.value;
            if (selectedState) {
                populateCities(data[selectedState]);
            }
        });
    }

 // Function to populate cities

    function populateCities(stateData) {
        if (!stateData.cities || stateData.cities.length === 0) {
            citySelect.innerHTML = "<option value=''>No Cities Available</option>";
            citySelect.disabled = true;
            return;
        }

        citySelect.innerHTML = "<option value=''>Select City</option>";
        citySelect.disabled = false;

        stateData.cities.forEach((city) => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

// Fetch colleges based on selected filters

    function fetchColleges(course, city) {
        cardContainer.innerHTML = "<p>Loading colleges...</p>";
        fetch(`/api/colleges?course=${course}&city=${city}`)
            .then((response) => response.json())
            .then((colleges) => {
                generateCards(colleges);
            })
            .catch((error) => {
                console.error("Error fetching colleges:", error);
                cardContainer.innerHTML = "<p>Error loading colleges. Please try again later.</p>";
            });
    }

// Function to generate college cards

    function generateCards(colleges) {
        cardContainer.innerHTML = "";

        const imageList = [
            'clg_img2.jpeg', 'clg_img3.jpeg', 'clg_img4.webp', 'clg_img5.webp',
            'clg_img6.webp', 'clg_img7.webp', 'clg_img8.webp', 'clg_img9.webp',
            'clg_img10.webp', 'clg_img11.jpg', 'clg_img12.jpg', 'clg_img13.jpg'
        ];
        let lastImage = null;

        if (!colleges || colleges.length === 0) {
            cardContainer.innerHTML = "<p>No colleges found for the selected course and city.</p>";
            return;
        }

        colleges.forEach((college) => {
            const card = document.createElement("div");
            card.classList.add("card");

// Select a random image from the list

            let randomImage;
            do {
                randomImage = imageList[Math.floor(Math.random() * imageList.length)];
            } while (randomImage === lastImage);
            lastImage = randomImage;

 // Ensure the correct college name is displayed

            card.innerHTML = `
                <img src="./images/${randomImage}" alt="University Image">
                <div class="card-content">
                     <p>${college || "Not found"}</p> 
                     <p>${citySelect.value || "Not metioned"}</p> 
                     <a href="college.html?name=${encodeURIComponent(college)}" target="_blank"> View Details </a>
                </div>`;
            cardContainer.appendChild(card);
        });
    }
// Fetch and display random colleges on page load

    function fetchRandomColleges() {
        cardContainer.innerHTML = "<p>Loading random colleges...</p>";
        fetch("/api/random-colleges")
            .then((response) => response.json())
            .then((colleges) => {
                generateRandomCards(colleges);
            })
            .catch((error) => {
                console.error("Error fetching random colleges:", error);
                cardContainer.innerHTML = "<p>Error loading random colleges. Please try again later.</p>";
            });
    }
    
 // Generate random college cards

    function generateRandomCards(colleges) {
        cardContainer.innerHTML = "";

        const imageList = [
            'clg_img2.jpeg', 'clg_img3.jpeg', 'clg_img4.webp', 'clg_img5.webp',
            'clg_img6.webp', 'clg_img7.webp', 'clg_img8.webp', 'clg_img9.webp',
            'clg_img10.webp', 'clg_img11.jpg', 'clg_img12.jpg', 'clg_img13.jpg'
        ];

        if (!colleges || colleges.length === 0) {
            cardContainer.innerHTML = "<p>No random colleges available.</p>";
            return;
        }
    colleges.forEach((college) => {
            const card = document.createElement("div");
            card.classList.add("card");

            let randomImage = imageList[Math.floor(Math.random() * imageList.length)];

            card.innerHTML = `
                <img src="./images/${randomImage}" alt="University Image">
                <div class="card-content">
                    <p>${college.name || "Not found"}</p> 
                    <p>${college.course || "Not mentioned"}</p> 
                    <a href="college.html?name=${encodeURIComponent(college.name)}" target="_blank"> View Details </a>
                </div>`;
            cardContainer.appendChild(card);
        });
    }
// Fetch state and city data

    fetch("/api/data")
        .then((response) => response.json())
        .then((data) => {
            populateStates(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

// Event listener for submit button (fetch filtered colleges)

    submitButton.addEventListener("click", function () {
        const selectedCourse = courseSelect.value;
        const selectedCity = citySelect.value;

        if (!selectedCourse) {
            alert("Please select a course!");
            return;
        }
        if (!selectedCity) {
            alert("Please select a city!");
            return;
        }
        fetchColleges(selectedCourse, selectedCity);
    });

// Initialize dropdowns
    populateCourses();
// Fetch and display random colleges on page load
    fetchRandomColleges();
});
