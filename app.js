/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
document.addEventListener('DOMContentLoaded', () => {
    const navbarList = document.getElementById('navbar__list');
    const sections = document.querySelectorAll('section');

    // Function to remove your-active-class and reset background color
    const removeActive = (section) => {
        section.classList.remove('your-active-class');
        section.style.backgroundColor = ''; 
    };

    // Function to add 'your-active-class' and set background color to highlight blue
    const addActive = (conditional, section) => {
        if (conditional) {
            section.classList.add('your-active-class');
            section.style.backgroundColor = 'blue'; // Picks out highlight color
        }
    };

    // Adds section links to nav menu
    sections.forEach(section => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        link.href = `#${section.id}`;
        link.className = 'menu__link';
        link.textContent = section.getAttribute('data-nav');

        // Add click event listener to stop default behavior 
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior

            // Smooth scroll to the section
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });

       // appends link to list itwm then appends it to navbar list
        listItem.appendChild(link);
        navbarList.appendChild(listItem);
    });

    // Intersection Observer to handle section active state
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // makes callback when 50% of section is seen
    };

    // makes an intersection to view section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sections.forEach(section => {
                    removeActive(section); // Remove active class and reset background
                });
                document.querySelectorAll('.navbar__menu .menu__link').forEach(link => link.classList.remove('active'));

                addActive(true, entry.target); // Add active class and highlight background
                const id = entry.target.getAttribute('id');
                // add active class to nav link
                document.querySelector(`.navbar__menu .menu__link[href="#${id}"]`).classList.add('active');
            }
        });
    }, observerOptions);

// observe sections
    sections.forEach(section => observer.observe(section));
});