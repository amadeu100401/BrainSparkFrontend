import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import BasicAuthComponent from '@/components/shared/BasicAuthComponent';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/Logo";
import ForgetPasswordSub from "../../features/ForgetPassword";
import { useState } from "react";
import { toast } from "sonner"

export default function ForgetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const isSucess = await ForgetPasswordSub({ email });

        if (isSucess) {
            toast(
                "A solicitação foi enviada", {
                    description: "A solicitação foi enviada com sucesso",
                    action: {
                        label: "Ir para Login",
                        onClick: () => navigate("/welcome/login")
                    }
                }
            );
        }

        setIsLoading(false);
    }

    return (
        <BasicAuthComponent> 
            {/* background blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="blob absolute top-20 left-20 w-64 h-64"></div>
                <div className="blob absolute bottom-20 right-20 w-96 h-96"></div>
                <div className="blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80"></div>
            </div>

            <div className='relative z-10 w-full max-w-md'>
                <Logo subtitle="Esqueci a senha" />

                <Card className="shadow-2xl border-0">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center text-gray-900">
                            Esqueceu a senha?
                        </CardTitle>
                       <div className="flex items-center justify-center">
                        <span className="text-sm font-thin text-center text-gray-600">
                                Não tem problema. Informe seu email para recuperar sua conta.
                            </span>
                       </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                {/* <Label htmlFor="email">Email</Label> */}
                                <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Digite seu email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11"
                                />
                            </div>
                            
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    {isLoading ? "Enviando..." : "Enviar"}
                                </Button>
                            </div>
                        </form>
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                <Link
                                to="/welcome/login"
                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                Voltar ao login
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </BasicAuthComponent>
    );
}