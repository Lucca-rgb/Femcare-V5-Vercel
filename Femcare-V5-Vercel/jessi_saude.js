// Função para mostrar dicas especiais ao clicar nos ícones
function showTip(tip) {
    let tipText = '';
    switch (tip) {
        case 'clothes':
            tipText = "Dica: Escolha roupas íntimas que ofereçam conforto e elasticidade. Tecidos suaves são sempre uma boa opção.";
            break;
        case 'skincare':
            tipText = "Dica: Para cuidar da pele, lembre-se de limpar, tonificar e hidratar diariamente. Use protetor solar sempre!";
            break;
        case 'wellness':
            tipText = "Dica: Pratique atividades físicas regularmente e mantenha uma alimentação equilibrada para uma vida saudável.";
            break;
        case 'hygiene':
            tipText = "Dica: A higiene é fundamental. Tome banhos regulares e utilize produtos adequados para sua pele.";
            break;
        default:
            tipText = "Dica não encontrada.";
            break;
    }
    
    // Atualiza o texto do modal e mostra
    document.getElementById('tipText').textContent = tipText;
    document.getElementById('tipModal').style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('tipModal').style.display = 'none';
}

function confirmAgendamento() {
    // Redireciona para a tela de agendamento
    window.location.href = 'tela-agendamento.html';
}

// Adicionando eventos de clique aos ícones
document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.icon-container i');
    
    // Adiciona eventos de clique aos ícones da barra lateral
    icons[0].addEventListener('click', () => showTip('clothes')); // Ícone de roupas íntimas
    icons[1].addEventListener('click', () => showTip('skincare')); // Ícone de cuidado da pele
    icons[2].addEventListener('click', () => showTip('wellness')); // Ícone de bem-estar
    icons[3].addEventListener('click', () => showTip('hygiene')); // Ícone de higiene
});
