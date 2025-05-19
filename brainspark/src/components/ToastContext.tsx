
import { toast } from "../hooks/use-toast"

export function showErrorToast(message: string) {
  toast({
    variant: "destructive",
    title: "Erro",
    description: message,
  })
}

export function showSuccessToast(message: string) {
  toast({
    title: "Sucesso",
    description: message,
    className: "bg-zinc-800 border border-white/10 text-white " 
    + "[&>button]:text-white [&>button]:bg-zinc-800 " + 
    "[&>button]:hover:bg-zinc-700 [&>button]:hover:text-white " + 
    "[&>button]:border-none [&>button]:transition-colors",
  })
}