import { AlarmClock } from "lucide-react";

export default function EmptyContent() {
    return(
        <div className="text-center text-gray-500 space-y-1">
        <div className="flex justify-center mb-2">
          <AlarmClock className="w-6 h-6" />
        </div>

        <p>Ainda não há registros de tempo.</p>
        <p className="text-sm">Inicie o cronômetro para começar a acompanhar seu tempo!</p>
      </div>
    )
}