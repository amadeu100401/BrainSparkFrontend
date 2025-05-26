import { AlarmClock, Play, Pause, History, ArrowDownToLine  } from 'lucide-react';
import TimeBlock from './TimeBlock';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { FormatTimer, SaveFocusTime } from '@/features/StopWatch';
import AddNewTag from './AddNewTag';

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const [tag, setTag] = useState("Estudos");
  const [project, setProject] = useState("Concurso PF");

  var hasCurrentTime = timeInSeconds > 0 ? true : false;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
        setIsRunning(false);
        setTimeInSeconds(0);
  };

  const timeBlockContent = FormatTimer({totalSeconds: timeInSeconds});

  const handleSubimit = async () => {
    const isSucess = await SaveFocusTime({
        time: timeInSeconds,
    });

    if (isSucess) {
        setIsRunning(false);
        setTimeInSeconds(0);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 select-none">
      <h2 className="text-2xl mb-4 flex items-center gap-2">
        <AlarmClock /> Cronômetro
      </h2>

      <div className='flex justify-center gap-6 text-4xl font-mono'>
        <TimeBlock label='Dias' value={timeBlockContent.days} />
        <TimeBlock label='Horas' value={timeBlockContent.hours} /> :
        <TimeBlock label='Minutos' value={timeBlockContent.minutes} /> :
        <TimeBlock label='Segundos' value={timeBlockContent.seconds} />
      </div>

      <Input placeholder="No que você está trabalhando hoje?" />

      {/* Linha com tag e botões de controle em lados opostos */}
      <div className="flex justify-between items-center">

        {/* Tag e projeto à esquerda */}
        <div className="flex items-center gap-4">
          <AddNewTag />

          {tag && (
            <span className="text-sm space-x-4 text-gray-700">
              Tag: <strong>{tag}</strong>
            </span>
          )}

          {project && (
            <span className="text-sm space-x-4 text-gray-700">
              Projeto: <strong>{project}</strong>
            </span>
          )}
        </div>

        {/* Botões de controle à direita */}
        <div className="flex items-center gap-2">
            <Button
                disabled={!hasCurrentTime}
                className="px-4 py-2 rounded bg-transparent text-black hover:bg-violet-400
                border-none focus:ring-0 focus:outline-none ring-0 active:shadow-inner transition duration-100"
                onClick={handleReset}
            >
                <History className="w-4 h-4 mr-1" /> Resetar
            </Button>

            <Button
                className={`px-4 py-2 rounded hover:bg-violet-700 border-none focus:ring-0 focus:outline-none ring-0
                ${isRunning ? 'bg-red-500 hover:bg-red-700' : 'bg-violet-500'}`}
                onClick={() => setIsRunning((prev) => !prev)}
            >
            {isRunning ? (
              <Pause className="w-4 h-4 mr-1" />
            ) : (
              <Play className="w-4 h-4 mr-1" />
            )}
            {isRunning ? 'Pausar' : 'Iniciar'}
          </Button>
          {(!isRunning && hasCurrentTime)&& (
            <Button
                className="px-4 py-2 rounded bg-transparent text-black hover:bg-violet-400
                border-none focus:ring-0 focus:outline-none ring-0 active:shadow-inner transition duration-100"
                onClick={handleSubimit}
            >
                <ArrowDownToLine className="w-4 h-4 mr-1" /> Salvar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
