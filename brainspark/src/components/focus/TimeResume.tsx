import { AlarmClock } from 'lucide-react';

export default function TimeResume() {
    return(
        <div className="bg-violet-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-violet-800 mb-1 flex items-center gap-2">
              <AlarmClock className="w-4 h-4 mr-1"/> Resumo do tempo
            </h3>

            <p className="text-2xl text-violet-500 font-bold">0min</p>

            <p className="text-xs text-violet-700">Tempo total registrado hoje</p>
        </div>
    );
}