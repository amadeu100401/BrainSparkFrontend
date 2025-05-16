import React from 'react';
import LoadingComponent from './home/LoadingComponent';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Spinner prata com animação */}
      <LoadingComponent />
    </div>
  );
};

export default Loading;
