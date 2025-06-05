// Arquivo principal de inicialização da aplicação

// Elementos do DOM
const confirmModalBackdrop = document.getElementById("confirm-modal-backdrop");
const confirmModalClose = document.getElementById("confirm-modal-close");
const confirmCancelBtn = document.getElementById("confirm-cancel-btn");

// Inicialização da aplicação
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar módulos
  initUsuarios();
  initEventos();
  initInscricoes();

  // Configurar navegação
  setupNavigation();

  // Configurar modal de confirmação
  setupConfirmModal();

  // Mostrar seção inicial (eventos)
  showSection("eventos-section");
});

// Configurar navegação
function setupNavigation() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(`${section}-section`);
    });
  });
}

// Configurar modal de confirmação
function setupConfirmModal() {
  confirmModalClose.addEventListener("click", () =>
    closeModal("confirm-modal-backdrop")
  );
  confirmCancelBtn.addEventListener("click", () =>
    closeModal("confirm-modal-backdrop")
  );
}
