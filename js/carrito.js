const productos = [
    { nombre: "Alphafly 3 Electric", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 20, precio: 459.999 },
    { nombre: "Alphafly 2", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 18, precio: 459.999},
    { nombre: "Infinity Electric", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 17, precio: 284.999},
    { nombre: "Blueprint", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 16, precio: 275.999},
    { nombre: "Vaporfly Premium", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 20, precio: 449.999},
    { nombre: "Vaporfly 3", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 20, precio: 429.999},
    { nombre: "Winflo 11", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 17, precio: 179.999},
    { nombre: "Adizero Adios Pro 3", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 18, precio: 202.999},
    { nombre: "Adizero Boston 12 Negro", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 16, precio: 239.999},
    { nombre: "Ultraboost 5X Negro", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 17, precio: 249.999},
    { nombre: "Adistar 2.0 Verde", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 17, precio: 199.999},
    { nombre: "Supernova Stride Negro", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 15, precio: 139.999 },
    { nombre: "Adizero Takumi Sen 10 Beige", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 17, precio: 269.999},
    { nombre: "Supernova Rise", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 19, precio: 169.999},
    { nombre: "FuelCell SuperComp Elite V4", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 15, precio: 399.999},
    { nombre: "FuelCell SuperComp Trainer V3", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 16, precio: 399.999},
    { nombre: "Fresh Foam Roav", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 19, precio: 140.999},
    { nombre: "Fresh Foam Arishi", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 18, precio: 4104.299},
    { nombre: "FuelCell Propel V3", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 18, precio: 113.999},
    { nombre: "Fresh Foam X More Trail V3", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 18, precio: 279.999},
    { nombre: "FuelCell Rebel V4", talles: [36, 37, 38, 39, 40, 41, 42, 43, 44], cantidad: 17, precio: 259.999}
];

console.log(productos);

// Variables globales
let cartItems = [];  // Array para almacenar los productos en el carrito
let cartCount = 0;  // Número de productos en el carrito
let isCheckoutReady = false;  // Estado que indica si la compra está lista

// Cargar carrito desde LocalStorage
const loadCartFromLocalStorage = async () => {
    try {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            cartItems = JSON.parse(storedCart);
            console.log("Carrito cargado desde LocalStorage:", cartItems);
        } else {
            console.log("No hay productos en el LocalStorage.");
        }
        await updateCartCount();
        await updateCartUI();
        await checkIfCartIsEmpty();
    } catch (error) {
        console.error("Error al cargar el carrito desde LocalStorage:", error);
    }
};

// Verificar si el carrito está vacío y mostrar u ocultar la sección de pago
const checkIfCartIsEmpty = async () => {
    try {
        const paymentSection = document.getElementById("paymentSection");
        if (cartItems.length === 0) {
            paymentSection?.classList.add("hidden");
            isCheckoutReady = false;
            console.log("El carrito está vacío. No se puede proceder con la compra.");
        } else {
            paymentSection?.classList.remove("hidden");
            isCheckoutReady = true;
            console.log("El carrito tiene productos. Compra habilitada.");
        }
    } catch (error) {
        console.error("Error al verificar el estado del carrito:", error);
    }
};

// Guardar carrito en LocalStorage
const saveCartToLocalStorage = async () => {
    try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log("Carrito guardado en LocalStorage:", cartItems);
    } catch (error) {
        console.error("Error al guardar el carrito en LocalStorage:", error);
    }
};

// Mostrar/Ocultar carrito
const toggleCartMenu = () => {
    const cartContainer = document.getElementById("cartContainer");
    cartContainer.style.display = (cartContainer.style.display === "block") ? "none" : "block";
};

// Cerrar carrito si se hace clic fuera de él
document.addEventListener("click", (event) => {
    const cartContainer = document.getElementById("cartContainer");
    const cartButton = document.querySelector(".carrito");

    if (
        cartContainer.style.display === "block" &&
        !cartContainer.contains(event.target) &&
        !cartButton.contains(event.target)
    ) {
        cartContainer.style.display = "none";
    }
});

// Agregar producto al carrito
const addToCart = async (product) => {
    try {
        const existingProductIndex = cartItems.findIndex(
            (item) => item.nombre === product.nombre && item.talle === product.talle
        );

        if (existingProductIndex !== -1) {
            cartItems[existingProductIndex].cantidad += product.cantidad;
            console.log("Cantidad actualizada para el producto:", cartItems[existingProductIndex]);
        } else {
            cartItems.push(product);
            console.log("Producto añadido al carrito:", product);
        }

        await updateCartCount();
        await updateCartUI();
        await saveCartToLocalStorage();
        await checkIfCartIsEmpty();
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
    }
};

// Actualizar la cantidad total de productos
const updateCartCount = () => {
    cartCount = cartItems.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById("cartCount").textContent = cartCount;
};

// Actualizar la interfaz del carrito
const updateCartUI = () => {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";  // Limpiar la lista del carrito

    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("item-details");
        detailsDiv.innerHTML = `
            <strong>${item.nombre}</strong><br>
            Talle: ${item.talle}<br>
            Cantidad: ${item.cantidad}<br>
            Precio: $${(parseFloat(item.precio) * item.cantidad).toFixed(2)}
        `;

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("item-actions");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Eliminar";
        removeButton.addEventListener("click", () => removeFromCart(index));

        actionsDiv.appendChild(removeButton);
        li.appendChild(detailsDiv);
        li.appendChild(actionsDiv);
        cartList.appendChild(li);
    });
};

// Eliminar producto del carrito
const removeFromCart = (index) => {
    cartItems[index].cantidad--;
    if (cartItems[index].cantidad === 0) {
        cartItems.splice(index, 1);
    }

    updateCartCount();
    updateCartUI();
    saveCartToLocalStorage();
    checkIfCartIsEmpty();  // Verificar si el carrito tiene productos después de eliminar uno
};

// Vaciar carrito
const clearCart = () => {
    cartItems = [];
    cartCount = 0;
    updateCartUI();
    saveCartToLocalStorage();
    checkIfCartIsEmpty();  // Verificar si el carrito tiene productos después de vaciarlo
};

// Lógica para manejar la selección de talle y agregar al carrito
document.addEventListener("DOMContentLoaded", () => {
    let selectedSize = null;
    const productName = document.querySelector(".p1").textContent;
    const productPrice = document.querySelector(".original-price").textContent.replace(/[^\d.-]/g, '');  // Eliminar símbolos no numéricos

    // Selección de talles
    const sizeButtons = document.querySelectorAll(".talles button");

    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Marcar el talle seleccionado
            sizeButtons.forEach(btn => btn.classList.remove("seleccionado"));
            button.classList.add("seleccionado");
            selectedSize = button.textContent;  // Guardamos el talle seleccionado
        });
    });

    // Botón de agregar al carrito
    const addToCartButton = document.querySelector(".btnComprar2");

    addToCartButton.addEventListener("click", () => {
        // Verificar si se seleccionó un talle
        if (!selectedSize) {
            alert("Por favor, selecciona un talle antes de agregar al carrito.");
            return;
        }

        // Agregar al carrito
        const product = {
            nombre: productName,
            precio: parseFloat(productPrice),  // Convertir el precio a número
            talle: selectedSize,
            cantidad: 1
        };

        addToCart(product);  // Llamamos a la función que ya tienes para agregar al carrito
    });
});

// Seleccionar elementos del DOM
const paymentMethodSelect = document.getElementById("paymentMethod");
const installmentsSection = document.getElementById("installments");
const installmentsSelect = document.getElementById("installments");

// Lógica para mostrar u ocultar cuotas dependiendo del método de pago
paymentMethodSelect.addEventListener("change", () => {
    const selectedMethod = paymentMethodSelect.value;

    if (selectedMethod === "Tarjeta") {
        installmentsSection.disabled = false;  // Habilitar el select de cuotas
        installmentsSection.classList.remove("hidden");  // Asegurarse de que está visible
    } else {
        installmentsSection.disabled = true;  // Deshabilitar el select de cuotas
        installmentsSection.classList.add("hidden");  // Ocultar el select de cuotas
        installmentsSelect.value = "";  // Resetear el valor del select de cuotas
    }
});

// Función para calcular el precio por cuota
const calculateInstallments = (totalPrice, numInstallments) => {
    return (totalPrice / numInstallments).toFixed(2);
};

// Función para finalizar la compra con SweetAlert
const checkout = async () => {
    try {
        // Verificar si el carrito tiene productos
        if (!isCheckoutReady) {
            console.warn("Intento de finalizar compra con carrito vacío.");
            alert("Por favor, agrega productos al carrito antes de proceder.");
            return;
        }

        // Obtener el método de pago seleccionado
        const paymentMethod = document.getElementById("paymentMethod")?.value || "No seleccionado";
        const installmentsSelect = document.getElementById("installments");
        const installments = parseInt(installmentsSelect?.value, 10) || 1;  // Cuotas seleccionadas (por defecto 1)

        // Verificar si el método de pago fue seleccionado
        if (paymentMethod === "No seleccionado") {
            console.warn("Método de pago no seleccionado.");
            alert("Por favor, selecciona un método de pago antes de finalizar la compra.");
            return;
        }

        // Calcular el precio total del carrito
        const totalPrice = cartItems.reduce((total, item) => total + item.cantidad * parseFloat(item.precio), 0);
        console.log("Precio total calculado:", totalPrice);

        // Generar el mensaje inicial
        let message = `Gracias por su compra!<br><strong>Producto:</strong> ${cartItems[0].nombre}<br><strong>Precio final:</strong> $${totalPrice.toFixed(2)}`;

        // Si el método de pago es "Tarjeta", mostrar información de cuotas
        if (paymentMethod === "Tarjeta") {
            if (installments === 1) {
                message += `<br><strong>Precio total:</strong> $${totalPrice.toFixed(2)} (sin cuotas)`;
            } else {
                // Calcular las cuotas para 3, 6 y 12
                const installment3 = (totalPrice / 3).toFixed(2);
                const installment6 = (totalPrice / 6).toFixed(2);
                const installment12 = (totalPrice / 12).toFixed(2);

                message += `<br><strong>Precio por cuota:</strong> $${(totalPrice / installments).toFixed(2)} por ${installments} cuotas.<br>
                    <strong>Opciones de cuotas:</strong><br>
                    3 cuotas: $${installment3}<br>
                    6 cuotas: $${installment6}<br>
                    12 cuotas: $${installment12}`;
            }
        }

        // Mostrar el SweetAlert con la información de la compra
        await Swal.fire({
            title: 'Compra finalizada!',
            html: message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Vaciamos el carrito después de la compra
        console.log("Compra finalizada. Vaciando carrito.");
        await clearCart();
        isCheckoutReady = false;
    } catch (error) {
        console.error("Error durante la compra:", error);
    }
};


// Cargar carrito al cargar la página
loadCartFromLocalStorage();

// Botón de finalizar compra
const checkoutButton = document.getElementById("checkoutButton");
if (checkoutButton) {
    checkoutButton.addEventListener("click", checkout);
}

