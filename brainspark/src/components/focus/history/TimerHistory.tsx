import EmptyContent from './EmptyContent';
import { Focus } from '@/features/Focus';
import HistoryContent from './HistoryContent';

interface TimerHistoryProps {
    focusHistory: Focus[];
}

export default function TimerHistory({ focusHistory }: TimerHistoryProps) {
  return(
    <div className="bg-white rounded-lg shadow-sm p-0 max-h-[550px] pl-6 pr-6 pb-6 overflow-y-auto relative scrollbar-custom">

        <div className="sticky top-0 bg-white p-2 z-10 h-30">
            <h2 className="text-lg font-semibold">Registros de tempo</h2>
        </div>

        {/* Conteúdo */}
        {focusHistory === undefined || focusHistory.length === 0 ? (
            <EmptyContent />
        ) : (
            focusHistory.map((focus) => (
            <HistoryContent key={focus.id} focusHistory={focus} />
            ))
        )}
    </div>
  );
}