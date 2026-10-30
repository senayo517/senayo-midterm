
// ========================================
// TINDAHAN NI JUAN
// JavaScript + GSAP + ScrollTrigger
// ========================================


// ========================================
// 1. DARK MODE
// ========================================

const darkModeToggle = document.getElementById("darkModeToggle");
const htmlElement = document.documentElement;

// Restore saved theme
const savedTheme = localStorage.getItem("tindahan-theme");

if (savedTheme === "dark") {
    htmlElement.classList.add("dark");
} else if (savedTheme === "light") {
    htmlElement.classList.remove("dark");
}

// Update accessibility state
function updateThemeButton() {
    const isDark = htmlElement.classList.contains("dark");

    darkModeToggle.setAttribute("aria-pressed", String(isDark));
}

updateThemeButton();

// Toggle theme
darkModeToggle.addEventListener("click", () => {

    // Required dark mode functionality
    htmlElement.classList.toggle("dark");

    const isDark = htmlElement.classList.contains("dark");

    // Save visitor preference
    localStorage.setItem(
        "tindahan-theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();

    // GSAP click interaction: rotate the theme button
    gsap.fromTo(
        darkModeToggle,
        {
            rotation: 0
        },
        {
            rotation: 360,
            duration: 0.6,
            ease: "back.out(1.7)",
            overwrite: true,
            onComplete: () => {
                gsap.set(darkModeToggle, {
                    rotation: 0
                });
            }
        }
    );

});


// ========================================
// 2. GSAP INITIALIZATION
// ========================================

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// ========================================
// 3. GSAP PAGE LOAD INTRO
// ========================================

if (!prefersReducedMotion) {

    // Power3.out creates a smooth and natural entrance.
    const introTimeline = gsap.timeline({
        defaults: {
            duration: 0.65,
            ease: "power3.out"
        }
    });

    // Step 1: Animate the header
    introTimeline.from(
        "header",
        {
            y: -30,
            opacity: 0
        }
    );

    // Step 2: Animate hero content with stagger
    introTimeline.from(
        ".hero-content > *",
        {
            y: 35,
            opacity: 0,
            stagger: 0.12
        },
        "-=0.35"
    );

    // Step 3: Animate the hero image with overlap
    introTimeline.from(
        ".hero-image",
        {
            y: 45,
            opacity: 0,
            scale: 0.96
        },
        "-=0.4"
    );

}


// ========================================
// 4. SCROLLTRIGGER ANIMATIONS
// ========================================

// Scroll animations only run when the visitor
// has not enabled reduced motion.

const scrollAnimations = gsap.matchMedia();

scrollAnimations.add(
    "(prefers-reduced-motion: no-preference)",
    () => {

        // Reveal each section and product card
        gsap.utils.toArray(".reveal").forEach((element) => {

            gsap.from(element, {
                y: 45,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

        });


        // Scroll-linked progress bar
        gsap.to("#progressBar", {
            scaleX: 1,
            ease: "none",

            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

    }
);


// ========================================
// 5. CONTACT FORM DEMO
// ========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

    // Prevent actual form submission
    event.preventDefault();

    const customerName = document.getElementById("name").value.trim();

    // Display a demo confirmation
    formMessage.textContent =
        `Thank you, ${customerName}! This is a demonstration form.`;

    // Clear form fields
    contactForm.reset();

});




