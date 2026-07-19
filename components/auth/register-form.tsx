"use client";

import {useRegisterForm} from "@/hooks/auth/use-register-form";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Controller} from "react-hook-form";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

const testId = "auth-register-form";

export function RegisterForm() {
  const {form, onSubmit, isPending} = useRegisterForm();

  return (
    <form className='w-full max-w-md' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='displayName'
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${testId}-name-input`}>Nombre de Usuario</FieldLabel>
              <Input
                {...field}
                id={`${testId}-name-input`}
                aria-invalid={fieldState.invalid}
                placeholder='Escriba su nombre de usuario aquí'
                autoComplete='off'
                type='text'
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
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
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}/>
              )}
            </Field>
          )}
        />
        <Field>
          <Button type='submit' disabled={isPending}>
            Crear Cuenta
            {isPending && (<Loader2 className='animate-spin w-4 h-4'/>)}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
