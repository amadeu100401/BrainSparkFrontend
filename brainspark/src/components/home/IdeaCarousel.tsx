import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type IdeaCarouselProps = {
  ideas: Array<{
    id: string | number;
    title: string;
    description?: string;
    updatedAt: string;
  }>;
};

export function IdeaCarousel({ ideas }: IdeaCarouselProps) {
  const navigate = useNavigate();

  const handleNewDoc = () => {
    navigate("/brainspark/idea");
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Carousel className="w-full">
        <CarouselContent>
          {ideas.map((idea) => (
            <CarouselItem key={idea.id} className="basis-full flex justify-center">
              <Card
                className="w-64 h-64 shadow-md cursor-pointer transition-transform active:scale-[.98] 
                duration-150 ease-in-out hover:shadow-lg"
              >
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{idea.title}</h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {idea.description || "Sem descrição."}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    {format(new Date(idea.updatedAt), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}

          <CarouselItem className="basis-full flex justify-center">
            <div
              className="w-64 h-64 border-2 border-dashed border-zinc-500 rounded-lg p-4 flex 
              flex-col justify-center items-center shadow-md cursor-pointer 
              transition-transform duration-150 active:scale-[.98] ease-in-out"
              onClick={handleNewDoc}
            >
              <svg
                className="h-10 w-10 text-zinc-600 mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-zinc-600 font-semibold">Novo Documento</p>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
