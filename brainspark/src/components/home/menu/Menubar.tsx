import { Link } from "react-router-dom"
 
import MenuCreateNewIdea from './MenuItemCreateNewIdea';
import MenuItemFilter from './MenuItemFilter'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

export default function MenuFilterBar() {
    return (
        <div className='relative'>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Criar uma nova&nbsp;
                            <span className='text-brainspark font-semibold tracking-wide'>Ideia</span>
                             </NavigationMenuTrigger>
                        <MenuCreateNewIdea />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Filtrar busca</NavigationMenuTrigger>                        
                        <MenuItemFilter />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/brainspark/docs-collection">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Ir para biblioteca 
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}