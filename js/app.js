const precioProducto = [
    
]


const menuButton = document.querySelector('.material-symbols-outlined');
const menuBox = document.querySelector('.menuBox');
// Agregar un evento de clic al botón del menú
menuButton.addEventListener('click', function () {
    // Alternar la visibilidad del menú al hacer clic
    menuBox.classList.toggle('show');
});

