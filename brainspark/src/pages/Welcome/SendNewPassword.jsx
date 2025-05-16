import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputGroup from "../../components/InputGroup"; 
import { FaLock } from 'react-icons/fa'; 
import { httpRequest } from "../../utils/HttpRequestsUtil"; 
import PasswordResetSuccess from "../../components/login/PasswordResetSuccessModal";
import ErrorToast from "../../components/ErrorToast";
import { Button } from "@/components/ui/button";

export default function SendNewPassword() {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [newPasswordForm, setNewPasswordForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    var token = queryParams.get('recovery_code');

    if (!token) {
      navigate("/welcome");
    }

    sessionStorage.setItem("jwt", token);
  }, [location, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPasswordForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSendNewPassword = async (e) => {
    e.preventDefault();

    if (newPasswordForm.password !== newPasswordForm.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      setError("");
      var data = {password: newPasswordForm.password, jwt: sessionStorage.getItem("jwt")};
      const response = await httpRequest("/api/v1/auth/send-new-password", "POST", data);
      setShowSuccessModal(true);
    } catch (err) {
      setShowToast(true);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Redefinição de senha</h2>
      <form onSubmit={handleSendNewPassword} className="space-y-4">
        <InputGroup
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Nova Senha"
          value={newPasswordForm.password}
          onChange={handleInputChange}
          icon={<FaLock />}
          show={showPassword}
          toggleShow={() => setShowPassword((prev) => !prev)}
          required
        />
        <InputGroup
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirmar Senha"
          value={newPasswordForm.confirmPassword}
          onChange={handleInputChange}
          icon={<FaLock />}
          show={showConfirmPassword}
          toggleShow={() => setShowConfirmPassword((prev) => !prev)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center w-full">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-40 rounded font-semibold mt-8 mx-auto"
          >
            Enviar
          </Button>
        </div>
      </form>
      <PasswordResetSuccess
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      {showToast && (
      <ErrorToast
          message="Erro ao realizar a redefinição de senha."
          onClose={() => setShowToast(false)}
      />
      )}
    </div>
  );
}
