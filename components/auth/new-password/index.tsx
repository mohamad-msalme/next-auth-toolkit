'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Astric } from '@/components/ui/astric/Astric'
import { Button } from '@/components/ui/button'
import { ImSpinner3 } from 'react-icons/im'
import { FormErrorAlert } from '@/components/ui/form-msg/FormErrorAlert'
import { usePasswordForm } from './usePasswordForm'
import { FormSuccessAlert } from '@/components/ui/form-msg/FormSuccessAlert'
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormItem
} from '@/components/ui/form'

type TNewPasswordForm = {
  token: string
  isValidToken: boolean
  msgUnvalidToken: string
}
export const NewPasswordForm: React.FC<TNewPasswordForm> = ({
  token,
  isValidToken,
  msgUnvalidToken
}) => {
  const { form, isSubmitting, onSubmit, errMsg, successMsg } =
    usePasswordForm(token)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                New Password <Astric />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter New Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSuccessAlert msg={successMsg} />
        <FormErrorAlert msg={errMsg || msgUnvalidToken} />
        <Button
          className=" w-full"
          disabled={isSubmitting || !isValidToken}
          type="submit"
        >
          <ImSpinner3
            className={cn('mr-2 h-4 w-4 animate-spin hidden', {
              block: isSubmitting
            })}
          />
          Update password
        </Button>
      </form>
    </Form>
  )
}
