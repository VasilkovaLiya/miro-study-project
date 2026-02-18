import {rqClient} from "@/shared/api/instance";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";
function LoginPage() {
  //const loginMutation = rqClient.useMutation('post', '/auth/login')
  
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"     
     form={     
      <LoginForm />
      }
       footerText={
        <>Нет аккаунта? 
        <Link className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary"
        to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
     }
      >
    </AuthLayout>
  );
}

export const Component = LoginPage;
