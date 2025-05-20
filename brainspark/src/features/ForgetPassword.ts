import httpUtil, { ContextEnum } from "@/utils/HttpUtil";
import { showErrorToast } from "../components/ToastContext";

interface DataProps {
    email: string
}

export default async function ForgetPassword(request: DataProps): Promise<boolean> {
    try {
        await httpUtil({
            url: ContextEnum.auth + "/forget-password",
            method: "POST",
            data: request
        });
        return true;
    } catch (error: any) {
        showErrorToast(error.message);
        return false;
    }
}