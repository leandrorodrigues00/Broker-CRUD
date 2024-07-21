import { api } from "./api-client";

interface editEstateAgentRequest {
  id: string;
  name: string;
  cpf: string;
  creci: string;
}

interface editEstateAgentResponse {
  status: boolean;
  mensagem: string;
  corretor: {
    nome: string;
    cpf: string;
    creci: string;
  };
}

export async function editEstateAgent({
  id,
  name,
  cpf,
  creci,
}: editEstateAgentRequest) {
  const result = await api
    .put(`corretore/${id}`, {
      json: {
        name,
        cpf,
        creci,
      },
    })
    .json<editEstateAgentResponse>();

  return result;
}
