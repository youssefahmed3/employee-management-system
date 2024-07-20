"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/employees/_components/columns";
/* import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/store/products/productsSlice"; */
import { useRouter } from "next/navigation";
import { EmployeeType } from "@/lib/models/employee.model";
import { fetchAllEmployees } from "@/lib/actions/employee.action";
import { useSession } from "next-auth/react";
/* import { getProductById } from "@/lib/actions/product.action"; */

function Page() {
  const {data: session} = useSession();
  const [employees, setEmployees] = useState<EmployeeType[] | []>([]);

  const router = useRouter();

  useEffect(() => {
    async function getEmployees() {
      const data = await fetchAllEmployees();
      setEmployees(data);
    }
    getEmployees();
  }, []);

  return (
    <div className="px-4 ">
      {session?.user ? (
        <>
          <h1 className="text-2xl font-bold">All Employees</h1>
          <DataTable
            columns={columns}
            data={employees}
            actionDisabled={false}
            buttonName="Add Employee"
            filterBy="email"
            filterByPlaceholder="Employee's Email"
            buttonAction={() => {
              router.push("/employees/new");
            }}
          />
        </>
      ) : <><p className="font-bold font-mono text-center text-2xl">You don&apos;t have permessions to Access or view the Content of This Page</p></>}
    </div>
  );
}

export default Page;
