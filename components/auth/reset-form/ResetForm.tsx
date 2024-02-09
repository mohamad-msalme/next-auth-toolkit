'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Astric } from '@/components/ui/astric/Astric'
import { Button } from '@/components/ui/button'
import { ImSpinner3 } from 'react-icons/im'
import { useResetForm } from './useResetForm'
import { FormErrorAlert } from '@/components/ui/form-msg/FormErrorAlert'
import { FormSuccessAlert } from '@/components/ui/form-msg/FormSuccessAlert'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from '@/components/ui/form'

export const ResetForm: React.FC = () => {
  const { form, isSubmitting, onSubmit, successMsg, errMsg } = useResetForm()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <Astric />
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormErrorAlert msg={errMsg} />
        <FormSuccessAlert msg={successMsg} />
        <Button className=" w-full" disabled={isSubmitting} type="submit">
          <ImSpinner3
            className={cn('mr-2 h-4 w-4 animate-spin hidden', {
              block: isSubmitting
            })}
          />
          Send Reset email
        </Button>
      </form>
    </Form>
  )
}
