document.getElementById("loadProfile").addEventListener("click", function () {
    loadProfile();
});

// Listen for the 'Enter' key press on the roll number input
document.getElementById("rollNumber").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent the default action (form submission)
        loadProfile();  // Trigger the load profile function
    }
});

function loadProfile() {
    let rollNumber = document.getElementById("rollNumber").value.trim();

    if (!rollNumber) {
        alert("Please enter a roll number.");
        return;
    }

    // Convert roll number to uppercase
    rollNumber = rollNumber.toUpperCase();

    // Define profile and certificates
    const profilePhotoURL = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/${rollNumber}.jpg`;
    const certificates = [
        {
            id: "ssc",
            title: "SSC Certificate",
            url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_SSC.jpg`,
        },
        {
            id: "inter",
            title: "Intermediate Certificate",
            url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_INTER.jpg`,
        },
        {
            id: "aadhar",
            title: "Aadhar Card",
            url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Aadhar.jpg`,
        },
        {
            id: "eamcet",
            title: "EAMCET Rank Card",
            url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_EAMCET_RANK.jpg`,
        },
    ];

    // Generate Navbar
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = `<a href="#profilePhoto">Profile Photo</a>`;
    certificates.forEach(cert => {
        navbar.innerHTML += `<a href="#${cert.id}">${cert.title}</a>`;
    });

    // Populate Content Sections
    const content = document.getElementById("content");
    content.innerHTML = `
        <section id="profilePhoto" class="active-section">
            <h2>Profile Photo</h2>
            <img src="${profilePhotoURL}" alt="Profile Photo">
        </section>
    `;
    certificates.forEach(cert => {
        content.innerHTML += `
            <section id="${cert.id}">
                <h2>${cert.title}</h2>
                <img src="${cert.url}" alt="${cert.title}">
            </section>
        `;
    });

    // Handle navigation clicks to switch between sections
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.querySelectorAll("section").forEach(section => {
                section.classList.remove("active-section");
            });
            document.getElementById(targetId).classList.add("active-section");
        });
    });
}
