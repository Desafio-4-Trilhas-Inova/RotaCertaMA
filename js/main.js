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

function filtrarLinhas(buscaLinha, buscaRegiao, buscaTerminal) {
  return linhasOnibus.filter((linha) => {
    const matchLinha =
      linha.codigo.toLowerCase().includes(buscaLinha.toLowerCase()) ||
      linha.descricao.toLowerCase().includes(buscaLinha.toLowerCase());

    const matchRegiao =
      !buscaRegiao || linha.regiao.toLowerCase().includes(buscaRegiao.toLowerCase());

    const matchTerminal =
      !buscaTerminal ||
      linha.terminais.some((t) =>
        t.toLowerCase().includes(buscaTerminal.toLowerCase())
      );

    return matchLinha && matchRegiao && matchTerminal;
  });
}

function renderizarLinhas(lista) {
  const container = document.getElementById("lista-linhas");
  if (!container) return;

  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = "<p style='color: white;'>Nenhuma linha encontrada.</p>";
    return;
  }

  lista.forEach((linha) => {
    const div = document.createElement("div");
    div.classList.add("linha-box");

    div.innerHTML = `
      <p class="linha-codigo">${linha.codigo}</p>
      <p class="linha-desc">${linha.descricao}</p>
    `;

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Já existe esse evento, então vamos *complementar* com filtros
  const campoLinha = document.getElementById("filtro-linha");
  const campoRegiao = document.getElementById("filtro-regiao");
  const campoTerminal = document.getElementById("filtro-terminal");

  if (campoLinha && campoRegiao && campoTerminal) {
    function atualizarFiltro() {
      const buscaLinha = campoLinha.value;
      const buscaRegiao = campoRegiao.value;
      const buscaTerminal = campoTerminal.value;

      const resultados = filtrarLinhas(buscaLinha, buscaRegiao, buscaTerminal);
      renderizarLinhas(resultados);
    }

    campoLinha.addEventListener("input", atualizarFiltro);
    campoRegiao.addEventListener("input", atualizarFiltro);
    campoTerminal.addEventListener("input", atualizarFiltro);

    renderizarLinhas(linhasOnibus); // Inicializa com todos os dados
  }
});

