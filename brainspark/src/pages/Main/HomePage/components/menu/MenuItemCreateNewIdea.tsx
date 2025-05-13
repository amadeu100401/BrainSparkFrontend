import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import CreateNewDoc from '../../../../../assets/createDocIa.jpg'

export default function MenuItem() {
  return (
    <NavigationMenuContent className="bg-zinc-900">
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <li className="row-span-3">
          <NavigationMenuLink asChild>

          <a
            className="group relative flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md"
            href="/"
          >
            {/* Imagem de fundo com zoom suave no hover */}
            <div
              className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url(${CreateNewDoc})` }}
            ></div>

            {/* Gradiente para escurecer o fundo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black opacity-60 rounded-md"></div>

            {/* Conteúdo */}
            <div className="relative z-10">
              <div className="mb-2 mt-4 text-lg font-medium text-white">IDEA-AI</div>
              <p className="text-sm leading-tight text-white/80">
                Crie documentos utilizando o poder da IA
              </p>
            </div>
          </a>

          </NavigationMenuLink>
        </li>
        <ListItem href="/docs" title="Listas de tarefas" className="text-white">
          Organize melhor o seu dia
        </ListItem>
        <ListItem href="/docs/installation" title="Textos simples" className="text-white">
          Para quem gosta do 'Menos é mais'
        </ListItem>
        <ListItem href="/docs/primitives/typography" title="Finanças" className="text-white">
          Organize e gerencie seus gastos
        </ListItem>
      </ul>
    </NavigationMenuContent>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
