// Gerenciamento de Usuários

// Elementos do DOM
const usuariosTableBody = document.getElementById("usuarios-table-body");
const btnNovoUsuario = document.getElementById("btn-novo-usuario");
const usuarioForm = document.getElementById("usuario-form");
const usuarioModalBackdrop = document.getElementById("usuario-modal-backdrop");
const usuarioModalClose = document.getElementById("usuario-modal-close");
const usuarioCancelBtn = document.getElementById("usuario-cancel-btn");
const usuarioSaveBtn = document.getElementById("usuario-save-btn");
const usuarioModalTitle = document.getElementById("usuario-modal-title");
const usuarioIdInput = document.getElementById("usuario-id");
const usuarioNomeInput = document.getElementById("usuario-nome");
const usuarioEmailInput = document.getElementById("usuario-email");
const usuarioSenhaInput = document.getElementById("usuario-senha");
const senhaGroup = document.getElementById("senha-group");
const usuariosLoading = document.getElementById("usuarios-loading");

// Inicialização
function initUsuarios() {
  // Carregar lista de usuários
  carregarUsuarios();

  // Event listeners
  btnNovoUsuario.addEventListener("click", abrirModalNovoUsuario);
  usuarioModalClose.addEventListener("click", () =>
    closeModal("usuario-modal-backdrop")
  );
  usuarioCancelBtn.addEventListener("click", () =>
    closeModal("usuario-modal-backdrop")
  );
  usuarioSaveBtn.addEventListener("click", salvarUsuario);
}

// Carregar lista de usuários
async function carregarUsuarios() {
  try {
    showLoader("usuarios-loading");
    const usuarios = await UsuariosAPI.listarTodos();
    renderizarUsuarios(usuarios);
  } catch (error) {
    showAlert(`Erro ao carregar usuários: ${error.message}`, "danger");
  } finally {
    hideLoader("usuarios-loading");
  }
}

// Renderizar lista de usuários
function renderizarUsuarios(usuarios) {
  usuariosTableBody.innerHTML = "";

  if (usuarios.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td colspan="4" class="text-center">Nenhum usuário encontrado</td>';
    usuariosTableBody.appendChild(tr);
    return;
  }

  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>
                <button class="btn btn-sm btn-primary mr-1 btn-editar" data-id="${usuario.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${usuario.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

    // Event listeners para botões de ação
    tr.querySelector(".btn-editar").addEventListener("click", () =>
      abrirModalEditarUsuario(usuario.id)
    );
    tr.querySelector(".btn-excluir").addEventListener("click", () =>
      confirmarExclusaoUsuario(usuario.id)
    );

    usuariosTableBody.appendChild(tr);
  });
}

// Abrir modal para novo usuário
function abrirModalNovoUsuario() {
  usuarioModalTitle.textContent = "Novo Usuário";
  usuarioIdInput.value = "";
  clearForm("usuario-form");
  senhaGroup.style.display = "block";
  usuarioSenhaInput.required = true;
  openModal("usuario-modal-backdrop");
}

// Abrir modal para editar usuário
async function abrirModalEditarUsuario(id) {
  try {
    showLoader("usuarios-loading");
    const usuario = await UsuariosAPI.buscarPorId(id);

    usuarioModalTitle.textContent = "Editar Usuário";
    usuarioIdInput.value = usuario.id;
    usuarioNomeInput.value = usuario.nome;
    usuarioEmailInput.value = usuario.email;

    // Esconder campo de senha na edição
    senhaGroup.style.display = "none";
    usuarioSenhaInput.required = false;

    openModal("usuario-modal-backdrop");
  } catch (error) {
    showAlert(`Erro ao carregar dados do usuário: ${error.message}`, "danger");
  } finally {
    hideLoader("usuarios-loading");
  }
}

// Salvar usuário (criar ou atualizar)
async function salvarUsuario() {
  if (!validateForm("usuario-form")) {
    showAlert("Por favor, preencha todos os campos obrigatórios.", "warning");
    return;
  }

  try {
    const id = usuarioIdInput.value;
    const dadosUsuario = {
      nome: usuarioNomeInput.value,
      email: usuarioEmailInput.value,
    };

    // Adicionar senha apenas para novos usuários
    if (!id) {
      dadosUsuario.senha = usuarioSenhaInput.value;
    }

    showLoader("usuarios-loading");

    if (id) {
      // Atualizar usuário existente
      await UsuariosAPI.atualizar(id, dadosUsuario);
      showAlert("Usuário atualizado com sucesso!", "success");
    } else {
      // Criar novo usuário
      await UsuariosAPI.criar(dadosUsuario);
      showAlert("Usuário criado com sucesso!", "success");
    }

    closeModal("usuario-modal-backdrop");
    carregarUsuarios();
  } catch (error) {
    showAlert(`Erro ao salvar usuário: ${error.message}`, "danger");
  } finally {
    hideLoader("usuarios-loading");
  }
}

// Confirmar exclusão de usuário
function confirmarExclusaoUsuario(id) {
  confirmAction("Tem certeza que deseja excluir este usuário?", async () => {
    try {
      showLoader("usuarios-loading");
      await UsuariosAPI.excluir(id);
      showAlert("Usuário excluído com sucesso!", "success");
      carregarUsuarios();
    } catch (error) {
      showAlert(`Erro ao excluir usuário: ${error.message}`, "danger");
    } finally {
      hideLoader("usuarios-loading");
    }
  });
}
