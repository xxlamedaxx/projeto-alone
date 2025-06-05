// Funções utilitárias para o sistema

// Exibir mensagem de alerta
function showAlert(message, type = "info") {
  const alertContainer = document.getElementById("alertContainer");
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;

  // Adicionar botão de fechar
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;";
  closeButton.className = "close-alert";
  closeButton.style.float = "right";
  closeButton.style.background = "none";
  closeButton.style.border = "none";
  closeButton.style.fontSize = "1.25rem";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = function () {
    alertDiv.remove();
  };

  alertDiv.prepend(closeButton);
  alertContainer.appendChild(alertDiv);

  // Remover alerta após 5 segundos
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Formatar data
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

// Abrir modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

// Fechar modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Limpar formulário
function clearForm(formId) {
  document.getElementById(formId).reset();
}

// Mostrar loader
function showLoader(loaderId) {
  document.getElementById(loaderId).style.display = "flex";
}

// Esconder loader
function hideLoader(loaderId) {
  document.getElementById(loaderId).style.display = "none";
}

// Mostrar seção
function showSection(sectionId) {
  // Esconder todas as seções
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });

  // Mostrar a seção selecionada
  document.getElementById(sectionId).classList.remove("hidden");

  // Atualizar links ativos
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.section === sectionId.replace("-section", "")) {
      link.classList.add("active");
    }
  });
}

// Mostrar tab
function showTab(tabId, tabContentId) {
  // Esconder todos os conteúdos de tab
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Mostrar o conteúdo da tab selecionada
  document.getElementById(tabContentId).classList.add("active");

  // Atualizar tabs ativas
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
    if (tab.dataset.tab === tabContentId) {
      tab.classList.add("active");
    }
  });
}

// Confirmar ação
function confirmAction(message, callback) {
  document.getElementById("confirm-message").textContent = message;
  openModal("confirm-modal-backdrop");

  // Configurar botão de confirmação
  const confirmBtn = document.getElementById("confirm-ok-btn");
  const oldCallback = confirmBtn.onclick;

  confirmBtn.onclick = function () {
    closeModal("confirm-modal-backdrop");
    callback();
    confirmBtn.onclick = oldCallback;
  };
}

// Truncar texto
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// Validar formulário
function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll("input, select, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      input.classList.add("invalid");
      isValid = false;
    } else {
      input.classList.remove("invalid");
    }
  });

  return isValid;
}

// Preencher select com opções
function fillSelectOptions(
  selectId,
  options,
  valueKey,
  textKey,
  selectedValue = null
) {
  const select = document.getElementById(selectId);

  // Manter apenas a primeira opção (placeholder)
  const firstOption = select.options[0];
  select.innerHTML = "";
  select.appendChild(firstOption);

  // Adicionar novas opções
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option[valueKey];
    optionElement.textContent = option[textKey];

    if (selectedValue !== null && option[valueKey] == selectedValue) {
      optionElement.selected = true;
    }

    select.appendChild(optionElement);
  });
}

// Obter dados do formulário
function getFormData(formId, idField = null) {
  const form = document.getElementById(formId);
  const formData = {};

  // Adicionar ID se fornecido
  if (idField) {
    const idInput = document.getElementById(idField);
    if (idInput && idInput.value) {
      formData.id = parseInt(idInput.value);
    }
  }

  // Coletar dados dos campos
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    if (input.id && input.id !== idField) {
      const fieldName = input.id.split("-")[1]; // Exemplo: usuario-nome -> nome

      // Converter para número se for um campo numérico
      if (input.type === "number") {
        formData[fieldName] = parseInt(input.value);
      } else {
        formData[fieldName] = input.value;
      }
    }
  });

  return formData;
}
