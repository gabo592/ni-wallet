"use client";

import {useLoginForm} from "@/hooks/auth/use-login-form";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Loader2} from "lucide-react";

const testId = "auth-login-form";

export function LoginForm() {
  const {form, isPending, onSubmit} = useLoginForm();

  return (
    <form className='w-full max-w-md' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='email'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${testId}-email-input`}>Correo Electrónico</FieldLabel>
              <Input
                {...field}
                id={`${testId}-email-input`}
                aria-invalid={fieldState.invalid}
                placeholder='Escriba su correo aquí'
                autoComplete='off'
                type='email'
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
        <Controller
          name='password'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${testId}-password-input`}>Contraseña</FieldLabel>
              <Input
                {...field}
                id={`${testId}-password-input`}
                aria-invalid={fieldState.invalid}
                placeholder='Escriba su contraseña aquí'
                autoComplete='off'
                type='password'
              />
              <FieldDescription>
                <Link href={"/auth/reset-paswoord"}>Olvidé mi contraseña</Link>
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
        <Field>
          <Button type='submit' disabled={isPending}>
            Iniciar Sesión
            {isPending && (<Loader2 className='animate-spin w-4 h-4'/>)}
          </Button>
          <Button
            nativeButton={false}
            variant='link'
            render={<Link href={"/auth/register"}>¿No tienes una cuenta? Crea una aquí</Link>}/>
        </Field>
      </FieldGroup>
    </form>
  )
}
