import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { formatCpf } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input, InputRoot } from "@/components/ui/input";

interface dataResponse {
  status: boolean;
  mensagem: string;
  corretor: {
    nome: string;
    cpf: string;
    creci: string;
  };
}

const createRealEstateAgentSchema = z.object({
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

type CreateRealEstateAgentData = z.infer<typeof createRealEstateAgentSchema>;

interface RealEstateAgentRegistrationFormProps {
  onSuccess: () => void;
}

export function RealEstateAgentRegistrationForm({
  onSuccess,
}: RealEstateAgentRegistrationFormProps) {
  const createRealEstateAgentForm = useForm<CreateRealEstateAgentData>({
    resolver: zodResolver(createRealEstateAgentSchema),
  });

  const { handleSubmit, getValues, reset } = createRealEstateAgentForm;

  async function createRealEstateAgent(data: CreateRealEstateAgentData) {
    const formData = {
      ...data,
      cpf: getValues("cpf").replace(/\D/g, ""), // Remove pontos e traços
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/corretores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result: dataResponse = await response.json();

      if (response.status === 201) {
        toast.success(result.mensagem, {
          duration: 4000,
        });
        reset();
        onSuccess();
      } else {
        toast.error(result.mensagem);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar corretor.");
      console.error("Erro ao cadastrar corretor:", error);
    }
  }

  return (
    <FormProvider {...createRealEstateAgentForm}>
      <form
        className="mt-4 flex flex-col gap-2"
        onSubmit={handleSubmit(createRealEstateAgent)}
      >
        <div className="flex gap-2">
          <div>
            <InputRoot>
              <Input
                id="cpf"
                name="cpf"
                placeholder="Digite o seu CPF"
                onChange={(e) => {
                  const { value } = e.target;
                  e.target.value = formatCpf(value);
                }}
              />
            </InputRoot>
            <ErrorMessage field="cpf" />
          </div>

          <div>
            <InputRoot>
              <Input id="creci" name="creci" placeholder="Digite o seu Creci" />
            </InputRoot>
            <ErrorMessage field="creci" />
          </div>
        </div>

        <InputRoot>
          <Input id="name" name="name" placeholder="Digite seu nome" />
        </InputRoot>
        <ErrorMessage field="name" />

        <Button type="submit">Enviar</Button>
      </form>
    </FormProvider>
  );
}
