"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeFormSchema } from "@/lib/validations";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions/employee.action";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/lib/actions/user.action";

function Page() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      job_title: "",
      salary: "1",
      email: "",
      phone: "1",
    },
  });

  useEffect(() => {
    async function getId() {
        if(session?.user){
            const user = await getUserByEmail(session.user.email as string)
            setUserId(user!.id as string)
        }
    }
    getId()
  })

  async function onSubmit(values: z.infer<typeof employeeFormSchema>) {
    const submittedValues = {
      /* ...values, */
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      job_title: values.job_title,
      email: values.email,
      phone: values.phone,
      salary: Number(values.salary),
      createdBy: userId
    };
    console.log("starts submitting");
    const response = await createEmployee(submittedValues, userId);
    console.log(submittedValues);
    if(response) {
        form.reset();
        router.push("/employees");
    }


    // router.push("/admin/products");
  }
  return (
    <div className="px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bla bla bla..."
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bla bla bla..."
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
