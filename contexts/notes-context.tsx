import { createContext, ReactNode, useReducer } from "react";
import { NoteType } from "../types/note-type";
import { ActionList, UserReducer } from "../reducers/notes-reducer";

type ContextType = {
    notes: NoteType[],
    dispatch: React.Dispatch<ActionList>
}

export const NotesContext = createContext<ContextType | null>(null);

type ProviderProps = {
    children: ReactNode
}

const initialState = [
    {
        title: "Teste de anotação",
        body: "Teste de corpo de anotação"
    }
]

export const NotesProvider = ({ children }: ProviderProps) => {
    const [notes, dispatch] = useReducer(UserReducer, initialState);

    return (
        <NotesContext.Provider value={{ notes, dispatch }}>
            {children}
        </NotesContext.Provider>
    )
}