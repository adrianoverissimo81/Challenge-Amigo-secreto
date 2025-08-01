// Seleções de elementos DOM
const amigoInput = document.getElementById('amigo');
const adicionarBtn = document.getElementById('adicionarBtn');
const listaDeAmigos = document.getElementById('listaDeAmigos');
const sortearBtn = document.getElementById('sortearBtn');
const resultadoLista = document.getElementById('resultado');

// Botões de ação adicionais
const corrigirBtn = document.getElementById('corrigirBtn');
const excluirBtn = document.getElementById('excluirBtn');
const novoJogoBtn = document.getElementById('novoJogoBtn');

let amigos = [];
let nomeSendoEditado = null;

// Função para controlar o estado dos botões Corrigir e Excluir
function atualizarEstadoBotoesAcao(habilitar) {
    corrigirBtn.disabled = !habilitar;
    excluirBtn.disabled = !habilitar;
}

// Chamada inicial para desabilitar os botões de ação ao carregar a página
atualizarEstadoBotoesAcao(false);

// Função para adicionar um nome à lista
function adicionarNome() {
    const nome = amigoInput.value.trim();

    if (nome !== '') {
        if (amigos.includes(nome)) {
            alert('Este nome já foi adicionado!');
            amigoInput.value = '';
            amigoInput.focus();
            return;
        }

        amigos.push(nome);
        atualizarListaHTML();
        
        amigoInput.value = '';
        amigoInput.focus();
        
        atualizarEstadoBotoesAcao(false); 
        nomeSendoEditado = null;
        
        sortearBtn.disabled = false;
        
        resultadoLista.innerHTML = ''; 

    } else {
        alert('Por favor, digite um nome antes de adicionar!');
    }
}

// Função para redesenhar a lista HTML com base no array 'amigos'
function atualizarListaHTML() {
    listaDeAmigos.innerHTML = '';

    amigos.forEach(nome => {
        const novoItemLista = document.createElement('li');
        novoItemLista.textContent = nome;
        novoItemLista.addEventListener('click', () => selecionarNomeParaEdicao(nome));
        listaDeAmigos.appendChild(novoItemLista);
    });
}

// Função para selecionar um nome da lista para edição/exclusão
function selecionarNomeParaEdicao(nome) {
    amigoInput.value = nome;
    nomeSendoEditado = nome;
    atualizarEstadoBotoesAcao(true);
    amigoInput.focus();
}

function corrigirNome() {
    const novoNome = amigoInput.value.trim();

    if (!nomeSendoEditado || novoNome === '') {
        alert('Selecione um nome na lista e digite a correção no campo.');
        return;
    }

    if (amigos.includes(novoNome) && novoNome !== nomeSendoEditado) {
        alert('O novo nome já existe na lista de amigos!');
        return;
    }

    const indice = amigos.indexOf(nomeSendoEditado);
    if (indice !== -1) {
        amigos[indice] = novoNome;
        atualizarListaHTML();
        amigoInput.value = '';
        amigoInput.focus();

        atualizarEstadoBotoesAcao(false);
        nomeSendoEditado = null;
        resultadoLista.innerHTML = '';
    } else {
        alert('Erro: O nome original não foi encontrado na lista.');
    }
}

// Função para excluir um nome
function excluirNome() {
    if (!nomeSendoEditado) {
        alert('Selecione um nome na lista para excluir.');
        return;
    }

    if (confirm(`Tem certeza que deseja excluir "${nomeSendoEditado}" da lista?`)) {
        const indice = amigos.indexOf(nomeSendoEditado);
        if (indice !== -1) {
            amigos.splice(indice, 1);
            atualizarListaHTML();
            amigoInput.value = '';
            amigoInput.focus();

            atualizarEstadoBotoesAcao(false);
            nomeSendoEditado = null;
            resultadoLista.innerHTML = '';

            if (amigos.length === 0) {
                sortearBtn.disabled = true;
            }
        } else {
            alert('Erro: O nome original não foi encontrado na lista para exclusão.');
        }
    }
}

// FUNÇÃO sortearAmigo - Lógica para sortear APENAS UM nome da lista
function sortearAmigo() {
    if (amigos.length < 3) { // Mínimo de 3 amigos para sortear um nome, senão pode dar loop
        alert('É necessário ter pelo menos 3 amigos para fazer o sorteio!');
        return;
    }

    resultadoLista.innerHTML = ''; // Limpa resultados anteriores

    const indiceSorteado = Math.floor(Math.random() * amigos.length); // Sorteia um índice aleatório
    const amigoSorteado = amigos[indiceSorteado]; // Pega o amigo correspondente ao índice

    const itemResultado = document.createElement('li');
    itemResultado.textContent = `O amigo sorteado é: ${amigoSorteado}`;
    resultadoLista.appendChild(itemResultado);
  
    amigoInput.disabled = true;
    adicionarBtn.disabled = true;
    
    novoJogoBtn.disabled = false;
    sortearBtn.disabled = true;
    
    atualizarEstadoBotoesAcao(false);
    nomeSendoEditado = null;
}

// Função para iniciar um Novo Jogo
function novoJogo() {
    amigos = [];
    atualizarListaHTML();
    resultadoLista.innerHTML = '';
    amigoInput.value = '';
    
  
    amigoInput.disabled = false;
    adicionarBtn.disabled = false;

    atualizarEstadoBotoesAcao(false);
    novoJogoBtn.disabled = true;
    sortearBtn.disabled = false;
    nomeSendoEditado = null;
    amigoInput.focus();
}


// Event Listener para o clique no botão 'Adicionar'
if (adicionarBtn) {
    adicionarBtn.addEventListener('click', adicionarNome);
} else {
    console.error("Erro: Elemento com ID 'adicionarBtn' (botão Adicionar) não encontrado.");
}

// Event Listener para a tecla "Enter" no campo de input
if (amigoInput) {
    amigoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            adicionarNome();
        }
    });
} else {
    console.error("Erro: Elemento com ID 'amigo' não encontrado.");
}

// Event Listener para o clique no botão 'Sortear amigo'
if (sortearBtn) {
    sortearBtn.addEventListener('click', sortearAmigo);
} else {
    console.error("Erro: Elemento com ID 'sortearBtn' (botão Sortear) não encontrado.");
}

// Event Listeners para Corrigir e Excluir
if (corrigirBtn) {
    corrigirBtn.addEventListener('click', corrigirNome);
} else {
    console.error("Erro: Elemento com ID 'corrigirBtn' (botão Corrigir) não encontrado.");
}

if (excluirBtn) {
    excluirBtn.addEventListener('click', excluirNome);
} else {
    console.error("Erro: Elemento com ID 'excluirBtn' (botão Excluir) não encontrado.");
}

// Event Listener para o botão Novo Jogo
if (novoJogoBtn) {
    novoJogoBtn.addEventListener('click', novoJogo);
} else {
    console.error("Erro: Elemento com ID 'novoJogoBtn' (botão Novo Jogo) não encontrado.");
}