import ComponentBase from '../../components/home/ContentComponentBase'
import Stopwatch from '../../components/focus/stopwatch/stopwatch'
import { AlarmClock } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 

// TODO: Seprar em componentes menores

export default function FocusTimePage() {
  return (
    <ComponentBase className="min-h-screen w-screen bg-gray-50 p-6">
        
      {/* Layout de 2 colunas */}
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        
        {/* Coluna da esquerda (Cronômetro + Registros) */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Stopwatch />
          </div>

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

        </div>

        {/* Coluna da direita (Projeto atual, Resumo e Dicas rápidas) */}
        <div className="w-full lg:w-[280px] flex flex-col gap-4">
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Projeto atual</p>
            <select className="w-full border rounded p-2 text-sm">
              <option>Pessoal</option>
              {/* Outras opções */}
            </select>
          </div>

          <div className="bg-violet-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-violet-800 mb-1 flex items-center gap-2">
              <AlarmClock className="w-4 h-4 mr-1"/> Resumo do tempo
            </h3>

            <p className="text-2xl text-violet-700 font-bold">0min</p>

            <p className="text-xs text-violet-700">Tempo total registrado hoje</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold mb-2">Dicas rápidas</h3>
            <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
              <li>Utilize projetos para organizar seu tempo</li>
              <li>Adicione tags para classificar suas atividades</li>
              <li>Revise seus tempos diariamente para ganhar produtividade</li>
            </ul>
          </div>
        </div>
      </div>
    </ComponentBase>
  );
}
