import { useState, useEffect } from "react";
import Modal from "../Modal";
import ResendEmail from './ResendVerifyEmailCode';
import httpUtil from "../../utils/HttpUtil"; 
import { useNavigate } from "react-router-dom";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Divider from "@/components/shared/Divider";
import { Button } from "@/components/ui/button";
import { Clock, Mail, RotateCcw } from "lucide-react";

export default function VerificationModal({ isOpen, onClose, onSuccess, isResendEmail = false}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [wasSended, setWasSended] = useState((isResendEmail ? false : true));

  useEffect(() => {
    if (code.length === 5) {
      verifyCode(code);
    }
  }, [code]);

  useEffect(() => {
    setWasSended(!isResendEmail);
  }, [isResendEmail]);

  const verifyCode = async (value) => {
    try {
      const email = sessionStorage.getItem("email");
      
      const payload = {
        email: email,
        code: value,
      };

      await httpUtil({
        url:"/api/v1/auth/validate",
        method:"POST",
        data:payload
      });
      
      setCode("");
      navigate("/welcome/login");
      onClose(true);
      onSuccess();
    
    } catch (err) {
      setError(err.message ||  "Erro na verificação. Tente novamente mais tarde.");
      setCode("");
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      contentClassName="bg-white text-black select-none"
    >
      <div>

        <div>
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-xl font-semibold">Validar email</h3>
        </div>
        
        {!isResendEmail && (
          <div className="text-sm mb-10">
            <p className="text-gray-600">
              Enviamos um código de 5 dígitos para`
            </p>
            <span>{sessionStorage.getItem("email")}</span>
          </div>
        )}

        {isResendEmail && (
          <div className="text-sm mb-10">
            <p className="text-gray-600">
              Por favor, solicite um novo email com  o código
            </p>
          </div>
        )}

        {wasSended && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-center mb-2 font-semibold text-zinc-600">Código de verificação</span>
            <InputOTP
              maxLength={5}
              value={code}
              onChange={(val) => {
                setError("");
                setCode(val.replace(/\D/g, ""));
              }}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup className = "w-full h-full">
                <InputOTPSlot index={0} className="w-12 h-10 text-2xl caret-white"/>
                <InputOTPSlot index={1} className="w-12 h-10 text-2xl caret-white" />
                <InputOTPSlot index={2} className="w-12 h-10 text-2xl caret-white" />
                <InputOTPSlot index={3} className="w-12 h-10 text-2xl caret-white" />
                <InputOTPSlot index={4} className="w-12 h-10 text-2xl caret-white" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        )}
        
        {!isResendEmail && (
          <div className="flex flex-col justify-center items-center mt-4">
            <span className="text-gray-500 text-sm">Não recebeu o código?</span>

            <div className="mt-4">
              <Button className="bg-transparent border-none text-black hover:bg-purple-400">Reenviar código</Button>
            </div>
          </div>
        )}

        {(isResendEmail && !wasSended) && (
          <div>
            <ResendEmail
              onSuccess={() => setWasSended(true)} 
            />
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center text-sm mt-2">{error}</p>
        )}

        <Divider />

        <div className="w-full h-full flex justify-center items-center">
          <div className="w-96 flex text-xs text-gray-600 justify-center">
            <span>
              O código expira em 10 minutos. Verifique sua caixa de spam se não encontrar o email.
            </span>
          </div>
        </div>

      </div>
    </Modal>
  );
}
