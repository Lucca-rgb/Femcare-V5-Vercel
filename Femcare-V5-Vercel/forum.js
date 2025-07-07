document.addEventListener("DOMContentLoaded", () => {
    loadPosts();

// Botão para mostrar o formulário
document.getElementById("newTopic").addEventListener("click", showNewPostForm);
    
// Botão para enviar o formulário
document.getElementById("submit-post").addEventListener("click", createNewPost);
});

// Mostra o formulário
function showNewPostForm() {
document.getElementById("new-post-form").style.display = 'block';
}

// Oculta o formulário
function hideNewPostForm() {
document.getElementById("new-post-form").style.display = 'none';
// Limpa os campos
document.getElementById("post-title").value = '';
document.getElementById("post-author").value = '';
document.getElementById("post-content").value = '';
}

// Cria um novo post
function createNewPost() {
const title = document.getElementById("post-title").value;
const author = document.getElementById("post-author").value;
const content = document.getElementById("post-content").value;

if (!title || !author || !content) {
    alert("Por favor, preencha todos os campos!");
    return;
}

const newPost = {
    title,
    author,
    date: new Date().toLocaleString(),
    content,
    votes: 0,
    id: Date.now(),
    likedBy: {},
    replies: []
};

savePost(newPost);
loadPosts();
hideNewPostForm();
}

// Salva um novo post no armazenamento local.
function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Carrega e exibe os posts salvos no armazenamento local.
function loadPosts() {
    const container = document.getElementById("forum-container");
    container.innerHTML = "";
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach(post => {
        const postElement = document.createElement("article");
        postElement.classList.add("forum-post");
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>Autor: <strong>${post.author}</strong> | Data: ${post.date}</p>
            <p class="post-content">${post.content}</p>
            <button class="reply-btn" onclick="showReplyForm(${post.id})">Responder</button>
            
            <div class="reply-form" id="reply-form-${post.id}" style="display: none;">
                <textarea id="reply-content-${post.id}" placeholder="Digite sua resposta..."></textarea>
                <button onclick="addReply(${post.id})">Enviar Resposta</button>
            </div>
            
            <div class="replies-container" id="replies-${post.id}"></div>
            
            <div class="post-actions">
                <button class="vote-btn" onclick="vote(${post.id}, 1)">👍 ${post.votes}</button>
                <button class="delete-btn" onclick="deletePost(${post.id})">Excluir</button>
            </div>
        `;
        
        container.appendChild(postElement);
        
        // Carrega as respostas
        const repliesContainer = document.getElementById(`replies-${post.id}`);
        if (post.replies && post.replies.length > 0) {
            post.replies.forEach(reply => {
                const replyElement = document.createElement("div");
                replyElement.classList.add("reply");
                replyElement.innerHTML = `
                    <p class="reply-content">${reply.content}</p>
                    <p class="reply-author">${reply.author}</p>
                    <p class="reply-date">${reply.date}</p>
                `;
                repliesContainer.appendChild(replyElement);
            });
        }
    });
}

// Função para mostrar/ocultar o formulário de resposta
function showReplyForm(postId) {
    const form = document.getElementById(`reply-form-${postId}`);
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Função para adicionar uma resposta
function addReply(postId) {
    const replyContent = document.getElementById(`reply-content-${postId}`).value;
    if (!replyContent) return;

    const author = prompt("Seu nome:");
    if (!author) return;

    let posts = JSON.parse(localStorage.getItem("posts"));
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
        const newReply = {
            author,
            content: replyContent,
            date: new Date().toLocaleString(),
            id: Date.now()
        };
        
        posts[postIndex].replies.push(newReply);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
        
        // Limpar formulário
        document.getElementById(`reply-content-${postId}`).value = "";
        document.getElementById(`reply-form-${postId}`).style.display = "none";
    }
}

// Gerencia os votos em um post, garantindo que cada usuário possa votar apenas uma vez.
function vote(postId, value) {
    let posts = JSON.parse(localStorage.getItem("posts"));
    let userId = localStorage.getItem("userId") || Date.now().toString();
    localStorage.setItem("userId", userId);

    const post = posts.find(p => p.id === postId);
    if (post.likedBy[userId] === value) {
        delete post.likedBy[userId];
        post.votes -= value;
    } else {
        if (post.likedBy[userId]) {
            post.votes -= post.likedBy[userId];
        }
        post.likedBy[userId] = value;
        post.votes += value;
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Remove um post específico após confirmação do usuário.
function deletePost(postId) {
    if (confirm("Tem certeza que deseja excluir este tópico?")) {
        let posts = JSON.parse(localStorage.getItem("posts"));
        posts = posts.filter(p => p.id !== postId);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}