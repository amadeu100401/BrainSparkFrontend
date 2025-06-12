import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
    required?: boolean;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PasswordInput({ password, setPassword, required = true, handlePasswordChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
            </Label>
            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
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
        </>
    )
}