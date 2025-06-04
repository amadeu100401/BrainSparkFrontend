import EmptyContent from './EmptyContent';
import { Focus } from '@/features/Focus';
import HistoryContent from './historyContent/HistoryContent';

interface TimerHistoryProps {
    focusHistory: Focus[];
    setFocusHistory: (focusHistory: Focus[]) => void;
}

export default function TimerHistory({ focusHistory, setFocusHistory }: TimerHistoryProps) {
  const handleDelete = (id: string) => {
    setFocusHistory(focusHistory.filter((focus) => focus.id !== id));
  }

  return(
    <div className="bg-white rounded-lg shadow-sm p-0 max-h-[500px] pl-6 pr-6 pb-6 space-y-2 overflow-y-auto relative scrollbar-custom">

        <div className="sticky top-0 bg-white p-2 z-10 h-30">
            <h2 className="text-lg font-semibold">Registros de tempo</h2>
        </div>

        {/* Conteúdo */}
        {focusHistory === undefined || focusHistory.length === 0 ? (
            <EmptyContent />
        ) : (
            focusHistory.map((focus) => (
                <HistoryContent key={focus.id} focusHistory={focus} onDelete={handleDelete} />
            ))
        )}
    </div>
  );
}