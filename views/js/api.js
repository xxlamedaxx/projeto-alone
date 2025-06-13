// URL base da API
const API_BASE_URL = "http://localhost:3000/api";

// Funções para gerenciamento de usuários
const UsuariosAPI = {
  // Listar todos os usuários
  listarTodos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao listar usuários: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw error;
    }
  },

  // Buscar usuário por ID
  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
      throw error;
    }
  },

  // Criar novo usuário
  criar: async (dadosUsuario) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuario),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar usuário: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  // Atualizar usuário existente
  atualizar: async (id, dadosUsuario) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuario),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar usuário: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
      throw error;
    }
  },

  // Excluir usuário
  excluir: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir usuário: ${response.status}`);
      }

      // Se a resposta for 204 No Content, não há corpo para parsear
      if (response.status === 204) {
        return true; // Ou algum indicador de sucesso
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao excluir usuário com ID ${id}:`, error);
      throw error;
    }
  },
};

// Funções para gerenciamento de eventos
const EventosAPI = {
  // Listar todos os eventos
  listarTodos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/eventos`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao listar eventos: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao listar eventos:", error);
      throw error;
    }
  },

  // Buscar evento por ID
  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar evento: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar evento com ID ${id}:`, error);
      throw error;
    }
  },

  // Criar novo evento
  criar: async (dadosEvento) => {
    try {
      const response = await fetch(`${API_BASE_URL}/eventos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosEvento),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar evento: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      throw error;
    }
  },

  // Atualizar evento existente
  atualizar: async (id, dadosEvento) => {
    try {
      const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosEvento),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar evento: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao atualizar evento com ID ${id}:`, error);
      throw error;
    }
  },

  // Excluir evento
  excluir: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir evento: ${response.status}`);
      }

      // Se a resposta for 204 No Content, não há corpo para parsear
      if (response.status === 204) {
        return true; // Ou algum indicador de sucesso
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao excluir evento com ID ${id}:`, error);
      throw error;
    }
  },

  // MÉTODO CORRIGIDO - Obter dashboard do evento
  obterDashboard: async (id) => {
    try {
      console.log(
        `🔄 Fazendo requisição para: ${API_BASE_URL}/eventos/${id}/dashboard`
      );

      const response = await fetch(`${API_BASE_URL}/eventos/${id}/dashboard`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log(`📊 Status da resposta: ${response.status}`);

      if (!response.ok) {
        throw new Error(
          `Erro ao obter dashboard do evento: ${response.status}`
        );
      }

      const data = await response.json();

      // LOGS DETALHADOS PARA DEBUG
      console.log("=== 📈 DADOS DO DASHBOARD RECEBIDOS ===");
      console.log("🔍 Dados completos:", data);
      console.log("🏷️  Tipo:", typeof data);
      console.log("📋 É array?", Array.isArray(data));
      console.log("🔑 Chaves disponíveis:", Object.keys(data));

      // Verificar estruturas específicas
      if (data.evento) {
        console.log("🎯 Dados do evento:", data.evento);
      }
      if (data.inscricoes) {
        console.log("👥 Inscrições encontradas:", data.inscricoes.length);
        console.log("👤 Primeira inscrição:", data.inscricoes[0]);
      }
      if (data.totalInscricoes !== undefined) {
        console.log("📊 Total de inscrições:", data.totalInscricoes);
      }
      if (data.estatisticas) {
        console.log("📈 Estatísticas:", data.estatisticas);
      }

      console.log("=======================================");

      return data;
    } catch (error) {
      console.error(
        `❌ Erro ao obter dashboard do evento com ID ${id}:`,
        error
      );
      throw error;
    }
  },
};

// Funções para gerenciamento de inscrições
const InscricoesAPI = {
  // Listar todas as inscrições
  listarTodas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inscricoes`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao listar inscrições: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao listar inscrições:", error);
      throw error;
    }
  },

  // Buscar inscrição por ID
  buscarPorId: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inscricoes/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar inscrição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar inscrição com ID ${id}:`, error);
      throw error;
    }
  },

  // Criar nova inscrição
  criar: async (dadosInscricao) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inscricoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosInscricao),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar inscrição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar inscrição:", error);
      throw error;
    }
  },

  // Atualizar inscrição existente
  atualizar: async (id, dadosInscricao) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inscricoes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosInscricao),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar inscrição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao atualizar inscrição com ID ${id}:`, error);
      throw error;
    }
  },

  // Excluir inscrição
  excluir: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inscricoes/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir inscrição: ${response.status}`);
      }

      // Se a resposta for 204 No Content, não há corpo para parsear
      if (response.status === 204) {
        return true; // Ou algum indicador de sucesso
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao excluir inscrição com ID ${id}:`, error);
      throw error;
    }
  },
};
