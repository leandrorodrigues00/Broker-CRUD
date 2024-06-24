import { TableCell, TableRow } from "@/components/ui//table";
import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-[35px] w-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[35px] w-[203px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[35px] w-[131px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[35px] w-[180px]" />
      </TableCell>

      <TableCell className="flex justify-end gap-2">
        <Skeleton className="h-[35px] w-[100px]" />

        <Skeleton className="h-[35px] w-[100px]" />
      </TableCell>
    </TableRow>
  );
}
