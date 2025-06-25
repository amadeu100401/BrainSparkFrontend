import { TriangleAlert, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function DeleteAccount() {
    return (
        <div className="p-5 rounded-lg bg-red-100 border border-red-300 shadow-sm">
            <div className="flex items-center gap-2">
                <TriangleAlert className="text-red-500 w-5 h-5" />
                <h2 className="text-red-900 text-xl font-semibold">
                    Zona de Perigo
                </h2>
            </div>

            <p className="text-sm text-red-700 mt-2">
                Esta ação é <strong className="font-semibold">irreversível</strong>. Todos os seus dados serão 
                <strong className="font-semibold"> permanentemente excluídos</strong>. 
                Tenha certeza antes de prosseguir.
            </p>

            <div className="pt-6">
                <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Excluir conta permanentemente
                </Button>
            </div>
        </div>
    );
}
