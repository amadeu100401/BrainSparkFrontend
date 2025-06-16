import BasicAuthComponent from '@/components/shared/BasicAuthComponent';
import Logo from "@/components/shared/Logo";
import PasswordInput from "@/components/shared/PasswordInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signup } from "@/features/SignUp";
import DesktopDatePickerCustom from "@/components/shared/DesktopDatePicker";
import VerificationModal from "../../components/login/VerificationModal";
import Divider from "@/components/shared/Divider";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;

        setError("");
        setPassword(newPassword);
    }

    const handleDateChange = (date: Date) => {
        setBirthDate(date);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload = {
                name: name,
                email: email,
                password: password,
                birthDate: birthDate
            }

            await signup(payload);
            setIsVerifying(true);
            
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
            clearForm();
        }
    }

    const clearForm = () => {
        setEmail("");
        setName("");
        setPassword("");
        setBirthDate(new Date());
    }

    return (
        <BasicAuthComponent>
            {/* background blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="blob absolute top-20 left-20 w-64 h-64"></div>
                <div className="blob absolute bottom-20 right-20 w-96 h-96"></div>
                <div className="blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <Logo subtitle="Crie sua conta" />

                <Card className="shadow-2xl border-0">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center text-gray-900">
                            Comece sua jornada
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Digite seu nome" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Digite seu email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Data de nascimento</Label>
                                <DesktopDatePickerCustom isBirthDate = {true} onDateChange={handleDateChange}/>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <PasswordInput 
                                    password={password} 
                                    setPassword={setPassword} 
                                    handlePasswordChange={handlePasswordChange} 
                                />
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start space-x-2 mt-4">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="bg-white mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                    Eu concordo com os{" "}
                                    <Link to="/terms" className="text-blue-600 hover:text-blue-800 hover:underline">
                                        Termos de Uso
                                    </Link>{" "}
                                    e{" "}
                                    <Link to="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline">
                                        Política de Privacidade
                                    </Link>
                                </Label>
                            </div>

                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                                </Button>
                            </div>

                        </form>

                        {/* Divider */}
                        <Divider orInDivide={true}/>

                        {/* TODO: Add social login */}

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Já tem uma conta?{" "}
                                <Link
                                to="/welcome/login"
                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                Fazer login
                                </Link>
                            </p>
                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* MODAL DE VERIFICAÇÃO */}
            <VerificationModal
                isOpen={isVerifying}
                onClose={() => {
                    setIsVerifying(false);
                }}
                onSuccess={() => {
                    setIsVerifying(false);
                    navigate("/welcome/login");
                }}
            />
        </BasicAuthComponent>
    )
}