import { getEstateAgentById } from "@/http/get-estate-agent-by-id";

import { EditEstateAgent } from "@/components/edit-estate-agent";

interface ParamsProps {
  params: { slug: string };
}

export default async function EditarCorretorPage({ params }: ParamsProps) {
  const estateAgent = await getEstateAgentById({ id: params.slug });

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="mb-3 flex flex-col items-center justify-center border-b border-zinc-200 pb-2">
        <h1 className="text-3xl font-medium text-zinc-900">Editar corretor</h1>

        <span className="text-sm text-zinc-500">
          Editar corretor id: <span className="font-bold">{params.slug}</span>
        </span>
      </div>

      {estateAgent.status === true ? (
        <EditEstateAgent corretor={estateAgent.corretor} />
      ) : (
        <p>{estateAgent.mensagem}</p>
      )}
    </main>
  );
}
