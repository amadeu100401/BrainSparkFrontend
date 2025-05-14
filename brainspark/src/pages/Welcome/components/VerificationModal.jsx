import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import ResendEmail from './ResendVarifyEmailCode';
import httpUtil from "../../../utils/HttpUtil"; 
import { useNavigate } from "react-router-dom";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
      const payload = { email };

      const response = await httpUtil({
        url:"/api/v1/auth/validate",
        method:"POST",
        data:payload
      });

      sessionStorage.setItem("email", response.email);

      onClose();
      onSuccess();
      navigate("/welcome/login");
    
    } catch (err) {
      setError("Erro na verificação. Tente novamente mais tarde.");
      setCode("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl font-semibold text-center">Verifique seu email</h3>
      <p className="text-sm text-center text-gray-600 mb-4">
        {!isResendEmail ? "Digite o código de 5 dígitos enviado para o seu email." 
          : "Por favor, solicite um novo email com  o código"}
      </p>

      {/* Alinhamento central com espaçamento entre os slots */}
      {(wasSended) && (
        <div className="flex justify-center mb-2">
          <InputOTP
            maxLength={5}
            value={code}
            onChange={(val) => {
              setError("");
              setCode(val.replace(/\D/g, ""));
            }}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            className="caret-white"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="caret-white"/>
              <InputOTPSlot index={1} className="caret-white"/>
              <InputOTPSlot index={2} className="caret-white"/>
              <InputOTPSlot index={3} className="caret-white"/>
              <InputOTPSlot index={4} className="caret-white"/>
            </InputOTPGroup>
          </InputOTP>
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
    </Modal>
  );
}
