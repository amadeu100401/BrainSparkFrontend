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
import RoleSelection from "@/components/login/RoleSelection";
import { LucideIcon, Tag } from 'lucide-react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';

type Role = {
    icon: LucideIcon;
    title: string;
}

export default function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [role, setRole] = useState<Role | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = "Nome é obrigatório.";
        if (!email.trim()) newErrors.email = "Email é obrigatório.";
        if (!password.trim()) newErrors.password = "Senha é obrigatória.";
        if (role?.title.length === 0) newErrors.role = "Selecione ao menos um perfil.";

        return newErrors;
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrors(prev => ({ ...prev, password: "" }));
    }

    const handleDateChange = (date: Date) => {
        setBirthDate(date);
    };

    const handleRoleSelected = (selectedRole: Role) => {
        setRole(selectedRole);
        setErrors(prev => ({ ...prev, role: "" }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({});

        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            setIsLoading(true);
            const payload = { name, email, password, birthDate, role: role?.title || "" };
            await signup(payload);
            setIsVerifying(true);
            clearForm();
        } catch (error: any) {
            setErrors({ general: error.message || "Erro ao cadastrar" });
        } finally {
            setIsLoading(false);
        }
    }

    const clearForm = () => {
        setEmail("");
        setName("");
        setPassword("");
        setBirthDate(new Date());
        setRole(null);
    }

    return (
        <BasicAuthComponent>
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
                            {/* Nome */}
                            <div className="space-y-1">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setErrors(prev => ({ ...prev, name: "" }));
                                    }}
                                    placeholder="Digite seu nome"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors(prev => ({ ...prev, email: "" }));
                                    }}
                                    placeholder="Digite seu email"
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            {/* Data de nascimento */}
                            <div className="space-y-1">
                                <Label htmlFor="birthDate">Data de nascimento</Label>
                                <DesktopDatePickerCustom
                                    isBirthDate={true}
                                    onDateChange={handleDateChange}
                                />
                            </div>

                            {/* Perfil */}
                            <div className="space-y-1 mb-4">
                                <Label htmlFor="role">Perfil</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="w-full">
                                            <Button type="button" className="w-full justify-start border border-gray-300 shadow-sm 
                                            bg-transparent text-gray-900 hover:bg-gray-100">
                                                {role?.icon ? <role.icon className="w-4 h-4 mr-2" /> : <Tag className="w-4 h-4 mr-2" />}
                                                {role?.title || "Selecione seu perfil"}
                                            </Button>
                                        </div>
                                    </PopoverTrigger>
                                    <RoleSelection handleRoleSelected={handleRoleSelected} />
                                </Popover>
                                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                            </div>

                            {/* Senha */}
                            <div className="space-y-1">
                                <PasswordInput
                                    password={password}
                                    setPassword={setPassword}
                                    handlePasswordChange={handlePasswordChange}
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            {/* Termos */}
                            <div className="flex items-start gap-2 mt-4">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                    Eu concordo com os{" "}
                                    <Link to="/terms" className="text-blue-600 hover:underline">Termos de Uso</Link>{" "}
                                    e{" "}
                                    <Link to="/privacy" className="text-blue-600 hover:underline">Política de Privacidade</Link>
                                </Label>
                            </div>

                            {errors.general && <p className="text-sm text-red-500 mt-2">{errors.general}</p>}

                            {/* Submit */}
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
                        <Divider orInDivide={true} />

                        {/* Link para login */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Já tem uma conta?{" "}
                                <Link to="/welcome/login" className="text-blue-600 hover:underline font-medium">
                                    Fazer login
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Modal de verificação */}
            <VerificationModal
                isOpen={isVerifying}
                onClose={() => setIsVerifying(false)}
                onSuccess={() => {
                    setIsVerifying(false);
                    navigate("/welcome/login");
                }}
            />
        </BasicAuthComponent>
    );
}
