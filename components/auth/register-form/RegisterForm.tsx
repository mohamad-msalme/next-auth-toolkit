'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Astric } from '@/components/ui/astric/Astric'
import { Button } from '@/components/ui/button'
import { ImSpinner3 } from 'react-icons/im'
import { useRegisterForm } from './useRegisterForm'

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

export const RegisterForm: React.FC = () => {
  const { form, isSubmitting, onSubmit, errorMsg, successMsg } =
    useRegisterForm()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <Astric />
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter name" />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <Astric />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormErrorAlert msg={errorMsg} />
        <FormSuccessAlert msg={successMsg} />
        <Button className=" w-full" disabled={isSubmitting} type="submit">
          <ImSpinner3
            className={cn('mr-2 h-4 w-4 animate-spin hidden', {
              block: isSubmitting
            })}
          />
          Create an account
        </Button>
      </form>
    </Form>
  )
}
