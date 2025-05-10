import React, { useState } from 'react';

interface HeaderProps {
  title: string;
  setTitle: (title: string) => void;
}

export default function Header({ title, setTitle }: HeaderProps) {
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const toggleTitleEdit = () => setIsTitleEditing(!isTitleEditing);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-gray-50 border-b">
      <div
        onClick={toggleTitleEdit}
        className="text-2xl font-semibold cursor-pointer w-full max-w-5xl pl-[150px]"
      >
        {isTitleEditing ? (
          <input
            value={title}
            onChange={handleTitleChange}
            onBlur={toggleTitleEdit}
            autoFocus
            className="w-full bg-transparent border-none focus:outline-none text-2xl" 
          />
        ) : (
          <h1 className="text-2xl">{title}</h1>
        )}
      </div>
    </div>
  );
}
