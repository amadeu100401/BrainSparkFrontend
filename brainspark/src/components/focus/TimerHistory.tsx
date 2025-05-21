import { AlarmClock } from 'lucide-react';

export default function TimerHistory() {
    return(
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-2">Registros de tempo</h2>
            
            <div className="text-center text-gray-500 space-y-1">
              <div className="flex justify-center mb-2">
                <AlarmClock className="w-6 h-6" />
              </div>

              <p>Ainda não há registros de tempo.</p>
              <p className="text-sm">Inicie o cronômetro para começar a acompanhar seu tempo!</p>
            </div>
        </div>
    );
}