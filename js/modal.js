// Función para abrir el modal
function openModal(productId) {
    // Genera el ID del modal dinámicamente basado en el número del producto
    const modal = document.getElementById('productModal' + productId);  

    // Verificación para ver si el modal existe
    if (modal) {
        modal.style.display = 'block';  // Muestra el modal
    } else {
        console.error('No se encontró el modal con ID:', 'productModal' + productId);
    }
}

// Función para cerrar el modal
function closeModal(productId) {
    const modal = document.getElementById('productModal' + productId);  // Obtiene el modal por su ID dinámico
    if (modal) {
        modal.style.display = 'none';  // Oculta el modal
    }
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');  // Selecciona todos los modales
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = 'none';  // Cierra el modal si se hace clic fuera de él
        }
    });
}

