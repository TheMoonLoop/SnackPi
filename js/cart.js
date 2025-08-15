/* == Variables globales == */
let cart = [];
const cartCountEl = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const printBtn = document.getElementById("btn-print-receipt");
const confirmModal = document.getElementById("confirmModal");
const btnYes = document.getElementById("confirmYes");
const btnNo = document.getElementById("confirmNo");

/* == Funciones de almacenamiento == */
function cartStorage(mode = "load", data = null) {
    if (mode === "load") {
        const savedCart = localStorage.getItem("cart");
        cart = savedCart ? JSON.parse(savedCart) : [];
    } else if (mode === "save" && data) {
        localStorage.setItem("cart", JSON.stringify(data));
    }
}

/* == Contador de carrito == */
function updateCartCount() {
    if (!cartCountEl) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    cartCountEl.style.display = totalItems > 0 ? "inline-block" : "none";
}

/* == Añadir producto == */
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    cartStorage("save", cart);
    updateCartCount();
}

document.addEventListener("click", e => {
    const btn = e.target.closest(".add-cart");
    if (!btn) return;

    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    addToCart({ id, name, price });
});


/* == Renderizar carrito == */
function renderCart() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="4">w</td></tr>`;
        cartTotalEl.textContent = "0.00";
        if (printBtn) printBtn.disabled = true;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="btn-qty" data-index="${index}" data-action="decrease">-</button>
                <span class="item-qty">${item.quantity}</span>
                <button class="btn-qty" data-index="${index}" data-action="increase">+</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(tr);
    });

    cartTotalEl.textContent = total.toFixed(2);
    if (printBtn) printBtn.disabled = false;
}

/* == Mensaje de confirmacion == */
function mostrarConfirmacion(callback) {
    confirmModal.style.display = "flex";

    const cerrarModal = () => {
        confirmModal.style.display = "none";
        btnYes.removeEventListener("click", confirmar);
        btnNo.removeEventListener("click", cancelar);
    };

    const confirmar = () => { callback(); cerrarModal(); };
    const cancelar = () => { cerrarModal(); };

    btnYes.addEventListener("click", confirmar);
    btnNo.addEventListener("click", cancelar);
}

/* == Generar PDF == */
function generarPDF(modo = "download") {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let turno = localStorage.getItem("numeroTurno");
    turno = turno ? parseInt(turno) + 1 : 1;
    localStorage.setItem("numeroTurno", turno);

    doc.setFontSize(18);
    doc.text("Recibo de Compra - SnackPi", 14, 20);

    const fecha = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Fecha: ${fecha}`, 200, 26, { align: "right" });
    doc.text(`Turno: ${turno}`, 200, 20, { align: "right" });

    doc.autoTable({
        html: ".carrito-tabla",
        startY: 35,
        theme: "grid",
        styles: { fontSize: 12, halign: "center" },
        didParseCell: function (data) {
            if (data.section === 'body' && data.column.index === 2) {
                data.cell.text = [data.cell.text[0].replace(/[-+]/g, '').trim()];
            }
        }
    });

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const total = cartTotalEl?.innerText || "";
    doc.text(`Total: ${total}`, 127, doc.lastAutoTable.finalY + 10, { align: "right" });

    if (modo === "view") {
        window.open(doc.output("bloburl"), "_blank");
    } else {
        doc.save(`recibo_${Date.now()}.pdf`);
    }
}

/* == Eventos == */
document.addEventListener("DOMContentLoaded", () => {
    cartStorage("load");
    updateCartCount();

    // Botones añadir desde index
    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", () => {
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price)
            };
            addToCart(product);
        });
    });

    if (document.body.classList.contains("carro-page")) {
        renderCart();

        // Botones + y -
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-qty")) {
                const index = parseInt(e.target.dataset.index);
                const action = e.target.dataset.action;

                if (action === "increase") {
                    cart[index].quantity++;
                } else if (action === "decrease") {
                    cart[index].quantity--;
                    if (cart[index].quantity <= 0) {
                        cart.splice(index, 1);
                    }
                }
                cartStorage("save", cart);
                updateCartCount();
                renderCart();
            }
        });

        // Vaciar carrito
        clearCartBtn?.addEventListener("click", () => {
            mostrarConfirmacion(() => {
                cart = [];
                cartStorage("save", cart);
                updateCartCount();
                renderCart();
            });
        });
    }

    // Botón imprimir
    printBtn?.addEventListener("click", () => {
        generarPDF("view");
    });
});
