"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signinFormSchema } from "@/lib/validations";
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
import GoogleLogo from "@/assets/googleLogo";
import GitHubLogo from "@/assets/githubLogo";
import AuthButton from "@/components/authButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Page() {
  const router  = useRouter();
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    const responseLogin = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if(responseLogin?.error == null) {
      router.replace('/protected')
    }
    console.log(responseLogin);
  }

  return (
    <div className="flex w-[100%] max-h-min justify-center items-center my-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 items-center flex flex-col w-[300px]"
        >
          <div className="flex flex-col gap-2 w-[100%]">
            <AuthButton
              name="Github"
              image={<GitHubLogo />}
              onClick={() => signIn('github')}
              classname="bg-customColors-github-dark text-customColors-google-white"
            />

            <AuthButton
              name="Google"
              image={<GoogleLogo />}
              onClick={() => signIn('google')}
              classname="bg-customColors-google-white text-customColors-google-black hover:bg-customColors-github-dark hover:text-customColors-github-white"
            />
          </div>
          <hr />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a valid email address..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-[100%]">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Very Secure Password..."
                    {...field}
                    type="password"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[100%]">
            Login
          </Button>
          <p>
            Don&apos;t Have an Account ?{" "}
            <span className="font-bold cursor-pointer" onClick={() => router.replace('/register')}>Register</span>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Page;
