import { api } from "./api-client";

interface Corretor {
  id: number;
  name: string;
  cpf: string;
  creci: string;
}

interface deleteEstateAgentRequest {
  id: number;
}

interface deleteEstateAgentResponse {
  status: boolean;
  mensagem: string;
  usuarios: Corretor[];
}

export async function deleteEstateAgent({ id }: deleteEstateAgentRequest) {
  const result = await api
    .delete(`corretores/${id}`, {
      cache: "no-store",
    })
    .json<deleteEstateAgentResponse>();

  return result;
}
