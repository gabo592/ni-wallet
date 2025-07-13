"use client";

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
import { useLoginForm } from "@/hooks/auth/login-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const LoginForm = () => {
  const { form, isPending, submit } = useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="grid items-start w-full max-w-md gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el correo electrónico que utilizó cuando se registró
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese la contraseña que utilizó cuando se registró
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Iniciar Sesión
        </Button>

        <Button variant="outline" asChild>
          <Link href="/auth/register">Registrarse</Link>
        </Button>
      </form>
    </Form>
  );
};
