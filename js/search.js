document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const query = params.get("q");
    const titleEl = document.getElementById("search-title");
    const sortSelect = document.getElementById("sort-select");
    const resultsContainerId = "search-results";

    if (!category && !query) {
        titleEl.textContent = "Escribe algo para buscar.";
        return;
    }

    let filtered = products;
    if (category) {
        if (category.toLowerCase() === "all") {
            filtered = products;
            titleEl.textContent = "Todos los productos";
        } else {
            filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
            titleEl.textContent = `Categoría: ${category}`;
        }
    } else if (query) {
        filtered = products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            (p.alt && p.alt.toLowerCase().includes(query.toLowerCase()))
        );
        titleEl.textContent = `Resultados para: "${query}"`;
    } else {
        titleEl.textContent = "Todos los productos";
    }
    
    function sortAndRender(criteria) {
        let sorted = [...filtered];
        if (criteria === "name") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === "price-asc") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (criteria === "price-desc") {
            sorted.sort((a, b) => b.price - a.price);
        }
        renderProducts(sorted, resultsContainerId);
    }
    const savedSort = localStorage.getItem("sortPreference") || "name";
    sortSelect.value = savedSort;
    sortAndRender(savedSort);
    sortSelect.addEventListener("change", () => {
        localStorage.setItem("sortPreference", sortSelect.value);
        sortAndRender(sortSelect.value);
    });
});
