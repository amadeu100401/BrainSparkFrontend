import { createContext, useContext, useState, ReactNode } from "react";

type FocusContextType = {
    selectedProject: { id: string; name: string }| null;
    setSelectedProject: (project: { id: string; name: string; }| null) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export function FocusProvider({ children }: { children: ReactNode }) {
    const [selectedProject, setSelectedProject] = useState<{ id: string; name: string; }| null>(null);

    return (
        <FocusContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </FocusContext.Provider>
    );
}

export function useFocus() {
    const context = useContext(FocusContext);
    if (!context) {
        throw new Error("useFocus must be used within a FocusProvider");
    }
    return context;
}

