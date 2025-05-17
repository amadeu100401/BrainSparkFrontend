import BaseComponent from '../../components/home/ContentComponentBase';
import { Editor } from '../../components/IdeaDocument/Editor';

export default function DocumentEditor() {
  return (
    <BaseComponent className="p-4">
      <main className="p-4">
        <Editor />
      </main>
    </BaseComponent>
  );
};