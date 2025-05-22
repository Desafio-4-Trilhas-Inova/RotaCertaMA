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

document.addEventListener("DOMContentLoaded", () => {

  const filtroLinha = document.getElementById("filtro-linha");
  const filtroRegiao = document.getElementById("filtro-regiao");
  const filtroTerminal = document.getElementById("filtro-terminal");
  const resultadoDiv = document.getElementById("resultadoLinhas");


  async function buscarLinhas() {
    try {

      const params = new URLSearchParams();
      if (filtroLinha.value) params.append('codigo', filtroLinha.value);
      if (filtroRegiao.value) params.append('regiao', filtroRegiao.value);
      if (filtroTerminal.value) params.append('terminal', filtroTerminal.value);


      const response = await fetch(`/api/linhas?${params}`);
      const linhas = await response.json();

      resultadoDiv.innerHTML = linhas.map(linha => `
        <div class="linha-encontrada">
          <span class="linha-codigo">${linha.codigo}</span>
          <span class="linha-nome">${linha.nome}</span>
          <span class="linha-terminal">${linha.terminal || ''}</span>
        </div>
      `).join('');

    } catch (error) {
      console.error("Erro na busca:", error);
      resultadoDiv.innerHTML = `<div class="erro">Falha ao buscar linhas</div>`;
    }
  }

 
  function limparFiltros() {
    filtroLinha.value = '';
    filtroRegiao.value = '';
    filtroTerminal.value = '';
    buscarLinhas();
  }


  document.querySelector('.button[onclick="buscarLinhas()"]').onclick = buscarLinhas;
  document.querySelector('.button[onclick="limparFiltros()"]').onclick = limparFiltros;
  

  buscarLinhas();
});