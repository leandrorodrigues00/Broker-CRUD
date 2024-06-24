"use client";

import { useEffect, useState } from "react";
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

interface CorretoresApi {
  status: string;
  mensagem: string;
  usuarios: Corretor[];
}

interface ListRealEstateAgentsProps {
  updateTrigger: boolean;
}
export function ListRealEstateAgents({
  updateTrigger,
}: ListRealEstateAgentsProps) {
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRealEstateAgents() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/corretores`,
          {
            cache: "no-store",
          },
        );
        const data = (await response.json()) as CorretoresApi;

        if (response.ok) {
          setCorretores(data.usuarios);
        } else {
          console.error("Erro ao buscar corretores:", data.mensagem);
        }
      } catch (error) {
        console.error("Erro ao buscar corretores:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRealEstateAgents();
  }, [updateTrigger]);

  async function handleDelete(id: number) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/corretores/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        const updatedCorretores = corretores.filter(
          (corretor) => corretor.id !== id,
        );
        setCorretores(updatedCorretores);
        toast.info("Corretor deletado com sucesso", {
          duration: 4000,
        });
      } else {
        const errorData = await response.json();
        console.error("Erro ao deletar corretor:", errorData.mensagem);
      }
    } catch (error) {
      console.error("Erro ao deletar corretor:", error);
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
                      <Button variant="outline" asChild>
                        <a
                          href={`/editar-corretor/${corretor.id}`}
                          className="flex items-center gap-1 text-blue-500"
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
