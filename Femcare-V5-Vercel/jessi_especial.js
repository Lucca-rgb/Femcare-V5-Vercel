function handleSubmit(event) {
    event.preventDefault(); // Evita o envio do formulário

    const description = document.getElementById('description').value;

    // Validação: Verifica se a descrição não está vazia
    if (!description) {
        alert("Por favor, descreva a situação antes de enviar.");
        return;
    }

    // Desabilitar o botão de envio enquanto o formulário é processado
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Enviando..."; // Alterar texto do botão

    // Aqui você pode adicionar lógica para enviar a denúncia para um servidor ou API
    console.log('Denúncia enviada:', description);

    // Simulando um envio com um timeout (substitua por sua lógica real)
    setTimeout(() => {
        // Exibir a mensagem de confirmação
        document.getElementById('confirmation').style.display = 'block';

        // Limpar o campo de descrição
        document.getElementById('description').value = '';

        // Reabilitar o botão de envio
        submitButton.disabled = false;
        submitButton.textContent = "Enviar Denúncia"; // Voltar texto do botão

        // Ocultar a mensagem de confirmação após 5 segundos
        setTimeout(() => {
            document.getElementById('confirmation').style.display = 'none';
        }, 5000); // A mensagem desaparece após 5 segundos
    }, 2000); // Simulação de 2 segundos para o envio
}
