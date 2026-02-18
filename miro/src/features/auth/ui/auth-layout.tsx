import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shared/ui/kit/card";


export function AuthLayout({ form, title, description, footerText }: { 
    form: React.ReactNode,
    title: React.ReactNode,
    description: React.ReactNode,
    footerText: React.ReactNode,
}) {
    return (
        <main className="grow flex pt-[200px] justify-center">
        <Card className="w-full h-max max-w-[400px] text-center p-4">
         <CardHeader>
           <CardTitle>{title}</CardTitle>
         </CardHeader>
         <CardDescription>
           {description}
         </CardDescription>
         <CardContent>
            {form}       
           </CardContent>
           <CardFooter>
                <p>
                {footerText}
                </p>
           </CardFooter>
       </Card>
       </main>
    )
}