import { api } from "./api-client";

interface Corretor {
  id: number;
  name: string;
  cpf: string;
  creci: string;
}
interface ListEstateAgentResponse {
  status: string;
  mensagem: string;
  usuarios: Corretor[];
}

export async function listEstateAgent() {
  const result = await api
    .get("corretores", {
      cache: "no-store",
    })
    .json<ListEstateAgentResponse>();

  return result;
}
