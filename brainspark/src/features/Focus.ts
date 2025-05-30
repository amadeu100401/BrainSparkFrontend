import httpRequest, { ContextEnum } from "@/utils/HttpUtil";
import { showErrorToast, showSuccessToast } from "@/components/ToastContext";
import { UUID } from "node:crypto";

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
    title?: string,
    currentProject?: string,
    tagId?: string,
    startDate?: Date;
    stopwatch?: number
}

export async function SaveFocusTime(request: SaveFocusTimeProps) : Promise<boolean> {
    try {
        const currentTime = new Date();

        console.log(request);

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

export type currentProject = {
    id: string;
    name: string;
}

export type focusTags = {
    id: string;
    name: string;
    color: string;
}

export type Focus = {
    id: string;
    focusTime: number;
    currentProject: currentProject;
    focusTagResponse: focusTags;
}

interface GetProjectsResponse {
    focusHistory: Focus[];
    currentProjects: currentProject[];
    focusTags: focusTags[];
}

export async function GetProjects() : Promise<GetProjectsResponse> {
    try {
        const response = await httpRequest({
            url: ContextEnum.focus + "/focus",
            method: "GET"
        });

        return response ?? {
            focusHistory: [],
            currentProjects: [],
            focusTags: []
          };

    } catch (error: any) {
        if (error.response.status !== 404) {
            showErrorToast(error.message);
        }

        return {
            focusHistory: [],
            currentProjects: [],
            focusTags: []
        };
    }
}

export async function SaveFocusProject(project: currentProject): Promise<UUID | undefined> {
    try {
        var response = await httpRequest({
            url: ContextEnum.focus + "/users-projects",
            method: "POST",
            data: project
        });

        return response;
    } catch (error: any) {
        showErrorToast(error.message);
    }
}

export async function DeleteFocusProject(projectId: string) {
    try {
        await httpRequest({
            url: `${ContextEnum.focus}/users-projects/${projectId}`,
            method: "DELETE"
        });
        return true;
    } catch (error: any) {
        showErrorToast(error.message);
        return false;
    }
}