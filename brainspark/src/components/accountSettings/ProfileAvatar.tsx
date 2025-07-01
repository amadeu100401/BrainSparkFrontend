import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { toast } from "sonner"
import { Camera, Upload, Trash2 } from "lucide-react"
import { useRef, useState } from "react"

interface AvatarProfileProps {
    currentPicture: string | null;
    onPictureUpdate: (file: File) => void;
}

export default function AvatarProfile({ currentPicture, onPictureUpdate }: AvatarProfileProps) {

    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file) return;

        // Validate file type
        if(!file.type.startsWith('image/')) {
            toast("Arquivo inválido", {
                description: "Por favor, selecione uma imagem válida.",
                action: {
                    label: "Ok",
                    onClick: () => console.log("")
                }
            })

            return;
        }

        // Validate file size
        if(file.size > 5 * 1024 * 1024) {
            toast("Arquivo muito grande", {
                description: "A imagem deve ter no máximo 5MB.",
                action: {
                    label: "Ok",
                    onClick: () => console.log("")
                }
            })

            return;
        }

        onPictureUpdate(file);
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleRemovePicture = async () => {
        console.warn("Fuck")
    }

    return(
        <div className="p-5 rounded-lg shadow-sm border bg-white">
            <div>
                <header>
                    <h2 className="font-semibold text-xl">Foto de perfil</h2>
                    <span className="text-gray-500 text-sm">
                        Altere sua foto de perfil. Recomendamos uma imagem quadrada de pelo menos 200x200 pixels
                    </span>
                </header>

                <div className="pt-5 flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={currentPicture || undefined} alt="Foto de"/>
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                            <Camera className="w-8 h-8"/>
                        </AvatarFallback>
                    </Avatar>

                    {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <Button 
                                type="button"
                                size="sm"
                                variant="outline" 
                                className="flex items-center gap-2"
                                onClick={handleUploadClick}
                                disabled={true}
                            >

                                <Upload className="text-zinc-800 w-4 h-4"/>
                                {currentPicture ? "Alterar foto" : "Adicionar foto"}
                            </Button>

                            {currentPicture && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRemovePicture}
                                    // disabled={isUploading}
                                    disabled={true}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                >
                                <Trash2 className="w-4 h-4" />
                                Remover
                                </Button>
                            )}
                        </div>
                        
                        <p className="text-xs text-gray-500">
                            JPG, PNG ou GIF. Máximo 5MB. Recomendado: 200x200px.
                        </p>
                    </div>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    )
}