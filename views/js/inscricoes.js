// Gerenciamento de Inscrições

// Elementos do DOM
const inscricoesTableBody = document.getElementById("inscricoes-table-body");
const btnNovaInscricao = document.getElementById("btn-nova-inscricao");
const inscricaoForm = document.getElementById("inscricao-form");
const inscricaoModalBackdrop = document.getElementById(
  "inscricao-modal-backdrop"
);
const inscricaoModalClose = document.getElementById("inscricao-modal-close");
const inscricaoCancelBtn = document.getElementById("inscricao-cancel-btn");
const inscricaoSaveBtn = document.getElementById("inscricao-save-btn");
const inscricaoModalTitle = document.getElementById("inscricao-modal-title");
const inscricaoIdInput = document.getElementById("inscricao-id");
const inscricaoUsuarioSelect = document.getElementById("inscricao-usuario");
const inscricaoEventoSelect = document.getElementById("inscricao-evento");
const inscricaoNomeInput = document.getElementById("inscricao-nome");
const inscricaoIdadeInput = document.getElementById("inscricao-idade");
const inscricoesLoading = document.getElementById("inscricoes-loading");

// Mapeamento de eventos e usuários para exibição
let eventosMap = {};
let usuariosMap = {};

// Inicialização
function initInscricoes() {
  // Carregar lista de inscrições
  carregarInscricoes();

  // Event listeners
  btnNovaInscricao.addEventListener("click", abrirModalNovaInscricao);
  inscricaoModalClose.addEventListener("click", () =>
    closeModal("inscricao-modal-backdrop")
  );
  inscricaoCancelBtn.addEventListener("click", () =>
    closeModal("inscricao-modal-backdrop")
  );
  inscricaoSaveBtn.addEventListener("click", salvarInscricao);
}

// Carregar lista de inscrições
async function carregarInscricoes() {
  try {
    showLoader("inscricoes-loading");

    // Carregar dados de eventos e usuários para referência
    const [eventos, usuarios, inscricoes] = await Promise.all([
      EventosAPI.listarTodos(),
      UsuariosAPI.listarTodos(),
      InscricoesAPI.listarTodas(),
    ]);

    // Criar mapas para referência rápida
    eventosMap = eventos.reduce((map, evento) => {
      map[evento.id] = evento;
      return map;
    }, {});

    usuariosMap = usuarios.reduce((map, usuario) => {
      map[usuario.id] = usuario;
      return map;
    }, {});

    renderizarInscricoes(inscricoes);
  } catch (error) {
    showAlert(`Erro ao carregar inscrições: ${error.message}`, "danger");
  } finally {
    hideLoader("inscricoes-loading");
  }
}

// Renderizar lista de inscrições
function renderizarInscricoes(inscricoes) {
  inscricoesTableBody.innerHTML = "";

  if (inscricoes.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td colspan="6" class="text-center">Nenhuma inscrição encontrada</td>';
    inscricoesTableBody.appendChild(tr);
    return;
  }

  inscricoes.forEach((inscricao) => {
    const evento = eventosMap[inscricao.evento_id] || {
      titulo: "Evento não encontrado",
    };
    const usuario = usuariosMap[inscricao.usuario_id] || {
      nome: "Usuário não encontrado",
    };

    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${inscricao.id}</td>
            <td>${evento.titulo}</td>
            <td>${inscricao.nome_participante}</td>
            <td>${inscricao.idade_participante}</td>
            <td>${usuario.nome}</td>
            <td>
                <button class="btn btn-sm btn-primary mr-1 btn-editar" data-id="${inscricao.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${inscricao.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

    // Event listeners para botões de ação
    tr.querySelector(".btn-editar").addEventListener("click", () =>
      abrirModalEditarInscricao(inscricao.id)
    );
    tr.querySelector(".btn-excluir").addEventListener("click", () =>
      confirmarExclusaoInscricao(inscricao.id)
    );

    inscricoesTableBody.appendChild(tr);
  });
}

// Abrir modal para nova inscrição
async function abrirModalNovaInscricao() {
  try {
    showLoader("inscricoes-loading");

    // Carregar usuários e eventos para os selects
    const [usuarios, eventos] = await Promise.all([
      UsuariosAPI.listarTodos(),
      EventosAPI.listarTodos(),
    ]);

    fillSelectOptions("inscricao-usuario", usuarios, "id", "nome");
    fillSelectOptions("inscricao-evento", eventos, "id", "titulo");

    inscricaoModalTitle.textContent = "Nova Inscrição";
    inscricaoIdInput.value = "";
    clearForm("inscricao-form");
    openModal("inscricao-modal-backdrop");
  } catch (error) {
    showAlert(`Erro ao carregar dados: ${error.message}`, "danger");
  } finally {
    hideLoader("inscricoes-loading");
  }
}

// Abrir modal para editar inscrição
async function abrirModalEditarInscricao(id) {
  try {
    showLoader("inscricoes-loading");

    // Carregar dados da inscrição
    const inscricao = await InscricoesAPI.buscarPorId(id);

    // Carregar usuários e eventos para os selects
    const [usuarios, eventos] = await Promise.all([
      UsuariosAPI.listarTodos(),
      EventosAPI.listarTodos(),
    ]);

    fillSelectOptions(
      "inscricao-usuario",
      usuarios,
      "id",
      "nome",
      inscricao.usuario_id
    );
    fillSelectOptions(
      "inscricao-evento",
      eventos,
      "id",
      "titulo",
      inscricao.evento_id
    );

    inscricaoModalTitle.textContent = "Editar Inscrição";
    inscricaoIdInput.value = inscricao.id;
    inscricaoNomeInput.value = inscricao.nome_participante;
    inscricaoIdadeInput.value = inscricao.idade_participante;

    openModal("inscricao-modal-backdrop");
  } catch (error) {
    showAlert(
      `Erro ao carregar dados da inscrição: ${error.message}`,
      "danger"
    );
  } finally {
    hideLoader("inscricoes-loading");
  }
}

// Salvar inscrição (criar ou atualizar)
async function salvarInscricao() {
  if (!validateForm("inscricao-form")) {
    showAlert("Por favor, preencha todos os campos obrigatórios.", "warning");
    return;
  }

  try {
    const id = inscricaoIdInput.value;
    const dadosInscricao = {
      usuario_id: parseInt(inscricaoUsuarioSelect.value),
      evento_id: parseInt(inscricaoEventoSelect.value),
      nome_participante: inscricaoNomeInput.value,
      idade_participante: parseInt(inscricaoIdadeInput.value),
    };

    showLoader("inscricoes-loading");

    if (id) {
      // Atualizar inscrição existente
      await InscricoesAPI.atualizar(id, dadosInscricao);
      showAlert("Inscrição atualizada com sucesso!", "success");
    } else {
      // Criar nova inscrição
      await InscricoesAPI.criar(dadosInscricao);
      showAlert("Inscrição criada com sucesso!", "success");
    }

    closeModal("inscricao-modal-backdrop");
    carregarInscricoes();
  } catch (error) {
    showAlert(`Erro ao salvar inscrição: ${error.message}`, "danger");
  } finally {
    hideLoader("inscricoes-loading");
  }
}

// Confirmar exclusão de inscrição
function confirmarExclusaoInscricao(id) {
  confirmAction("Tem certeza que deseja excluir esta inscrição?", async () => {
    try {
      showLoader("inscricoes-loading");
      await InscricoesAPI.excluir(id);
      showAlert("Inscrição excluída com sucesso!", "success");
      carregarInscricoes();
    } catch (error) {
      showAlert(`Erro ao excluir inscrição: ${error.message}`, "danger");
    } finally {
      hideLoader("inscricoes-loading");
    }
  });
}
