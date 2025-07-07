// Função para alternar a visibilidade do chat
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatBody = document.getElementById('chat-body');

    // Alterna a classe 'expanded' no container do chat
    chatContainer.classList.toggle('expanded');

    // Alterna a visibilidade do chat body
    if (chatContainer.classList.contains('expanded')) {
        chatBody.classList.remove('hidden');
    } else {
        chatBody.classList.add('hidden');
    }
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
        "ansiedade": ["ansiedade", "estresse", "depressão", "saúde mental", "angústia", "ansied", "ansiedade", "ansiedada", "ansuedade", "ansiedadw"],
        "funcionou": ["funcionou", "deu certo", "tá certo", "foi bem", "funcionou", "funcinou", "funcion", "funciona", "funcona", "funcionalismo", "foi bem", "foi legal", "funcioma", "fnciona"],
        "hormonais": ["hormônio", "hormonoterapia", "hormonal", "hormônios", "endocrinologia", "terapia hormonal", "equilíbrio hormonal", "alterações", "hormona"]
    };

    let words = input.split(" ");
    return words.map(word => {
        for (const key in synonyms) {
            if (synonyms[key].includes(word)) {
                return key;  // Substitui palavras por seu equivalente normalizado
            }
        }
        return word; // Se não houver sinônimo, retorna a palavra original
    }).join(" ");
}

// Função para enviar a mensagem
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const issue = chatInput.value.trim().toLowerCase();
    const normalizedIssue = normalizeInput(issue); // Normaliza o input
    const chatResponse = document.getElementById('chat-response');

    if (!normalizedIssue) return;

    // Criação da mensagem do usuário
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user');
    userMessage.textContent = issue;
    chatResponse.appendChild(userMessage);
    chatInput.value = '';

    // Definir a resposta do bot com base na entrada do usuário
    let responseText = getResponseText(normalizedIssue);

    // Criação da mensagem do bot
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot');
    botMessage.textContent = responseText;
    chatResponse.appendChild(botMessage);
}

// Função para obter a resposta do bot com base na entrada normalizada
function getResponseText(normalizedIssue) {
    if (normalizedIssue.includes('cadastrar') || normalizedIssue.includes('registrar')) {
        return 'Para problemas de cadastro, por favor, verifique se você está utilizando o e-mail correto e se o formulário está preenchido corretamente. Se o problema persistir, entre em contato com o suporte técnico.';
    } else if (normalizedIssue.includes('preencher') || normalizedIssue.includes('feito') || normalizedIssue.includes('pronto')) {
        return 'Se o formulário já estiver preenchido e o email estiver correto, mas você não conseguir prosseguir, verifique se recebeu algum código pelo seu email. Caso não tenha recebido, talvez sua caixa de entrada esteja cheia.';
    } else if (normalizedIssue.includes('cheio') || normalizedIssue.includes('email') || normalizedIssue.includes('lotado') || normalizedIssue.includes('ocupado') || normalizedIssue.includes('sobrecarregado')) {
        return 'Se ela estiver cheia, você pode limpa-la apagando alguns emails antigos ou irrelevantes. Assim, logo você terá acesso ao código. Caso o problema permaneça, entre em contato com o suporte.';
    } else if (normalizedIssue.includes('problemas') || normalizedIssue.includes('senha') || normalizedIssue.includes('dificuldades') || normalizedIssue.includes('acesso')) {
        return 'Se você está tendo problemas com a senha, utilize a opção "Esqueci minha senha" na página de login para redefini-la. Se precisar de mais ajuda, entre em contato com o suporte.';
    } else if (normalizedIssue.includes('agendar') || normalizedIssue.includes('marcar')) {
        return 'Para problemas com agendamento, verifique se você está selecionando a data e hora corretas. Caso o problema continue, entre em contato com o suporte para assistência.';
    } else if (normalizedIssue.includes('data') || normalizedIssue.includes('horário') || normalizedIssue.includes('informação')) {
        return 'Se as informações estão certas, mas você não conseguir prosseguir, verifique as especialidades médicas disponíveis, assim como as datas, horários e locais.';
    } else if (normalizedIssue.includes('tentei') || normalizedIssue.includes('nao funcionou') || normalizedIssue.includes('não deu certo') || normalizedIssue.includes('não consegui')) {
        return 'Talvez a especialidade que selecionou não esteja disponível no momento. Tente novamente com uma data diferente ou com um novo horário. Caso não consiga, entre em contato com o suporte. Estamos aqui para ajudar!';
    } else if (normalizedIssue.includes('menstruação') || normalizedIssue.includes('colicas') || normalizedIssue.includes('cólica')) {
        return 'A menstruação pode causar cólicas e desconforto. Tente aplicar uma bolsa de água quente na barriga e faça exercícios leves para amenizar os sintomas, não sou humana, mas cólicas são horríveis 😖, melhoras rainha! 👑';
    } else if (normalizedIssue.includes('gravidez') || normalizedIssue.includes('meses') || normalizedIssue.includes('nausea') || normalizedIssue.includes('enjoo')) {
        return 'Durante a gravidez, é normal sentir enjoo. Comer pequenas porções de alimentos secos, como biscoitos, pode ajudar a aliviar esses sintomas. Fique tranquila, tenho certeza que seu bebê vai ser lindo 😇.';
    } else if (normalizedIssue.includes('dor') || normalizedIssue.includes('forte') || normalizedIssue.includes('desconforto')) {
        return 'Sintomas como dor e cansaço são comuns. Descanse bastante e considere consultar um médico se os sintomas persistirem ou forem severos.';
    } else if (normalizedIssue.includes('ansiedade') || normalizedIssue.includes('estresse') || normalizedIssue.includes('depressão') || normalizedIssue.includes('saúde mental')) {
        return 'É normal sentir ansiedade ou estresse. Tente práticas de relaxamento como meditação ou yoga, e se os sentimentos persistirem, considere buscar apoio profissional. Você não está sozinha! 💕';
    } else if (normalizedIssue.includes('hormonio') || normalizedIssue.includes('hormonoterapia') || normalizedIssue.includes('hormona') || normalizedIssue.includes('endorcinologia')) {
        return 'Questões hormonais podem causar várias mudanças no corpo e na mente. É importante monitorar os efeitos e consultar um endocrinologista para ajustes na terapia. Se tiver dúvidas, não hesite em perguntar!';
    } else if (normalizedIssue.includes('obrigada') || normalizedIssue.includes('tchau') || normalizedIssue.includes('valeu') || normalizedIssue.includes('até logo') || normalizedIssue.includes('grata')) {
        return 'Obrigada você por conversar comigo! Lembre-se de cuidar de si mesma e, se precisar, não hesite em buscar ajuda médica. Estarei aqui se você precisar de mais alguma coisa. Até logo! 😘';
    } else if (normalizedIssue.includes('funcionou') || normalizedIssue.includes('deu certo')) {
        return 'Que bom que deu certo! Se precisar de mais alguma coisa, pode me chamar! 😉';
    } else {
        return 'Desculpe, não entendi. Pergunte sobre problemas de cadastro, problemas com senha, problemas de agendamento, menstruação, gravidez, saúde mental ou sintomas e eu vou tentar ajudar! 🤗';
    }
}
