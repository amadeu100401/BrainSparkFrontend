import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Switch from "react-switch";
import { Button } from "@/components/ui/button";
import { loginUser } from "../../features/Login";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../../components/login/VerificationModal";
import Logo from "@/components/login/Logo";

export default function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);

    const handleSwitchChange = (checked: boolean) => {
        setRememberMe(checked);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const result = await loginUser(email, password, rememberMe);

        if (result.success) {
            navigate("/brainspark/home");
            setIsLoading(false);
        } else {
            setError(result.message);
            if (result.code === "001") {
                setIsVerifying(false);
                setEmail("");
                setPassword("");
            }
            setIsLoading(false);
        }
    }

    return (
        <div className = "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 select-none">
            {/* background blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="blob absolute top-20 left-20 w-64 h-64"></div>
                <div className="blob absolute bottom-20 right-20 w-96 h-96"></div>
                <div className="blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">

                {/* Logo */}
                <Logo subtitle="Entre com sua conta" />

                {/* Login card */}
                <Card className="shadow-2xl border-0">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center text-gray-900">
                            Bem-vindo de volta!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
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

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                        ) : (
                                        <Eye className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Remeber me and forgot password */}
                            <div className="flex items-center justify-between mt-4 pb-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        onChange={handleSwitchChange}
                                        checked={rememberMe}
                                        offColor="#888"
                                        onColor="#8242ec"
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={20}
                                        width={40}
                                    />
                                    <Label htmlFor="remember" className={`text-sm text-gray-500 ${rememberMe ? "text-gray-700" : ""}`}>
                                        Lembrar-me
                                    </Label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
                            >
                                {isLoading ? "Entrando..." : "Entrar"}
                            </Button>
                        </form>

                        {/* TODO: Add social login */}
                    </CardContent>
                </Card>
            </div>

            <VerificationModal
                isOpen={!isVerifying}
                isResendEmail={!isVerifying}
                onSuccess={() => {
                    setIsVerifying(false);
                }}
                onClose={() => setIsVerifying(true)}
            />
        </div>
    )
}