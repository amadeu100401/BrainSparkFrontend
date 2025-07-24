import BaseComponent from "@/components/home/ContentComponentBase";
import GoalsManagement from "@/components/studyManagement/GoalsAssistents";
import GoalsStatus from "@/components/studyManagement/GoalsStatus";
import { Target } from "lucide-react";

export default function StudyManagement() {
    return (
        <BaseComponent className="p-6">
            <div className="max-w-7x1 mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Target className="h-8 w-8 text-blue-600" />
                        Gestão de Estudos
                    </h1>
                    <p className="text-gray-600">
                        Organize seus objetivos de estudo e acompanhe seu progresso
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <GoalsManagement />
                <GoalsStatus />
            </div>
            <div className="h-10" />
        </BaseComponent>
    );
}