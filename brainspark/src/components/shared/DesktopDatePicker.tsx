import { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const months = [
  { label: "Jan", value: "1" },
  { label: "Feb", value: "2" },
  { label: "Mar", value: "3" },
  { label: "Apr", value: "4" },
  { label: "May", value: "5" },
  { label: "Jun", value: "6" },
  { label: "Jul", value: "7" },
  { label: "Aug", value: "8" },
  { label: "Sep", value: "9" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
];

interface DesktopDatePickerCustomProps {
  isBirthDate?: boolean;               // ⬅ torna opcional, default false
  onDateChange?: (date: Date) => void;
  defaultDay?: string;
  defaultMonth?: string;
  defaultYear?: string;
}

export default function DesktopDatePickerCustom({
  isBirthDate = false,
  onDateChange,
  defaultDay = "",
  defaultMonth = "",
  defaultYear = "",
}: DesktopDatePickerCustomProps) {
  // Estados controlados
  const [day, setDay] = useState(defaultDay);
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);

  // Gera lista de anos
  const years = useMemo(() => {
    if (isBirthDate) {
      const currentYear = new Date().getFullYear();
      const startYear = 1980;
      return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
    }
    return Array.from({ length: 50 }, (_, i) => 1980 + i);
  }, [isBirthDate]);

  useEffect(() => {
    if (day && month && year && onDateChange) {
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      onDateChange(date);
    }
  }, [day, month, year, onDateChange]);

  return (
    <div className="flex gap-4 mt-4 items-center justify-center">
      {/* Dia */}
      <div className="w-[80px]">
        <Select value={day} onValueChange={setDay}>
          <SelectTrigger>
            <SelectValue placeholder="Dia" />
          </SelectTrigger>
          <SelectContent position="popper" side="bottom" className="z-50" avoidCollisions={false}>
            {days.map((d) => (
              <SelectItem key={d} value={String(d)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mês */}
      <div className="w-[100px]">
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger>
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent position="popper" side="bottom" className="z-50" avoidCollisions={false}>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ano */}
      <div className="w-[100px]">
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent position="popper" side="bottom" className="z-50" avoidCollisions={false}>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
