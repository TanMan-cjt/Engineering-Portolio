// Smooth scrolling for nav links
function scrollToSection(id) {
    const section = document.getElementById(id);
    window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
    });
}

// Sticky navbar behavior
window.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("main-nav");
    const hero = document.getElementById("hero");

    // Create spacer to prevent jump
    const spacer = document.createElement("div");
    spacer.style.height = navbar.offsetHeight + "px";

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        if (scrollY >= hero.offsetHeight) {
            if (!navbar.classList.contains("sticky")) {
                navbar.parentNode.insertBefore(spacer, navbar);
                navbar.classList.add("sticky");
            }
        } else {
            if (navbar.classList.contains("sticky")) {
                navbar.parentNode.removeChild(spacer);
                navbar.classList.remove("sticky");
            }
        }
    });
});

document.querySelectorAll(".project-card").forEach(card => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play();
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Experience timeline popup data
const experienceData = {
    1: {
        title: "Training – ProAutomated",
        location: "Delaware",
        dates: "May 2024",
        type: "Training",
        bullets: [
            "Completed intensive electromechanical & field-engineering training.",
            "Gained proficiency in safety protocols, troubleshooting, and installation techniques.",
            "Prepared for multi-site deployment across North America."
        ]
    },
    2: {
        title: "Conveyance – Amazon",
        location: "California",
        dates: "June 2024",
        type: "Conveyance Installation",
        bullets: [
            "Installed conveyor systems, including electrical wiring and control integration.",
            "Programmed PLCs and verified operational functionality of automated conveyors.",
            "Conducted troubleshooting and minor repairs to ensure system reliability."
        ]
    },
    3: {
        title: "Conveyance – Amazon",
        location: "Maryland",
        dates: "July 2024",
        type: "Conveyance Commissioning",
        bullets: [
            "Supported end-to-end commissioning of conveyance systems for operational readiness.",
            "Performed testing and validation of system functionality under live conditions.",
            "Assisted with troubleshooting issues during go-live to minimize downtime."
        ]
    },
    4: {
        title: "Conveyance – Amazon",
        location: "Pennsylvania",
        dates: "August 2024",
        type: "Conveyance Commissioning",
        bullets: [
            "Commissioned and tested conveyor systems prior to operational launch.",
            "Collaborated with on-site teams to resolve system issues in real time.",
            "Verified functionality of automated controls and safety systems."
        ]
    },
    5: {
        title: "Conveyance – Amazon",
        location: "British Columbia",
        dates: "September 2024",
        type: "Conveyance Commissioning",
        bullets: [
            "Conducted commissioning, system verification, and troubleshooting for new conveyor installations.",
            "Coordinated with field engineers to optimize operational performance.",
            "Ensured compliance with safety and operational standards during system startup.",
        ]
    },
    6: {
        title: "Conveyance – Amazon",
        location: "Michigan",
        dates: "October 2024",
        type: "Conveyance Commissioning",
        bullets: [
            "Provided on-site support for conveyor commissioning and system startup.",
            "Diagnosed and resolved electrical and control system issues.",
            "Assisted in testing and validation to ensure seamless operational handoff."
        ]
    },
    7: {
        title: "Data Center – Google",
        location: "Nebraska",
        dates: "November 2024",
        type: "Data Center Start-Up",
        bullets: [
            "Performed point-to-point testing to verify network and power system integrity.",
            "Conducted panel inspections and checkout procedures for new installations.",
            "Assisted in identifying and resolving discrepancies in electrical and control systems."
        ]
    },
    8: {
        title: "Data Center – QTS",
        location: "Arizona",
        dates: "December 2024 - May 2025",
        type: "Data Center Start-Up & Hand-Off",
        bullets: [
            "Installed and verified entire data center systems, including sensors, panels, and transformers.",
            "Performed generator testing, panel rewiring, and comprehensive point-to-point verification.",
            "Ensured compliance with design specifications and operational standards.",
            "Collaborated with multidisciplinary teams to complete complex installation projects."
        ]
    },
    9: {
        title: "Data Center – QTS",
        location: "Virginia",
        dates: "June - July 2025",
        type: "Data Center Start-Up",
        bullets: [
            "Conducted HMI testing and panel rewiring for data center systems.",
            "Executed point-to-point checks to ensure accurate connectivity and functionality.",
            "Assisted in troubleshooting and resolving system discrepancies.",
            "Coordinated with engineering teams to optimize system performance."
        ]
    }
};

// ---------- ALWAYS-VISIBLE TIMELINE POPUP WITH ACTIVE HIGHLIGHTING ----------
document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".timeline-item");
    const popup = document.getElementById("experience-popup");
    const timeline = document.querySelector(".timeline-left");
    const timelineHeight = timeline.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (timelineHeight > viewportHeight) {
        popup.classList.add("small-screen");
    } else {
        popup.classList.remove("small-screen");
    }

    let activeId = "1"; // default active item

    // Fill popup with experience data
    function populatePopup(id) {
        const data = experienceData[id];
        if (!data) return;

        popup.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Dates:</strong> ${data.dates}</p>
        <p><strong>Type:</strong> ${data.type}</p>
        <ul>${data.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
        `;
    }

    // Update timeline highlighting + popup content
    function setActiveItem(id) {
        activeId = id;

        items.forEach(item => {
        if (item.dataset.id === id) {
            item.classList.add("active");
            item.classList.remove("inactive");
        } else {
            item.classList.remove("active");
            item.classList.add("inactive");
        }
        });

        populatePopup(id);
    }

    // INITIAL LOAD (popup always visible)
    popup.classList.add("visible");
    setActiveItem(activeId);

    // HOVER BEHAVIOR (switch active item)
    items.forEach(item => {
        item.addEventListener("mouseenter", () => {
        const id = item.dataset.id;
        if (id !== activeId) {
            setActiveItem(id);
        }
        });
    });

});

function handleSmallScreenPopup() {
    const popup = document.getElementById("experience-popup");
    const timeline = document.querySelector(".timeline-left");
    const MARGIN = window.innerHeight * 0.15;

    // 1️⃣ Determine if small screen mode is active
    const timelineHeight = timeline.offsetHeight;
    const viewportHeight = window.innerHeight;
    let isSmallScreen = false;

    if (timelineHeight > viewportHeight) {
        isSmallScreen = true;
    } else {
        isSmallScreen = false;
    }

    // 2️⃣ Only run small screen logic if true
    if (!isSmallScreen) {
        popup.classList.remove("fixed-mode", "sticky-bottom");
        popup.style.removeProperty("--popup-left");
        popup.style.removeProperty("--popup-width");
        return;
    }

    // 3️⃣ Freeze width and left position for fixed mode
    if (!popup.style.getPropertyValue("--popup-width")) {
        const rect = popup.getBoundingClientRect();
        popup.style.setProperty("--popup-width", `${rect.width}px`);
        popup.style.setProperty("--popup-height", `${rect.height}px`);
    }

    // 4️⃣ Determine scroll behavior
    const timelineRect = timeline.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    // FIXED while timeline is scrolling
    if (
        timelineRect.top <= MARGIN &&
        timelineRect.bottom > popupRect.height + MARGIN
    ) {
        if (!popup.classList.contains("fixed-mode")) {
            enterFixedMode(popup);
        }
        popup.classList.remove("sticky-bottom");
    }
    // STICKY at bottom when timeline ends
    else if (timelineRect.bottom - 5 <= popupRect.height + MARGIN) {

        popup.classList.remove("fixed-mode");
        popup.classList.add("sticky-bottom");

        popup.style.removeProperty("top");
    }
    // NORMAL sticky top
    else {
        popup.classList.remove("fixed-mode", "sticky-bottom");
        popup.style.removeProperty("top");
    }
}

// Run on scroll and resize
window.addEventListener("scroll", handleSmallScreenPopup);
window.addEventListener("resize", handleSmallScreenPopup);
window.addEventListener("load", handleSmallScreenPopup);

function enterFixedMode(popup) {
    const rect = popup.getBoundingClientRect();

    popup.style.setProperty("--popup-left", `${rect.left}px`);
    popup.style.setProperty("--popup-width", `${rect.width}px`);

    popup.classList.add("fixed-mode");
}