document.getElementById('animate-btn').addEventListener('click', function () {
    // Crear el modal dinámicamente
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.classList.add('hidden');
    modal.innerHTML = `
        <img src="foto2.jpg" alt="Foto en grande" id="large-image">
    `;
    document.body.appendChild(modal);

    // Mostrar el modal
    modal.classList.remove('hidden');

    // Cerrar el modal al hacer clic
    modal.addEventListener('click', function () {
        modal.remove();
    });
});

document.querySelector('.center-image').addEventListener('click', function () {
    const image = this;
    image.classList.add('shake-animation');
    setTimeout(() => image.classList.remove('shake-animation'), 500);
});
