import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации в системе"     
      form={<RegisterForm />}
       footerText={
        <>Уже есть аккаунт? Войти 
        <Link className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary"
        to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
     }
      >
    </AuthLayout>
  );
}

export const Component = RegisterPage;
