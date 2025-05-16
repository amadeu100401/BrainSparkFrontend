import { MenuTextArea } from "./AIOptionMenu";

export function TextAreaAI() {
  return (
    <div className="w-full max-w-xl bg-zinc-700 text-white font-bold rounded-md shadow-md">
      <div className="flex flex-col h-40 relative">
        <textarea
          placeholder="Faça uma pergunta ou encontre algo novo pra explorar"
          className="flex-1 resize-none bg-zinc-700 text-white placeholder:text-zinc-400 placeholder:font-bold p-4 rounded-t-md focus:outline-none"
        />

        <div className="bg-zinc-800 p-2 flex justify-end items-center gap-2 rounded-b-md border-t border-zinc-600">
          <MenuTextArea />
        </div>
      </div>
    </div>
  );
}
