'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Astric } from '@/components/ui/astric/Astric'
import { useSettingsForm } from './useSettingsForm'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { UserRole } from '@prisma/client'
import { FormErrorAlert } from '@/components/ui/form-msg/FormErrorAlert'
import { CredentialsGate } from './CredentialsGate'
import { FormSuccessAlert } from '@/components/ui/form-msg/FormSuccessAlert'

export const SettingsForm: React.FC = () => {
  const { onSubmit, errMsg, successMsg, isSubmitting, form } = useSettingsForm()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <Astric />
              </FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CredentialsGate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <Astric />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CredentialsGate>
        <CredentialsGate>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Current password <Astric />
                </FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPAssword"
            render={({ field }) => (
              <FormItem className=" justify-between">
                <FormLabel>
                  New Password <Astric />
                </FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CredentialsGate>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Role <Astric />
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.USER}>User</SelectItem>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CredentialsGate>
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className=" flex items-center flex-row rounded-lg border p-3 shadow-sm justify-between">
                <div className=" space-y-0.5">
                  <FormLabel>Two Factor Authinication</FormLabel>
                  <FormDescription>
                    Enable Two factor Authinication for your account
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    disabled={isSubmitting}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CredentialsGate>
        <FormSuccessAlert msg={successMsg} />
        <FormErrorAlert msg={errMsg} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
