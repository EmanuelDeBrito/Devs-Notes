import { NoteType } from "../types/note-type"

type SetNote = {
    type: 'SET_NOTE',
    payload: {
        title: string,
        body: string
    }
}

type EditNote = {
    type: 'EDIT_NOTE',
    payload: {
        index: number,
        title: string,
        body: string
    }
}

type RemoveNote = {
    type: 'REMOVE_NOTE',
    payload: {
        index: number
    }
}

export type ActionList = SetNote | EditNote | RemoveNote

export const UserReducer = (state: NoteType[], action: ActionList) => {
    let newNotes;

    switch (action.type) {
        case 'SET_NOTE':
            return [...state, { title: action.payload.body, body: action.payload.body }]
            break;
        case 'EDIT_NOTE':
            newNotes = state;
            newNotes[action.payload.index] = { title: action.payload.title, body: action.payload.body }
            return newNotes
            break;
        case 'REMOVE_NOTE':
            newNotes = state.filter((item, index) => index !== action.payload.index);
            return newNotes
            break;
    }

    return state
}