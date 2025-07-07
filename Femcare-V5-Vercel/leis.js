// Seleção dos elementos
const yearPoints = document.querySelectorAll('.year-point');
const popup = document.getElementById('popup');
const popupYear = document.getElementById('popup-year');
const popupInfo = document.getElementById('popup-info');
const closePopup = document.getElementById('close-popup');

// Adiciona o evento de clique para cada ponto
yearPoints.forEach(point => {
    point.addEventListener('click', () => {
        const year = point.getAttribute('data-year');
        const info = point.getAttribute('data-info');
        
        // Atualiza o conteúdo do pop-up
        popupYear.textContent = year;
        popupInfo.textContent = info;

        // Exibe o pop-up removendo a classe 'hidden'
        popup.classList.remove('hidden');
    });
});

// Fecha o pop-up ao clicar no botão de fechar (X)
closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
});

// Fecha o pop-up ao clicar fora dele
popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.classList.add('hidden');
    }
});
