import { Button } from "@/components/ui/button";
import { httpRequest } from "../../../utils/HttpRequestsUtil"; 

export default function ResendEmail({ onSuccess }) {

    const handleRedenEmail = async () => {
        const email = sessionStorage.getItem("email");
        const payload = { email };

        const { ok } = await httpRequest(
            "/api/v1/auth/resend-validate-email",
             "POST", 
             payload);
        
        if(ok && onSuccess) {
            onSuccess();
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
        </div>
    );
}