"use client";

import { useEffect, useState } from "react";
import { deleteEstateAgent } from "@/http/delete-estate-agent";
import { listEstateAgent } from "@/http/list-estate-agent";
import useStore from "@/zustand-store";
import { HTTPError } from "ky";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListSkeleton } from "@/components/list-skeleton";
import { DeleteModal } from "@/components/modals/delete-modal";

interface Corretor {
  id: number;
  name: string;
  cpf: string;
  creci: string;
}

export function EstateAgentList() {
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const rehydrateTrigger = useStore((state) => state.rehydrateTrigger);

  useEffect(() => {
    async function fetchRealEstateAgents() {
      setIsLoading(true);
      try {
        const response = await listEstateAgent();

        setCorretores(response.usuarios);
      } catch (error) {
        if (error instanceof HTTPError) {
          const { mensagem } = await error.response.json();
          console.error(mensagem);

          return { success: false, message: mensagem, errors: null };
        }

        return {
          success: false,
          message: "Erro inesperado, tente novamente dentro de alguns minutos",
          errors: null,
        };
      } finally {
        setIsLoading(false);
      }
    }

    fetchRealEstateAgents();
  }, [rehydrateTrigger]);

  async function handleDelete(id: number) {
    try {
      const response = await deleteEstateAgent({ id });

      if (response.status === true) {
        const updatedCorretores = corretores.filter(
          (corretor) => corretor.id !== id,
        );
        setCorretores(updatedCorretores);

        toast.info("Corretor deletado com sucesso", {
          duration: 4000,
        });
      } else {
        toast.error(response.mensagem, {
          duration: 4000,
        });
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const { mensagem } = await error.response.json();

        return { success: false, message: mensagem, errors: null };
      }

      return {
        success: false,
        message: "Erro inesperado, tente novamente dentro de alguns minutos",
        errors: null,
      };
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Creci</TableHead>
            <TableHead>CPF</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <>
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
            </>
          ) : (
            <>
              {corretores.length > 0 ? (
                corretores.map((corretor) => (
                  <TableRow key={corretor.id}>
                    <TableCell>{corretor.id}</TableCell>
                    <TableCell>{corretor.name}</TableCell>
                    <TableCell>{corretor.creci}</TableCell>
                    <TableCell>{corretor.cpf}</TableCell>

                    <TableCell className="flex justify-end gap-2">
                      <Button asChild variant="outline">
                        <a
                          href={`/editar-corretor/${corretor.id}`}
                          className="flex items-center gap-1 text-blue-600"
                        >
                          <Pencil size={14} />
                          Editar
                        </a>
                      </Button>

                      <DeleteModal
                        handleDelete={handleDelete}
                        corretorId={corretor.id}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Nenhum corretor encontrado.
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
}
