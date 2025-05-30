import { AlarmClock, Play, Pause, History, ArrowDownToLine  } from 'lucide-react';
import TimeBlock from './TimeBlock';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { FormatTimer, SaveFocusTime } from '@/features/Focus';
import AddNewTag from './AddNewTag';
import { useFocus } from '@/contexts/FocusContext';
import { X } from "lucide-react";
import { UUID } from 'node:crypto';
import { focusTags } from '@/features/Focus';

export default function Stopwatch({ focusTags }: { focusTags: focusTags[] }) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const { selectedProject, setSelectedProject } = useFocus();
  const [selectedTag, setSelectedTag] = useState<focusTags | null>(null);
  const [project, setProject] = useState(selectedProject?.name || "");
  const [title, setTitle] = useState(selectedProject?.name || "");
  var hasCurrentTime = timeInSeconds > 0 ? true : false;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => prev + 1);
      }, 1000);
    }

    if(selectedProject?.name) {
      setProject(selectedProject.name);
    }

    return () => clearInterval(interval);
  }, [isRunning, selectedProject]);

  const handleReset = () => {
        setIsRunning(false);
        setTimeInSeconds(0);
  };

  const timeBlockContent = FormatTimer({totalSeconds: timeInSeconds});

  const handleSubimit = async () => {
    const isSucess = await SaveFocusTime({
        time: timeInSeconds,
        title: title,
        currentProject: selectedProject?.id,
        tagId: selectedTag?.id
    });

    if (isSucess) {
        setIsRunning(false);
        setTimeInSeconds(0);
        setTitle("");
        setSelectedTag(null);
    }
  }

  return (
    <div className="bg-white rounded-xl space-y-4 select-none">
      <h2 className="text-2xl mb-4 flex items-center gap-2">
        <AlarmClock /> Cronômetro
      </h2>

      <div className='flex justify-center gap-6 text-4xl font-mono'>
        <TimeBlock label='Dias' value={timeBlockContent.days} />
        <TimeBlock label='Horas' value={timeBlockContent.hours} /> :
        <TimeBlock label='Minutos' value={timeBlockContent.minutes} /> :
        <TimeBlock label='Segundos' value={timeBlockContent.seconds} />
      </div>

      <Input 
        placeholder="No que você está trabalhando hoje?"
        value={title}
        onChange={(e) => setTitle(e.target.value) }
      />

      {/* Linha com tag e botões de controle em lados opostos */}
      <div className="flex justify-between items-center">

        {/* Tag e projeto à esquerda */}
        <div className="flex items-center gap-4">
          <AddNewTag 
            focusTags={focusTags} 
            onTagSelect={setSelectedTag}
          />

          {project && (
            <span className="flex items-center gap-1 text-sm text-gray-700">
              Projeto: <strong>{project}</strong>
              <X className="w-4 h-4 ml-1 cursor-pointer text-transparent hover:text-red-500" onClick={() => setProject("")}/>
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
