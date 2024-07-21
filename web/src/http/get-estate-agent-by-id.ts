import { api } from "./api-client";

interface getEstateAgentByIdRequest {
  id: string;
}

interface getEstateAgentByIdResponse {
  status: boolean;
  mensagem: string;
  corretor: {
    id: string;
    name: string;
    cpf: string;
    creci: string;
  };
}

export async function getEstateAgentById({ id }: getEstateAgentByIdRequest) {
  const result = await api
    .get(`corretores/${id}`, {
      cache: "no-store",
    })
    .json<getEstateAgentByIdResponse>();

  return result;
}
