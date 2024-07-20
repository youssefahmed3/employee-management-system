"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";
import { BadgeCheck, BadgeX } from "lucide-react";
import { EmployeeType } from "@/lib/models/employee.model";
import { getUserById } from "@/lib/actions/user.action";
import CreatedByView from "./createdByView";
import EmployeeActionsCell from "./EmployeeActionsCell";



export const columns: ColumnDef<EmployeeType>[] = [
  {
    accessorFn: (row) => row.name.firstName,
    header: "First Name",
  },
  {
    accessorFn: (row) => row.name.lastName,
    header: "Last Name",
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ cell }) => {
      const salary = cell.row.original.salary;
      return `${formatCurrency(salary)}`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdBy",
    header: "CreatedBy",
    cell: ({ cell }) => {
      const userId = cell.row.original.createdBy;
      
      return <CreatedByView createdBy={userId as string} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    cell: ({ row }) => <EmployeeActionsCell employee={row.original} />, // Use the new component
  },
];