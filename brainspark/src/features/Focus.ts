import httpRequest, { ContextEnum } from "@/utils/HttpUtil";
import { showErrorToast, showSuccessToast } from "@/components/ToastContext";
import { UUID } from "node:crypto";

export type FocusProject = {
    id: string;
    name: string;
}

export type FocusTags = {
    id: string;
    name: string;
    color: string;
}

export type Focus = {
    id: string;
    title: string;
    focusTime: number;
    currentProject: FocusProject;
    tagResponse: FocusTags[];
    startDate: Date;
    stopwatch: number;
}

type resumeProjectList = {
    name: string;
    time: number;
}

export type GetFocusTimeResumeResponse = {
    totalTime: number;
    projectList: resumeProjectList[];
}

export type formatTimeResume = {
    hours: number;
    minutes: number;
    seconds: number;
}

interface FormatTimerProps {
    totalSeconds: number
}

interface formatStopwatchResult {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

export function FormatTimer( number: FormatTimerProps ): formatStopwatchResult {
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

export function FormatTimeResume(time: number): formatTimeResume {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

interface SaveFocusTimeProps {
    time: number,
    title?: string,
    currentProject?: string,
    tagIdList?: string[],
    startDate?: Date;
    stopwatch?: number
}

export async function SaveFocusTime(request: SaveFocusTimeProps) : Promise<Focus | null> {
    try {
        const currentTime = new Date();

        request.startDate = currentTime;
        request.stopwatch = request.time;

        var response = await httpRequest({
            url: ContextEnum.focus + "/save",
            method: "POST",
            data: request
        });

        showSuccessToast("Focus salvo com sucesso")
        return response;
    } catch (error: any) {
        showErrorToast(error.message);
        return null;
    }
} 

interface GetProjectsResponse {
    focusHistory: Focus[];
    currentProjects: FocusProject[];
    focusTags: FocusTags[];
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

export async function SaveFocusProject(project: FocusProject): Promise<UUID | undefined> {
    try {
        var response = await httpRequest({
            url: ContextEnum.focus + "/users-projects",
            method: "POST",
            data: project
        });

        return response;
    } catch (error: any) {
        showErrorToast("Erro ao salvar projeto. Tente novamente mais tarde.");
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
        showErrorToast("Erro ao deletar projeto. Tente novamente mais tarde.");
        return false;
    }
}

interface SaveFocusTagProps {
    name: string;
    color: string;
}

export async function SaveFocusTag(tag: SaveFocusTagProps): Promise<FocusTags | undefined> {
    try {
        var response = await httpRequest({
            url: `${ContextEnum.focus}/users-tag`,
            method: "POST",
            data: tag
        });

        return response;
    } catch (error: any) {
        showErrorToast("Erro ao salvar tag. Tente novamente mais tarde.");
        return undefined;
    }
}

export async function GetFocusTimeResume() : Promise<GetFocusTimeResumeResponse> {
    try {
        const response = await httpRequest({
            url: `${ContextEnum.focus}/project-resume`,
            method: "GET"
        });

        return response;
    } catch (error: any) {
        showErrorToast("Não foi possível obter o resumo do tempo");
        return {
            totalTime: 0,
            projectList: []
        };
    }
}

export async function DeleteTag(tagId: string): Promise<boolean> {
    try {
        await httpRequest({
            url: `${ContextEnum.focus}/focus-tag/${tagId}`,
            method: "DELETE"
        });
        return true;
    } catch (error: any) {
        showErrorToast("Erro ao deletar tag. Tente novamente mais tarde.");
        return false;
    }
}

export async function DeleteFocus(focusId: string) {
    try {
        await httpRequest({
            url: `${ContextEnum.focus}/${focusId}`,
            method: "DELETE"
        });
    } catch (error: any) {
        showErrorToast("Erro ao deletar focus. Tente novamente mais tarde.");
        return false;
    }
}
