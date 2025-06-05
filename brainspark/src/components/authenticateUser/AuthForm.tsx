import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { DialogContentCustom } from "@/components/ui/CustomDialogContent";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  isAuthenticated: boolean;
  onLogin: (password: string) => void;
}

export default function AuthForm({ isAuthenticated, onLogin }: AuthFormProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) setOpen(true);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(password);
    setPassword("");
    setOpen(false);
  };

  const goToLoginPage = () => {
    navigate("/welcome/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogContentCustom
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>O seu login expirou</DialogTitle>
            <DialogDescription>
              Por favor, insira sua senha para acessar o sistema.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-slate-100 text-black hover:bg-slate-300 mt-4"
              >
                Entrar
                <LockIcon className="w-4 h-4 ml-2" />
              </Button>

              <Button
                type="button"
                onClick={goToLoginPage}
                className="w-full bg-zinc-600 text-white hover:bg-zinc-700 mt-4"
              >
                Tela de login
              </Button>
            </div>
          </form>
        </DialogContentCustom>
    </Dialog>
  );
}
