import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { marked } from 'marked';

const DocumentEditor = () => {
  const [title, setTitle] = useState('Título do Documento');
  const [content, setContent] = useState('# Meu Documento\nDigite o conteúdo em Markdown aqui...');
  const [isEditing, setIsEditing] = useState(true);
  const [isMarkdown, setIsMarkdown] = useState(false);

  useEffect(() => {
    const hasMarkdown = /[#*_`~\-]/.test(content);
    setIsMarkdown(hasMarkdown);
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const toggleEditMode = () => setIsEditing(!isEditing);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header fixo */}
      <div className="fixed top-0 left-0 w-full z-20 bg-gray-50 border-b">
        <Header title={title} setTitle={setTitle} />
        {isMarkdown && (
          <div className="absolute top-4 right-8">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={toggleEditMode}
            >
              {isEditing ? 'Visualizar Markdown' : 'Editar'}
            </button>
          </div>
        )}
      </div>

      {/* Área do documento */}
      <div className="flex-1 pt-[80px] px-4 bg-gray-50 overflow-auto">
        <div
          className="mx-auto w-[90%] h-full rounded-lg shadow-md p-6 bg-white border overflow-auto"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE 10+
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {isEditing ? (
            <textarea
              className="w-full h-full resize-none bg-white border-none outline-none"
              value={content}
              onChange={handleContentChange}
              placeholder="Digite seu documento aqui..."
            />
          ) : (
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
