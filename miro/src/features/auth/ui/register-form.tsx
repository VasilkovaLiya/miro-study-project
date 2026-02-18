import { FormField, Form, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../model/use-register";
const registerSchema = z.
  object({
      email: z.email({message: 'Неверный email'}),
      password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
      confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Пароли не совпадают',
  });
export function RegisterForm() {
    
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const {register, isPending, errorMessage} = useRegister();
    const onSubmit = form.handleSubmit((data) => {
      register(data);
    });
    return (
        <Form {...form}>    
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Мы не передаём ваш email третьим лицам.
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
              <FormLabel>Пароль</FormLabel>

              <FormControl>
                <Input type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Мы не передаём ваш пароль третьим лицам.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>

              <FormControl>
                <Input type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Повторите пароль для подтверждения.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
           {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
        <Button disabled={isPending} type="submit">Войти</Button>
        </form>
    </Form>
    )
}

