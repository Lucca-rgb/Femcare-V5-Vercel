// Adiciona um listener para o evento de submit no formulário de agendamento
document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário

    // Captura os valores dos campos do formulário
    const estado = document.getElementById('estado').value;
    const ubs = document.getElementById('ubs').value;
    const especialidade = document.getElementById('especialidade').value;
    const month = document.getElementById('month').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!estado || !ubs || !especialidade || !month || !date || !time) {
        alert('Por favor, preencha todos os campos antes de realizar o agendamento.');
        return;
    }

    // Cria um objeto de agendamento com os valores coletados
    const appointment = { estado, ubs, especialidade, month, date, time };

    // Recupera os agendamentos do localStorage ou inicializa um novo array se não houver
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    // Adiciona o novo agendamento ao array
    appointments.push(appointment);
    
    // Armazena o array atualizado no localStorage
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Exibe um alerta de confirmação com os detalhes do agendamento
    alert(`Agendamento realizado com sucesso!\nUBS: ${ubs}\nEspecialidade: ${especialidade}\nData: ${date} ${month}\nHora: ${time}`);
    
    // Redireciona para a tela de agendamento
    window.location.href = 'tela-agendamento.html';
});

// Dados das UBSs organizados por estado
const ubsData = {
    SP: [
        { value: "ubs1", name: "UBS Vila Mariana - São Paulo" },
        { value: "ubs2", name: "UBS São Mateus - São Paulo" },
        { value: "ubs3", name: "UBS Itaquera - São Paulo" },
        { value: "ubs4", name: "UBS Mooca - São Paulo" }
    ],
    RJ: [
        { value: "ubs5", name: "UBS Centro - Rio de Janeiro" },
        { value: "ubs6", name: "UBS Jardim Botânico - Rio de Janeiro" }
    ],
    DF: [
        { value: "ubs7", name: "UBS Setor Norte - Brasília" },
        { value: "ubs8", name: "UBS Asa Sul - Brasília" }
    ],
    MG: [
        { value: "ubs9", name: "UBS Centro - Belo Horizonte" },
        { value: "ubs10", name: "UBS Pampulha - Belo Horizonte" }
    ],
    PE: [
        { value: "ubs11", name: "UBS Boa Viagem - Recife" },
        { value: "ubs12", name: "UBS Olinda - Pernambuco" }
    ],
    PR: [
        { value: "ubs13", name: "UBS Centro - Curitiba" },
        { value: "ubs14", name: "UBS Santa Felicidade - Curitiba" }
    ],
    RS: [
        { value: "ubs15", name: "UBS Centro - Porto Alegre" },
        { value: "ubs16", name: "UBS Cidade Baixa - Porto Alegre" }
    ]
};

// Função para filtrar as UBSs com base no estado selecionado
function filterUBS() {
    const estado = document.getElementById('estado').value;
    const ubsSelect = document.getElementById('ubs');

    // Limpa as opções existentes
    ubsSelect.innerHTML = '<option value="" disabled selected>Selecione uma UBS</option>';

    // Se o estado tiver UBSs cadastradas, adiciona as opções ao select
    if (estado && ubsData[estado]) {
        ubsData[estado].forEach(ubs => {
            const option = document.createElement('option');
            option.value = ubs.value;
            option.textContent = ubs.name;
            ubsSelect.appendChild(option);
        });
    } else {
        // Caso não tenha UBS para o estado selecionado
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Nenhuma UBS disponível para este estado';
        ubsSelect.appendChild(option);
    }
}

// Função para definir o dia selecionado em um calendário
function setSelectedDay(day) {
    const days = document.querySelectorAll('.day');
    days.forEach(d => {
        d.classList.remove('selected-day'); // Remove a classe de todos os dias
    });
    day.classList.add('selected-day'); // Adiciona a classe ao dia selecionado
}

// Função para confirmar o agendamento
function confirmAgendamento() {
    const selectedDate = document.getElementById('datas-disponiveis').value;
    const selectedMonth = document.getElementById('mes').value;
    const selectedTime = document.getElementById('horarios').value;
    const selectedSpecialization = document.getElementById('especializacao').value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!selectedDate || !selectedTime || !selectedSpecialization) {
        alert("Por favor, selecione uma data, horário e especialidade.");
        return;
    }

    // Alerta com mês, dia, horário e especialidade
    alert(`Agendamento confirmado!\nEspecialidade: ${selectedSpecialization}\nData: ${selectedDate}/${selectedMonth}\nHora: ${selectedTime}`);

    // Armazena as informações no localStorage (opcional)
    localStorage.setItem('selectedDay', selectedDate);
    localStorage.setItem('selectedTime', selectedTime);
    localStorage.setItem('selectedMonth', selectedMonth);
    localStorage.setItem('selectedSpecialization', selectedSpecialization);

    // Redireciona para a tela de agendamento
    window.location.href = 'tela-agendamento.html';
}

// Função para alternar a exibição do chat
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatBody = document.getElementById('chat-body');

    // Alterna a classe 'expanded' no container do chat
    chatContainer.classList.toggle('expanded');

    // Alterna a visibilidade do chat body
    chatBody.classList.toggle('hidden');
}

// Função para normalizar a entrada do usuário
function normalizeInput(input) {
    const synonyms = {
        "cadastrar": ["cadastro", "castro", "cadastra", "cadrastra", "cadstro", "cadrastr", "cadastar", "cadstrar", "cadastr", "cadatro", "cadstro", "cadatro", "csdastro"],
        "preencher": ["preenchido", "preenche", "preencher", "prenchido", "preenchido", "preenchi", "preenchar", "preencahr", "preenchudo", "prenchido", "preencgido"],
        "problemas": ["problemas", "dificuldades", "dificuldade", "problem", "problemas", "proplemas", "probelmas", "probrwmas", "probkemas", "provlemas"],
        "senha": ["senha", "senhas", "chave", "senah", "senha", "sehna", "sena", "senh", "swnha", "senhs", "srnha"],
        "agendar": ["agendar", "marcar", "reservar", "agendamento", "agendamento", "agend", "agenadar", "agenar", "agendamenti", "agrndamento", "agwndamento"],
        "data": ["data", "datas", "horário", "informação", "data", "dat", "daata", "datra", "dsta", "dats", "dara"],
        "dores": ["dores", "dor", "desconforto", "intenso", "dor aguda", "dore", "doro", "dores", "dorres", "dorws", "dpres"],
        "gravidez": ["gravidez", "gestação", "nausea", "enjoo", "gravidez", "gravid", "gravidez", "gravez", "grsvidez", "gravudez", "gravidwz"],
        "menstruação": ["menstruação", "colicas", "cólica", "sintomas menstruais", "período", "menstruacao", "menstruação", "menstrsacao", "menstruacao", "mwnstruacao", "mrnstruacao"],
        "ansiedade": ["ansiedade", "estresse", "depressão", "saúde mental", "angústia", "desespero", "ansied"]
    };
}

// Política de Privacidade - Pop-up
function acceptPrivacy() {
    localStorage.setItem("privacyAccepted", "true");
    document.getElementById("privacy-popup").style.display = "none";
}

function declinePrivacy() {
    alert("Você precisa aceitar os termos para continuar utilizando o site.");
    window.close(); // Tenta fechar a aba
    window.location.href = "https://www.google.com"; // Redireciona caso não feche
}

window.onload = function () {
    if (localStorage.getItem("privacyAccepted") !== "true") {
        document.getElementById("privacy-popup").style.display = "flex";
    }
};
