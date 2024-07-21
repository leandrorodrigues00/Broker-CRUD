import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteModalProps {
  handleDelete(
    id: number,
  ): Promise<{ success: boolean; message: any; errors: null } | undefined>;
  corretorId: number;
}

export function DeleteModal({ handleDelete, corretorId }: DeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="flex items-center gap-1 text-red-500">
            <Trash2 size={14} />
            Deletar
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-200">
        <DialogHeader>
          <DialogTitle className="mt-5 text-center text-2xl font-bold">
            Cuidado, essa ação é irreversível
          </DialogTitle>
          <DialogDescription className="mb-2 text-center text-base">
            Você tem certeza que quer deletar esse corretor ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="danger"
              className="w-full"
              onClick={() => handleDelete(corretorId)}
            >
              Deletar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
