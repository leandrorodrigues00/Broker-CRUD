"use server";

import { editEstateAgent } from "@/http/edit-estate-agent";
import { HTTPError } from "ky";
import { z } from "zod";

const editEstateAgentSchema = z.object({
  id: z.string().min(1),
  cpf: z.string().refine(
    (val) => {
      const cleaned = val.replace(/\D/g, ""); // Remove all non-numeric characters
      return cleaned.length === 11;
    },
    { message: "Invalid CPF" },
  ),
  creci: z
    .string()
    .min(2, { message: "CRECI must have at least 2 characters" })
    .max(10, { message: "Maximum 10 digits, as per Federation" }),
  name: z.string().min(2, { message: "Name must have at least 2 characters" }),
});

export async function editEstateAgentAction(data: FormData) {
  const result = editEstateAgentSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { name, cpf, creci, id } = result.data;

  const formattedCpf = cpf.replace(/\D/g, "");

  try {
    const apiResponse = await editEstateAgent({
      id,
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
      message: "Unexpected error, please try again in a few minutes",
      errors: null,
    };
  }
}
