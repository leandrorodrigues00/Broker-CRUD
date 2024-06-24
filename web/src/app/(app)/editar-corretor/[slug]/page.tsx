import { EditRealEstateAgentForm } from "@/components/edit-real-estate-agent-form";

interface ParamsProps {
  params: { slug: string };
}

interface CorretorApiProps {
  status: boolean;
  mensagem: string;
  corretor: Corretor;
}

export interface Corretor {
  id: number;
  name: string;
  cpf: string;
  creci: string;
}
export default async function EditarCorretorPage({ params }: ParamsProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/corretores/${params.slug}`,
    {
      cache: "no-store",
    },
  );
  const data: CorretorApiProps = await response.json();

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="mb-3 flex flex-col items-center justify-center border-b border-zinc-200 pb-2">
        <h1 className="text-3xl font-medium text-zinc-900">Editar corretor</h1>

        <span className="text-sm text-zinc-500">
          Editar corretor id: <span className="font-bold">{params.slug}</span>
        </span>
      </div>
      {data.status === true ? (
        <EditRealEstateAgentForm corretor={data.corretor} />
      ) : (
        <p>{data.mensagem}</p>
      )}
    </main>
  );
}
