// TIME
    function updateTime() {
        document.getElementById("time").innerText =
            new Date().toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // THEME TOGGLE
    const toggle = document.getElementById("themeToggle");
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    const searchTrigger = document.getElementById("searchTrigger");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");

    const allItems = Array.from(document.querySelectorAll(".search-item"));
    let visibleItems = [...allItems];
    let activeIndex = 0;

    function openSearch() {
        searchOverlay.style.display = "flex";
        searchInput.value = "";
        searchInput.focus();

        allItems.forEach(item => item.style.display = "flex");
        visibleItems = [...allItems];
        setActive(0);
    }

    function closeSearchModal() {
        searchOverlay.style.display = "none";
    }

    function setActive(index) {
        visibleItems.forEach(i => i.classList.remove("active"));
        if (visibleItems[index]) {
            visibleItems[index].classList.add("active");
            activeIndex = index;
        }
    }

    // Open on click only
    searchTrigger.addEventListener("click", openSearch);
    closeSearch.addEventListener("click", closeSearchModal);

    // ESC close + keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (searchOverlay.style.display !== "flex") return;

        if (e.key === "Escape") closeSearchModal();

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((activeIndex + 1) % visibleItems.length);
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((activeIndex - 1 + visibleItems.length) % visibleItems.length);
        }

        if (e.key === "Enter") {
            visibleItems[activeIndex]?.click();
        }
    });

    // Filter logic (FIXED)
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        visibleItems = allItems.filter(item => {
            const match = item.innerText.toLowerCase().includes(query);
            item.style.display = match ? "flex" : "none";
            return match;
        });

        setActive(0);
    });

    // Navigation
    allItems.forEach(item => {
        item.addEventListener("click", () => {
            window.location.href = item.dataset.link;
        });
    });

document.getElementById("year").textContent = new Date().getFullYear();

let currentScroll = window.scrollY;
let targetScroll = currentScroll;
let isScrolling = false;


// Smoother Effects


// window.addEventListener("wheel", (e) => {
//     e.preventDefault();
//     targetScroll += e.deltaY * 0.9; // smaller = slower
//     targetScroll = Math.max(
//         0,
//         Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
//     );

//     if (!isScrolling) smoothScroll();
// }, { passive: false });

// function smoothScroll() {
//     isScrolling = true;
//     currentScroll += (targetScroll - currentScroll) * 0.09; // easing
//     window.scrollTo(0, currentScroll);

//     if (Math.abs(targetScroll - currentScroll) > 0.5) {
//         requestAnimationFrame(smoothScroll);
//     } else {
//         isScrolling = false;
//     }
// }
const topbar = document.querySelector(".topbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        topbar.classList.add("scrolled");
    } else {
        topbar.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (!hamburger || !sidebar || !overlay) {
        console.error("Hamburger / Sidebar / Overlay missing");
        return;
    }

    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

});