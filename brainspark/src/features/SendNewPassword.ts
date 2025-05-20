import httpUtil, { ContextEnum } from "@/utils/HttpUtil";
import { hasText} from "@/utils/StringUtils";  
import { showErrorToast } from "../components/ToastContext";

interface NewPasswordProps {
    password: string
    jwt: string
}

export default async function SendNewPassword( request: NewPasswordProps ): Promise<boolean> {
    try {
        validateEmail(request);
        await sendRequest(request);
        return true;
    } catch(error: any) {
        showErrorToast(error.message);
        return false;
    }
}

const validateEmail = (request: NewPasswordProps) => {
    if(!hasText(request.password) && !hasText(request.jwt)) {
        throw {
            message: "Todos os campos da requisição devem ser enviados"
        }
    }
}

const sendRequest = async ( request: NewPasswordProps) => {
    await httpUtil({
        url: ContextEnum.auth +  "/send-new-password",
        method: "POST",
        data: request
    });
}