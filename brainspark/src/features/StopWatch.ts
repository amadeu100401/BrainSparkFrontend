import Stopwatch from "@/components/focus/stopwatch/stopwatch";
import httpRequest, { ContextEnum } from "@/utils/HttpUtil";
import { showErrorToast, showSuccessToast } from "@/components/ToastContext";

interface FormatTimerProps {
    totalSeconds: number
}

interface result  {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

export function FormatTimer( number: FormatTimerProps ): result {
    const days = Math.floor(number.totalSeconds / (3600 * 24));
    const hours = Math.floor((number.totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((number.totalSeconds % 3600 / 60));
    const seconds = number.totalSeconds % 60;

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}


interface SaveFocusTimeProps {
    time: number,
    projectName?: string,
    projectId?: string,
    startDate?: Date;
    stopwatch?: number
}

export async function SaveFocusTime(request: SaveFocusTimeProps) : Promise<boolean> {
    try {
        const currentTime = new Date();

        request.startDate = currentTime;
        request.stopwatch = request.time;

        await httpRequest({
            url: ContextEnum.focus + "/save",
            method: "POST",
            data: request
        });

        showSuccessToast("Focus salvo com sucesso")
        return true;
    } catch (error: any) {
        showErrorToast(error.message);
        return false;
    }
} 