import { Button } from "@/components/ui/button";
import httpUtil from "../../utils/HttpUtil";
import ErrorToast from "@/components/ErrorToast";
import { useState } from "react";

interface ResendEmailProps {
  onSuccess: () => void;
}

export default function ResendEmail({ onSuccess }: ResendEmailProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleResendEmail = async () => {
    const email = sessionStorage.getItem("email");
    const payload = { email };

    try {
      await httpUtil({
        url: "/api/v1/auth/resend-validate-email",
        method: "POST",
        data: payload,
      });

      onSuccess();
    } catch (error: any) {
      setShowToast(true);
      setErrorMessage(
        error?.response?.data?.message || error.message || "Erro ao reenviar email"
      );
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <Button
        onClick={handleResendEmail}
        type="button"
        className="bg-yellow-500 
                   hover:bg-yellow-400 
                   text-base
                   font-bold
                   px-6
                   py-2
                   rounded-md
                   transition 
                   hover:shadow-md"
      >
        Solicitar código
      </Button>

      {showToast && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
