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
            Delete
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-200">
        <DialogHeader>
          <DialogTitle className="mt-5 text-center text-2xl font-bold">
             Warning, this action is irreversible
          </DialogTitle>
          <DialogDescription className="mb-2 text-center text-base">
             Are you sure you want to delete this broker?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="danger"
              className="w-full"
              onClick={() => handleDelete(corretorId)}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
