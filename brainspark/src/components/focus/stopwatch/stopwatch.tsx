import { AlarmClock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';
import { DeleteTag, FormatTimer, SaveFocusTag, SaveFocusTime } from '@/features/Focus';
import { useFocus } from '@/contexts/FocusContext';
import { X } from "lucide-react";
import { FocusTags, Focus } from '@/features/Focus';
import TimerClock from './Timer/Timer';
import SaveFocusButton from './SaveFocusButton';
import FocusTag from './Tag/FocusTag';

import { Badge } from "@/components/ui/badge"

interface StopwatchProps {
  initialFocusTags: FocusTags[];
  onCreate: (focus: Focus) => void;
  onDeleteTag: (deletedTagId: string) => void;
}

export default function Stopwatch({ initialFocusTags, onCreate, onDeleteTag }: StopwatchProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const { selectedProject } = useFocus();
  const [selectedTag, setSelectedTag] = useState<FocusTags[] | null>(null);
  const [project, setProject] = useState(selectedProject?.name || "");
  const [title, setTitle] = useState(selectedProject?.name || "");
  const [focusTags, setFocusTags] = useState<FocusTags[]>(initialFocusTags ?? []);

  useEffect(() => {
    setFocusTags(initialFocusTags ?? []);
  }, [initialFocusTags]);

  const hasCurrentTime = timeInSeconds > 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeInSeconds(prev => prev + 1);
      }, 1000);
    }

    if (selectedProject?.name) {
      setProject(selectedProject.name);
    }

    return () => clearInterval(interval);
  }, [isRunning, selectedProject]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
  };

  const timeBlockContent = FormatTimer({ totalSeconds: timeInSeconds });

  const handleSubimit = async () => {
    const newFocus = {
      time: timeInSeconds,
      title: title,
      tagIdList: selectedTag?.map(tag => tag.id)
    };

    console.log(newFocus);

    const response = await SaveFocusTime(newFocus);

    if (response) {
      setIsRunning(false);
      setTimeInSeconds(0);
      setTitle("");
      setSelectedTag(null);
      onCreate(response);
    }
  };

  const handleAddTag = async (tagName: string, tagColor: string) => {
    const newTag = {
      name: tagName,
      color: tagColor,
    };
  
    const response = await SaveFocusTag(newTag);
  
    if (response) {
      const createdTag: FocusTags = {
        id: response.id,
        name: tagName,
        color: tagColor,
      };
  
      setFocusTags(prev => [...prev, createdTag]);
      setSelectedTag(prev => [...(prev || []), createdTag]);
    }
  };

  const handleDeleteTag = async (tag: FocusTags) => {
    const response = await DeleteTag(tag.id);
    if (response) {
      setSelectedTag(prev => prev?.filter(t => t.id !== tag.id) || null);
      setFocusTags(prev => prev.filter(t => t.id !== tag.id));
      onDeleteTag(tag.id);
    }
  };
  
  return (
    <div className="bg-white rounded-xl space-y-4 select-none">
      <h2 className="text-2xl mb-4 flex items-center gap-2">
        <AlarmClock /> Cronômetro
      </h2>

      <TimerClock timeBlockContent={timeBlockContent} />

      <Input
        placeholder="No que você está trabalhando hoje?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex items-center gap-4 h-1">
        {selectedTag && (
          <div className="flex items-center gap-1">
            {selectedTag.map((tag) => (
              <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Linha com tag e botões de controle em lados opostos */}
      <div className="flex justify-between items-center">

        {/* Tag e projeto à esquerda */}
        <div className="flex items-center gap-4">
          <FocusTag
            tags={focusTags}
            selectedTag={selectedTag || []}
            setSelectedTag={setSelectedTag}
            handleDeleteTag={handleDeleteTag}
            handleNewTag={handleAddTag}
          />

          {project && (
            <span className="flex items-center gap-1 text-sm text-gray-700">
              Projeto: <strong>{project}</strong>
              <X
                className="w-4 h-4 ml-1 cursor-pointer text-transparent hover:text-red-500"
                onClick={() => setProject("")}
              />
            </span>
          )}
        </div>

        <SaveFocusButton
          hasCurrentTime={hasCurrentTime}
          handleReset={handleReset}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          handleSubimit={handleSubimit}
        />
      </div>
    </div>
  );
}
