import React from 'react';
import BaseComponent from '../components/BaseComponent';
import { Editor } from './components/Editor';

const DocumentEditor = () => {
  return (
    <BaseComponent className="p-4">
      <main className="p-4">
        <Editor />
      </main>
    </BaseComponent>
  );
};

export default DocumentEditor;
