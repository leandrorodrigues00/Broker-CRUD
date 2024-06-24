import { FormClientSide } from "@/components/form-client-side";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="mb-3 flex flex-col items-center justify-center border-b border-zinc-200 pb-2">
        <h1 className="text-3xl font-medium text-zinc-900">
          Cadastro de corretor
        </h1>

        <span className="text-sm text-zinc-500">Cadastre seus dados aqui.</span>
      </div>

      <FormClientSide />
    </main>
  );
}
