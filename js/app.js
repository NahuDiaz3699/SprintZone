function scrollRuleta(direction) {
    const ruleta = document.getElementById('ruletaScroll');
    const scrollAmount = 300; // Ajusta según el ancho de las imágenes

    if (direction === 1) {
        // Desplazarse a la derecha
        ruleta.scrollLeft += scrollAmount;
    } else if (direction === -1) {
        // Desplazarse a la izquierda
        ruleta.scrollLeft -= scrollAmount;
    }

    // Evitar que el scroll se desborde hacia la derecha o izquierda
    const maxScrollLeft = ruleta.scrollWidth - ruleta.clientWidth;
    if (ruleta.scrollLeft < 0) {
        ruleta.scrollLeft = 0;
    } else if (ruleta.scrollLeft > maxScrollLeft) {
        ruleta.scrollLeft = maxScrollLeft;
    }
}

