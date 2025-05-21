import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 

export default function CurrentProject() {
    return(
        <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Projeto atual</p>

            {/* <select className="w-full border rounded p-2 text-sm">
              <option>Pessoal</option>
            </select> */}

            <Select>
                <SelectTrigger className="w-full border rounded p-2 text-sm">
                <SelectValue placeholder="Selecione o projeto" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}