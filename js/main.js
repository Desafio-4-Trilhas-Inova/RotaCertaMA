document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    const botao = event.target.closest('[data-target]');
    if (botao) {
      const destino = botao.getAttribute('data-target');
      if (destino) {
        window.location.href = destino;
      }
    }
  });
});

function buscarLinhas() {
  const linha = document.getElementById('campoBusca').value.trim();
  const regiao = document.getElementById('campoRegiao').value.trim();
  const terminal = document.getElementById('campoTerminal').value.trim();

  // Monta a query string com os parâmetros preenchidos
  const params = new URLSearchParams();
  if (linha) params.append('linha', linha);
  if (regiao) params.append('regiao', regiao);
  if (terminal) params.append('terminal', terminal);

  fetch(`http://localhost:3000/api/linhas?${params.toString()}`)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao buscar dados');
      return response.json();
    })
    .then(data => {
      renderizarLinhas(data);
    })
    .catch(error => {
      console.error(error);
      document.getElementById('resultadoLinhas').innerHTML = '<p>Erro ao buscar linhas.</p>';
    });
}

// Renderiza os resultados dentro do <div id="resultadoLinhas">
function renderizarLinhas(linhas) {
  const container = document.getElementById('resultadoLinhas');
  container.innerHTML = ''; // Limpa resultados anteriores

  if (linhas.length === 0) {
    container.innerHTML = '<p>Nenhuma linha encontrada com esses filtros.</p>';
    return;
  }

  linhas.forEach(linha => {
    const box = document.createElement('div');
    box.classList.add('linha-box');

    const codigo = document.createElement('span');
    codigo.classList.add('linha-codigo');
    codigo.textContent = linha.codigo;

    const desc = document.createElement('span');
    desc.classList.add('linha-desc');
    desc.innerHTML = `<br>${linha.descricao}`;

    box.appendChild(codigo);
    box.appendChild(desc);
    container.appendChild(box);
  });
}

// Função para limpar os filtros
function limparFiltros() {
  document.getElementById('campoBusca').value = '';
  document.getElementById('campoRegiao').value = '';
  document.getElementById('campoTerminal').value = '';
  document.getElementById('resultadoLinhas').innerHTML = '';
}
