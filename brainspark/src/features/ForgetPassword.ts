import httpUtil, { ContextEnum } from "@/utils/HttpUtil";
import { showErrorToast } from "../components/ToastContext";

interface DataProps {
    email: string
}

export default async function ForgetPassword(request: DataProps) {
    try {
        await httpUtil({
            url: ContextEnum.auth + "/forget-password",
            method: "POST",
            data: request
        });

    } catch (error: any) {
        showErrorToast(error.message);
    }
}