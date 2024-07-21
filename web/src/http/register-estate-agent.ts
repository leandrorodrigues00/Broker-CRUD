import { api } from "./api-client";

interface registerEstateAgentRequest {
  name: string;
  cpf: string;
  creci: string;
}

interface registerEstateAgentResponse {
  status: boolean;
  mensagem: string;
  corretor: {
    nome: string;
    cpf: string;
    creci: string;
  };
}

export async function registerEstateAgent({
  name,
  cpf,
  creci,
}: registerEstateAgentRequest) {
  const result = await api
    .post("corretores", {
      json: {
        name,
        cpf,
        creci,
      },
    })
    .json<registerEstateAgentResponse>();

  return result;
}
