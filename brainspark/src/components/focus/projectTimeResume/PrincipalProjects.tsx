import { GetFocusTimeResumeResponse, FormatTimeResume } from "@/features/Focus";

interface PrincipalProjectsProps {
    timeResume: GetFocusTimeResumeResponse;
}

const formatTime = (time: number) => {
    const timeResume = FormatTimeResume(time);

    if (timeResume.hours > 0) {
        return `${timeResume.hours}h ${timeResume.minutes}min`;
    } else if (timeResume.minutes > 0) {
        return `${timeResume.minutes}min`;
    } else {
        return `${timeResume.seconds}s`;
    }
};

export default function PrincipalProjects({ timeResume }: PrincipalProjectsProps) {
    return (
        <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">Principais projetos</p>
            <ul className="space-y-2 list-disc pl-4 pt-2">
                {timeResume.projectList.map((project) => (
                    formatTime(project.time) !== '0min' && (
                        <li key={project.name} className="text-gray-500">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-900">{project.name}</span>
                            <span className="text-xs text-gray-800 font-bold">{formatTime(project.time)}</span>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}