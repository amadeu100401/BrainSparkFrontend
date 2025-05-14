import { Button } from "@/components/ui/button";
import httpUtil  from "../../../utils/HttpUtil";
import ErrorToast from "@/components/ErrorToast"; 
import { useState } from "react";

export default function ResendEmail({ onSuccess }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleRedenEmail = async () => {
        const email = sessionStorage.getItem("email");
        const payload = { email };

        try{
            const { ok } = await httpUtil({
            url:"/api/v1/auth/resend-validate-email",
            method:"POST", 
            data:payload
            });
            
            if(ok && onSuccess) {
                onSuccess();
            }

        } catch(error: any) {
            setShowToast(true);
            setErrorMessage(error.message);
        }
    }

    return(
        <div className="flex justify-center mt-4">
            <Button
                onClick={handleRedenEmail}
                type="submit"
                className="bg-yellow-500
                           hover:bg-yellow-400 
                           text-1xl
                           hover:text-white/100
                           hover:shadow-md
                           hover:no-underline
                           transaction
                           font-bold
                           px-35"
                >
                Solicitar um novo código
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