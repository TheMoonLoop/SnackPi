// Cards
function createStars(stars) {
   return Array.from({ length: 5 }, (_, i) =>
      `<i class="fa-${i < stars ? "solid" : "regular"} fa-star"></i>`
   ).join("");
}

function renderProducts(productIds, containerId) {
   const container = document.getElementById(containerId);
   if (!container) return;

   let productsArray = [];
   if (typeof productIds === "string") {
      const ids = productIds.split(",").map(id => id.trim());
      productsArray = products.filter(p => ids.includes(p.id));
   } else if (Array.isArray(productIds)) {
      productsArray = productIds;
   }

   container.innerHTML = productsArray.map(p => `
      <article class="card-product">
         <div class="container-img">
            <img src="${p.image}" alt="${p.alt}" />
               ${p.discount ? `<span class="discount">${p.discount}%</span>` : ""}
               <div class="button-group">
                  <span class="view-product" data-id="${p.id}" aria-label="Ver ${p.name}"><i class="fa-regular fa-eye"></i></span>
                  <span class="btn-fav" aria-label="Agregar ${p.name} a favoritos"><i class="fa-regular fa-heart"></i></span>
                  <span class="btn-share" aria-label="Compartir ${p.name}"><i class="fa-solid fa-share"></i></span>
               </div>
            </div>
            <div class="content-card-product">
               <div class="stars" aria-label="${p.stars} de 5 estrellas">
                  ${createStars(p.stars)}
               </div>
               <h3>${p.name}</h3>
               <button 
                  class="add-cart" 
                  aria-label="Añadir ${p.name} al carrito"
                  data-id="${p.id}"
                  data-name="${p.name}"
                  data-price="${p.price}">
                  <i class="fa-solid fa-basket-shopping"></i>
               </button>
               <p class="price">$${p.price.toFixed(2)}</p>
            </div>
         </article>
   `).join("");
}

// Botón de Ver (SPA)
document.addEventListener("click", e => {
   const viewBtn = e.target.closest(".view-product");
   if (viewBtn) showProductDetail(viewBtn.dataset.id);
});

// Boton de compartir
document.addEventListener("click", e => {
   const shareBtn = e.target.closest(".btn-share");
   if (!shareBtn) return;

   const card = shareBtn.closest(".card-product");
   const productName = card?.querySelector("h3")?.textContent || "Producto";
   const productUrl = location.href;

   if (navigator.share) {
      navigator.share({
         title: productName,
         text: `Mira este producto: ${productName}`,
         url: productUrl
      }).catch(console.warn);
   } else {
      navigator.clipboard.writeText(`${productName} - ${productUrl}`)
   	   .then(() => alert("Enlace copiado ✅"))
         .catch(() => alert("Error al copiar ❌"));
   }
});

// Productos
document.addEventListener("DOMContentLoaded", () => {
    const destacadosBtn = document.querySelector(".container-options span:nth-child(1)");
    const recientesBtn = document.querySelector(".container-options span:nth-child(2)");
    const vendidosBtn = document.querySelector(".container-options span:nth-child(3)");
    const container = document.getElementById("destacados");

    function activarBoton(boton) {
        document.querySelectorAll(".container-options span").forEach(el => el.classList.remove("active"));
        boton.classList.add("active");
    }

    function animarRender() {
        container.classList.add("fade-out");
        setTimeout(() => {
            container.classList.remove("fade-out");
            container.classList.add("fade-in");
            setTimeout(() => container.classList.remove("fade-in"), 300);
        }, 200);
    }

    destacadosBtn.addEventListener("click", () => {
        activarBoton(destacadosBtn);
        animarRender();
        renderProducts("cho,na,heor,frcr", "destacados");
    });

    recientesBtn.addEventListener("click", () => {
        activarBoton(recientesBtn);
        animarRender();
        const recientes = [...products]
            .slice(-4)
            .sort((a, b) => a.name.localeCompare(b.name, 'es'));
        renderProducts(recientes, "destacados");
    });

    vendidosBtn.addEventListener("click", () => {
        activarBoton(vendidosBtn);
        animarRender();
        const masVendidos = [...products]
            .sort((a, b) => {
                if (b.stars !== a.stars) return b.stars - a.stars;
                return a.name.localeCompare(b.name, 'es');
            })
            .slice(0, 4);
        renderProducts(masVendidos, "destacados");
    });

    // Render por defecto al cargar
    activarBoton(destacadosBtn);
    renderProducts("cho,na,heor,frcr", "destacados");
});

// Detalle
function loadProductCSS() {
   if (!document.querySelector('link[href="css/product.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/product.css";
      document.head.appendChild(link);
   }
}

// Función para renderizar detalle
function showProductDetail(id) {
   const product = products.find(p => p.id === id);
   if (!product) return;

   const banner = document.getElementById("banner");
   const main = document.querySelector("main");
   const detail = document.getElementById("product-detail");

   if (banner) banner.classList.add("fade-out");
   if (main) main.classList.add("fade-out");
   setTimeout(() => {
      if (banner) banner.classList.add("hidden");
      if (main) main.classList.add("hidden");

	   loadProductCSS();
	   detail.style.display = "block";
	   detail.innerHTML = `
	      <article class="product-detail-card" style="opacity:0; transform:translateY(20px);">
	         <div class="detail-img">
	            <img src="${product.image}" alt="${product.alt}">
	         </div>
	         <div class="detail-info">
	            <h2>${product.name}</h2>
	            <div class="stars">${createStars(product.stars)}</div>
	            <p class="price">$${product.price.toFixed(2)}</p>
	            <p class="description">${product.alt || "Sin descripción disponible."}</p>
	            <div class="buttons">
	               <button 
	                  class="add-cart" 
	                  data-id="${product.id}" 
	                  data-name="${product.name}" 
	                  data-price="${product.price}">
	                  Añadir al carrito
	               </button>
	               <button id="back-to-home" class="back-btn">Volver</button>
	            </div>
	         </div>
	      </article>
	   `;
	  	requestAnimationFrame(() => {
	      const card = detail.querySelector(".product-detail-card");
	      card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
	      card.style.opacity = "1";
	      card.style.transform = "translateY(0)";
	   });
	}, 300);
}

// Manejo del botón atrás del navegador
window.addEventListener("popstate", () => {
    if (location.hash.startsWith("#producto-")) {
        const id = location.hash.replace("#producto-", "");
        showProductDetail(id);
    } else {
        showHome();
    }
});
document.addEventListener("click", e => {
    if (e.target.id === "back-to-home") showHome();
});

function showHome() {
   const banner = document.getElementById("banner");
   const main = document.querySelector("main");
   const detail = document.getElementById("product-detail");

   detail.classList.remove("fade-in");
   detail.classList.add("fade-out");
   setTimeout(() => {
      detail.classList.add("hidden");

      if (banner) {
         banner.classList.remove("hidden", "fade-out");
         banner.classList.add("fade-in");
      }
      if (main) {
         main.classList.remove("hidden", "fade-out");
         main.classList.add("fade-in");
      }
   }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".search-form");
    const searchInput = searchForm?.querySelector('input[type="search"]');

    if (searchForm && searchInput) {
        const originalPlaceholder = searchInput.placeholder;

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const term = searchInput.value.trim();

            if (!term) {
                searchInput.value = "";
                searchInput.placeholder = "Por favor escribe algo...";
                searchInput.classList.add("input-error");

                setTimeout(() => {
                    searchInput.placeholder = originalPlaceholder;
                    searchInput.classList.remove("input-error");
                }, 3000);
                return;
            }

            window.location.href = `search.html?q=${encodeURIComponent(term)}`;
        });
    }
});
