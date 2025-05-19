import ContextDisplayMenu from "./ContextMenu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface UserDocument {
  id: string;
  title: string;
  description?: string;
//   category?: 
  status?: string
  priority?: any
  content: string,
  createdAt: any,
  updatedAt?: string;
}

interface DocumentGalleryProps {
  documents: UserDocument[];
}

export default function DocumentGallery({ documents }: DocumentGalleryProps) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Minha Biblioteca</h2>
      {documents.length === 0 ? (
        <p className="text-gray-500">Nenhum documento encontrado.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {documents.map((doc) => (
                <ContextDisplayMenu>
                        <div
                        key={doc.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 cursor-pointer"
                        >                  
                          <h3 className="text-lg font-semibold">{doc.title}</h3>      
                          <div className="w-full h-40 bg-zinc-200 rounded-lg flex items-center justify-center text-zinc-500 text-sm mb-3">
                          sem imagem
                          </div>                        
                        {doc.description && (
                            <p className="text-sm text-zinc-600 mt-1 line-clamp-2">
                            {doc.description}
                            </p>
                        )}
                        {doc.updatedAt && (
                            <p className="text-xs text-zinc-400 mt-2">Atualizado em
                            {format(new Date(doc.updatedAt), " dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                            </p>
                        )}
                        </div>
                </ContextDisplayMenu>
            ))}
        </div>
      )}
    </div>
  );
}
