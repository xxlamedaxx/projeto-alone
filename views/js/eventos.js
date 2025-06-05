// Gerenciamento de Eventos

// Elementos do DOM
const eventosContainer = document.getElementById("eventos-container");
const btnNovoEvento = document.getElementById("btn-novo-evento");
const eventoForm = document.getElementById("evento-form");
const eventoModalBackdrop = document.getElementById("evento-modal-backdrop");
const eventoModalClose = document.getElementById("evento-modal-close");
const eventoCancelBtn = document.getElementById("evento-cancel-btn");
const eventoSaveBtn = document.getElementById("evento-save-btn");
const eventoModalTitle = document.getElementById("evento-modal-title");
const eventoIdInput = document.getElementById("evento-id");
const eventoTituloInput = document.getElementById("evento-titulo");
const eventoDescricaoInput = document.getElementById("evento-descricao");
const eventoImagemInput = document.getElementById("evento-imagem");
const eventoCriadorSelect = document.getElementById("evento-criador");
const eventosLoading = document.getElementById("eventos-loading");
const eventoDashboardSelect = document.getElementById(
  "evento-dashboard-select"
);
const dashboardContent = document.getElementById("dashboard-content");
const totalInscricoes = document.getElementById("total-inscricoes");
const mediaIdade = document.getElementById("media-idade");
const participantesTableBody = document.getElementById(
  "participantes-table-body"
);

// FUNÇÃO DE DEBUG - Verificar se todos os elementos DOM existem
function verificarElementosDOM() {
  const elementos = {
    "eventos-container": eventosContainer,
    "btn-novo-evento": btnNovoEvento,
    "evento-dashboard-select": eventoDashboardSelect,
    "dashboard-content": dashboardContent,
    "total-inscricoes": totalInscricoes,
    "media-idade": mediaIdade,
    "participantes-table-body": participantesTableBody,
  };

  console.log("=== 🔍 VERIFICAÇÃO DOS ELEMENTOS DOM ===");
  Object.entries(elementos).forEach(([nome, elemento]) => {
    console.log(
      `${elemento ? "✅" : "❌"} ${nome}:`,
      elemento || "NÃO ENCONTRADO"
    );
  });
  console.log("======================================");
}

// Inicialização
function initEventos() {
  // Verificar elementos DOM primeiro
  verificarElementosDOM();

  // Carregar lista de eventos
  carregarEventos();

  // Event listeners
  if (btnNovoEvento) {
    btnNovoEvento.addEventListener("click", abrirModalNovoEvento);
  }

  if (eventoModalClose) {
    eventoModalClose.addEventListener("click", () =>
      closeModal("evento-modal-backdrop")
    );
  }

  if (eventoCancelBtn) {
    eventoCancelBtn.addEventListener("click", () =>
      closeModal("evento-modal-backdrop")
    );
  }

  if (eventoSaveBtn) {
    eventoSaveBtn.addEventListener("click", salvarEvento);
  }

  // Event listeners para tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      showTab(tab, tab.dataset.tab);

      // Carregar dashboard se necessário
      if (tab.dataset.tab === "dashboard-eventos") {
        carregarEventosParaDashboard();
      }
    });
  });

  // Event listener para seleção de evento no dashboard
  if (eventoDashboardSelect) {
    eventoDashboardSelect.addEventListener("change", carregarDashboardEvento);
  }
}

// Carregar lista de eventos
async function carregarEventos() {
  try {
    showLoader("eventos-loading");
    const eventos = await EventosAPI.listarTodos();
    renderizarEventos(eventos);
  } catch (error) {
    showAlert(`Erro ao carregar eventos: ${error.message}`, "danger");
  } finally {
    hideLoader("eventos-loading");
  }
}

// Renderizar lista de eventos
function renderizarEventos(eventos) {
  if (!eventosContainer) {
    console.error("❌ Container de eventos não encontrado!");
    return;
  }

  eventosContainer.innerHTML = "";

  if (eventos.length === 0) {
    eventosContainer.innerHTML =
      '<p class="text-center">Nenhum evento encontrado</p>';
    return;
  }

  eventos.forEach((evento) => {
    const eventoCard = document.createElement("div");
    eventoCard.className = "card evento-card";
    eventoCard.innerHTML = `
      <div class="evento-img" style="background-image: url('${
        evento.imagem_url
      }')"></div>
      <div class="evento-info">
        <h3 class="evento-title">${evento.titulo}</h3>
        <p class="evento-desc">${truncateText(evento.descricao, 100)}</p>
      </div>
      <div class="evento-actions">
        <button class="btn btn-sm btn-info btn-dashboard" data-id="${
          evento.id
        }">
          <i class="fas fa-chart-bar"></i> Dashboard
        </button>
        <div>
          <button class="btn btn-sm btn-primary mr-1 btn-editar" data-id="${
            evento.id
          }">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger btn-excluir" data-id="${
            evento.id
          }">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;

    // Event listeners para botões de ação
    eventoCard
      .querySelector(".btn-editar")
      .addEventListener("click", () => abrirModalEditarEvento(evento.id));
    eventoCard
      .querySelector(".btn-excluir")
      .addEventListener("click", () => confirmarExclusaoEvento(evento.id));
    eventoCard.querySelector(".btn-dashboard").addEventListener("click", () => {
      // Mudar para a tab de dashboard
      showTab(
        document.querySelector('[data-tab="dashboard-eventos"]'),
        "dashboard-eventos"
      );
      // Selecionar o evento no select
      if (eventoDashboardSelect) {
        eventoDashboardSelect.value = evento.id;
        // Carregar dashboard
        carregarDashboardEvento();
      }
    });

    eventosContainer.appendChild(eventoCard);
  });
}

// Carregar eventos para o select do dashboard
async function carregarEventosParaDashboard() {
  try {
    const eventos = await EventosAPI.listarTodos();
    fillSelectOptions("evento-dashboard-select", eventos, "id", "titulo");
  } catch (error) {
    showAlert(
      `Erro ao carregar eventos para dashboard: ${error.message}`,
      "danger"
    );
  }
}

// FUNÇÃO PRINCIPAL CORRIGIDA - Carregar dashboard de um evento
async function carregarDashboardEvento() {
  if (!eventoDashboardSelect) {
    console.error("❌ Select do dashboard não encontrado!");
    return;
  }

  const eventoId = eventoDashboardSelect.value;
  console.log("🎯 Evento selecionado:", eventoId);

  if (!eventoId) {
    if (dashboardContent) {
      dashboardContent.classList.add("hidden");
    }
    return;
  }

  try {
    showLoader("eventos-loading");
    console.log("🔄 Iniciando carregamento do dashboard...");

    // Chamar a API do dashboard
    const dashboard = await EventosAPI.obterDashboard(eventoId);

    console.log("📊 Dashboard recebido na função:", dashboard);

    // Verificar se os dados existem
    if (!dashboard) {
      throw new Error("Nenhum dado recebido da API");
    }

    // EXTRAÇÃO INTELIGENTE DOS DADOS - Suporta múltiplas estruturas
    const totalInscritos = extrairValor(
      dashboard,
      [
        "totalInscricoes",
        "total_inscricoes",
        "inscricoes.length",
        "participantes.length",
      ],
      0
    );

    const mediaIdadeValue = extrairValor(
      dashboard,
      [
        "media_idade",
        "mediaIdade",
        "estatisticas.media_idade",
        "estatisticas.mediaIdade",
      ],
      0
    );

    const participantes = extrairValor(
      dashboard,
      [
        "inscricoes",
        "participantes",
        "dados.inscricoes",
        "dados.participantes",
        "usuario_nome",
        "usuario_nome_participante",
        "usuarios",
      ],
      []
    );

    console.log("📈 Dados extraídos:");
    console.log("- Total inscritos:", totalInscritos);
    console.log("- Média idade:", mediaIdadeValue);
    console.log("- Participantes:", participantes);

    // ATUALIZAR ELEMENTOS DOM COM VERIFICAÇÃO
    atualizarElementoDOM("total-inscricoes", totalInscritos, "textContent");
    atualizarElementoDOM(
      "media-idade",
      typeof mediaIdadeValue === "number"
        ? mediaIdadeValue.toFixed(1)
        : mediaIdadeValue,
      "textContent"
    );

    // RENDERIZAR TABELA DE PARTICIPANTES
    renderizarTabelaParticipantes(participantes);

    // MOSTRAR O DASHBOARD
    if (dashboardContent) {
      dashboardContent.classList.remove("hidden");
      console.log("✅ Dashboard exibido com sucesso!");
    }
  } catch (error) {
    console.error("❌ Erro completo no dashboard:", error);
    showAlert(`Erro ao carregar dashboard: ${error.message}`, "danger");

    if (dashboardContent) {
      dashboardContent.classList.add("hidden");
    }
  } finally {
    hideLoader("eventos-loading");
  }
}

// FUNÇÃO AUXILIAR - Extrair valores de estruturas aninhadas
function extrairValor(objeto, caminhos, valorPadrao) {
  for (const caminho of caminhos) {
    try {
      const partes = caminho.split(".");
      let valor = objeto;

      for (const parte of partes) {
        if (parte === "length" && Array.isArray(valor)) {
          valor = valor.length;
        } else if (valor && typeof valor === "object" && parte in valor) {
          valor = valor[parte];
        } else {
          valor = undefined;
          break;
        }
      }

      if (valor !== undefined && valor !== null) {
        console.log(`✅ Valor encontrado em '${caminho}':`, valor);
        return valor;
      }
    } catch (e) {
      console.log(`⚠️ Erro ao acessar '${caminho}':`, e.message);
    }
  }

  console.log(`⚠️ Usando valor padrão:`, valorPadrao);
  return valorPadrao;
}

// FUNÇÃO AUXILIAR - Atualizar elemento DOM com verificação
function atualizarElementoDOM(id, valor, propriedade = "textContent") {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento[propriedade] = valor;
    console.log(`✅ ${id} atualizado:`, valor);
  } else {
    console.error(`❌ Elemento '${id}' não encontrado!`);
  }
}

// FUNÇÃO AUXILIAR - Renderizar tabela de participantes
function renderizarTabelaParticipantes(participantes) {
  if (!participantesTableBody) {
    console.error("❌ Tbody da tabela não encontrado!");
    return;
  }

  participantesTableBody.innerHTML = "";

  if (
    !participantes ||
    !Array.isArray(participantes) ||
    participantes.length === 0
  ) {
    participantesTableBody.innerHTML =
      '<tr><td colspan="3" class="text-center">Nenhum participante inscrito</td></tr>';
    console.log("ℹ️ Nenhum participante encontrado");
    return;
  }

  console.log(`👥 Renderizando ${participantes.length} participantes...`);

  participantes.forEach((participante, index) => {
    console.log(`👤 Participante ${index + 1}:`, participante);

    // EXTRAÇÃO INTELIGENTE DOS DADOS DO PARTICIPANTE
    const nomeParticipante = extrairValor(
      participante,
      ["nome_participante", "nome", "nomeParticipante", "participant_name"],
      "N/A"
    );

    const idadeParticipante = extrairValor(
      participante,
      ["idade_participante", "idade", "idadeParticipante", "participant_age"],
      "N/A"
    );

    const nomeUsuario = extrairValor(
      participante,
      [
        "usuario_nome",
        "nome_usuario",
        "usuario",
        "nomeUsuario",
        "user_name",
        "criador_nome",
      ],
      "N/A"
    );

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nomeParticipante}</td>
      <td>${idadeParticipante}</td>
      <td>${nomeUsuario}</td>
    `;

    participantesTableBody.appendChild(tr);
  });

  console.log(
    `✅ ${participantes.length} participantes renderizados com sucesso!`
  );
}

// Abrir modal para novo evento
async function abrirModalNovoEvento() {
  try {
    // Carregar usuários para o select
    const usuarios = await UsuariosAPI.listarTodos();
    fillSelectOptions("evento-criador", usuarios, "id", "nome");

    eventoModalTitle.textContent = "Novo Evento";
    eventoIdInput.value = "";
    clearForm("evento-form");
    openModal("evento-modal-backdrop");
  } catch (error) {
    showAlert(`Erro ao carregar usuários: ${error.message}`, "danger");
  }
}

// Abrir modal para editar evento
async function abrirModalEditarEvento(id) {
  try {
    showLoader("eventos-loading");

    // Carregar dados do evento
    const evento = await EventosAPI.buscarPorId(id);

    // Carregar usuários para o select
    const usuarios = await UsuariosAPI.listarTodos();
    fillSelectOptions(
      "evento-criador",
      usuarios,
      "id",
      "nome",
      evento.criador_id
    );

    eventoModalTitle.textContent = "Editar Evento";
    eventoIdInput.value = evento.id;
    eventoTituloInput.value = evento.titulo;
    eventoDescricaoInput.value = evento.descricao;
    eventoImagemInput.value = evento.imagem_url;

    openModal("evento-modal-backdrop");
  } catch (error) {
    showAlert(`Erro ao carregar dados do evento: ${error.message}`, "danger");
  } finally {
    hideLoader("eventos-loading");
  }
}

// Salvar evento (criar ou atualizar)
async function salvarEvento() {
  if (!validateForm("evento-form")) {
    showAlert("Por favor, preencha todos os campos obrigatórios.", "warning");
    return;
  }

  try {
    const id = eventoIdInput.value;
    const dadosEvento = {
      titulo: eventoTituloInput.value,
      descricao: eventoDescricaoInput.value,
      imagem_url: eventoImagemInput.value,
      criador_id: parseInt(eventoCriadorSelect.value),
    };

    showLoader("eventos-loading");

    if (id) {
      // Atualizar evento existente
      await EventosAPI.atualizar(id, dadosEvento);
      showAlert("Evento atualizado com sucesso!", "success");
    } else {
      // Criar novo evento
      await EventosAPI.criar(dadosEvento);
      showAlert("Evento criado com sucesso!", "success");
    }

    closeModal("evento-modal-backdrop");
    carregarEventos();
  } catch (error) {
    showAlert(`Erro ao salvar evento: ${error.message}`, "danger");
  } finally {
    hideLoader("eventos-loading");
  }
}

// Confirmar exclusão de evento
function confirmarExclusaoEvento(id) {
  confirmAction("Tem certeza que deseja excluir este evento?", async () => {
    try {
      showLoader("eventos-loading");
      await EventosAPI.excluir(id);
      showAlert("Evento excluído com sucesso!", "success");
      carregarEventos();
    } catch (error) {
      showAlert(`Erro ao excluir evento: ${error.message}`, "danger");
    } finally {
      hideLoader("eventos-loading");
    }
  });
}
