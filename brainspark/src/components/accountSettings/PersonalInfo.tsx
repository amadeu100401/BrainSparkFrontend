import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Mail, User, Crown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import { useState, useEffect } from "react";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { UpdateUsersInfo } from '../../features/UsersInfo.ts';

interface PersonalInfoProps {
    name: string,
    email: string,
    birthDate: Date 
}

export default function PersonalInfo({ name, email, birthDate }:PersonalInfoProps) {
    
    const [formData, setFormData] = useState({
        name: name,
        email: email,
        birthDate: birthDate,
        plan: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData({
            name,
            email,
            birthDate,
            plan: "Free"
        })
    }, [name, email, birthDate])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        await UpdateUsersInfo({
          name: formData.name
        });

        setIsLoading(false);
    };

    return(
        <div className="p-5 rounded-lg bg-white border shadow-sm">
            <header>
                <h2 className="font-semibold text-xl">Informações Pessoais</h2>
                <span className="text-gray-500 text-sm">
                        Mantenha suas informações atualizadas para uma melhor experiência.
                </span>
            </header>

            <div className="mt-5">
                <form onSubmit={handleSubmit}>
                    {/* name and email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-y-2">
                            <Label 
                                htmlFor="string" 
                                className="text-sm font-medium text-gray-700"
                            >
                                Nome
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                                <Input 
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label
                                htmlFor="Email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                                <Input 
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    readOnly
                                    disabled={true}
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Data de nascimento
                            </Label>
                            <div className="border rounded-lg shadow-sm">
                                <div className="relative">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                "w-full h-11 justify-start text-left font-normal",
                                                !formData.birthDate && "text-muted-foreground"
                                                )}  
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {formData.birthDate ? (
                                                    format(formData.birthDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                                                ) : (
                                                    <span>Selecione sua data de nascimento</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.birthDate}
                                                onSelect={(date) => setFormData({ ...formData, birthDate: date! })}
                                                disabled={(date: any) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                captionLayout="dropdown"
                                                locale={ptBR}
                                                className="p-3 pointer-events-auto"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="text" className="text-sm font-medium text-gray-700">
                                Plano
                            </Label>
                            <div className="relative">
                                <Crown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                                <Input 
                                    id="email"
                                    type="email"
                                    value={formData.plan}
                                    readOnly
                                    disabled={true}
                                    className="pl-10 h-11"
                                />
                            </div>
                            <span className="text-xs text-gray-500">
                                Para alterar o plano, entre em contato com o suporte.
                            </span>
                        </div>
                    </div>
                </form>

                <div className="pt-5 flex justify-end">
                    <Button
                        type="submit"
                        className="px-8 bg-slate-800"
                        disabled={isLoading}
                    >
                        {isLoading ? "Salvando..." : "Salvar alterações"}
                    </Button>                            
                </div>
            </div>
        </div>
    )
}