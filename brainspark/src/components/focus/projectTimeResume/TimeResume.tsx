import { Clock  } from 'lucide-react';
import { FormatTimeResume, GetFocusTimeResume, GetFocusTimeResumeResponse } from '@/features/Focus';
import { useEffect, useState } from 'react';
import PrincipalProjects from './PrincipalProjects';

export default function TimeResume() {
    const [timeResume, setTimeResume] = useState<GetFocusTimeResumeResponse>({
        totalTime: 0,
        projectList: []
    });

    useEffect(() => {
        getProjectResume();
    }, []);

    const getProjectResume = async () => {
        const response = await GetFocusTimeResume();
        setTimeResume(response);
    }

    const getTimeFormated = () => {

        if (timeResume.totalTime === 0) {
            return {
                hours: 0,
                minutes: 0
            }
        }

        const timeFormated = FormatTimeResume(timeResume.totalTime);
        return timeFormated;
    }

    const timeFormated = getTimeFormated();

    return(
        <div className="bg-violet-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-violet-800 mb-1 flex items-center gap-2">
              <Clock  className="w-4 h-4 mr-1"/> Resumo do tempo
            </h3>

            <p className="text-2xl text-focusProjectResume font-medium">
                {timeFormated.hours > 0 ? `${timeFormated.hours}h ${timeFormated.minutes}min` : `${timeFormated.minutes}min`}
            </p>

            <p className="text-xs text-gray-400">Tempo total registrado hoje</p>

            {timeResume.projectList && (
                <PrincipalProjects timeResume={timeResume} />
            )}
        </div>
    );
}