import BaseComponent from '../../components/home/ContentComponentBase';
import { Editor } from '../../components/IdeaDocument/Editor';

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
