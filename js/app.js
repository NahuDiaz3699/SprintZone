    // Selección de elementos
    const menuButton = document.querySelector('.menuBox span');
    const boxMenu = document.querySelector('.boxMenu');

    // Función para abrir/cerrar el menú
    menuButton.addEventListener('click', (event) => {
        boxMenu.style.display = boxMenu.style.display === 'block' ? 'none' : 'block';
      event.stopPropagation(); // Evita que el clic se propague al body
    });

    // Cierra el menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        if (!boxMenu.contains(event.target) && event.target !== menuButton) {
        boxMenu.style.display = 'none';
    }
    });