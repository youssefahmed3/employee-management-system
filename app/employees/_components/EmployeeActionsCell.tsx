import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { EmployeeType } from '@/lib/models/employee.model';
import { deleteEmployee } from '@/lib/actions/employee.action';
/* import { deleteProductById } from "@/lib/actions/product.action";
import { ProductType } from "@/lib/models/product.model"; */

const EmployeeActionsCell = ({ employee }: { employee: EmployeeType }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(employee.id as string)
          }
        >
          Copy Employee Id
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push(`/employees/${employee.id}`)}
          className="bg-customColors-blue text-customColors-white"
        >
          Edit Employee Information
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className='border-2 border-customColors-github-dark' />
        <DropdownMenuItem
          className="bg-red-700 text-customColors-google-white"
          onClick={async () =>
            await deleteEmployee(employee.id as string)
          }
        >
          Delete Employee
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmployeeActionsCell;