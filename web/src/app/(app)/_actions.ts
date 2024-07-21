"use server";

import { registerEstateAgent } from "@/http/register-estate-agent";
import { HTTPError } from "ky";
import { z } from "zod";

const createEstateAgentSchema = z.object({
  cpf: z.string().refine(
    (val) => {
      const cleaned = val.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
      return cleaned.length === 11;
    },
    { message: "CPF inválido" },
  ),
  creci: z
    .string()
    .min(2, { message: "CRECI deve ter no mínimo 2 caracteres" })
    .max(10, { message: "máximo 10 dígitos, conforme Federação" }),
  name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
});

export async function registerEstateAgentAction(data: FormData) {
  const result = createEstateAgentSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { name, cpf, creci } = result.data;

  const formattedCpf = cpf.replace(/\D/g, "");

  try {
    const apiResponse = await registerEstateAgent({
      name,
      cpf: formattedCpf,
      creci,
    });

    return { success: true, message: apiResponse.mensagem, errors: null };
  } catch (err) {
    if (err instanceof HTTPError) {
      const { mensagem } = await err.response.json();

      return { success: false, message: mensagem, errors: null };
    }

    return {
      success: false,
      message: "Erro inesperado, tente novamente dentro de alguns minutos",
      errors: null,
    };
  }
}
