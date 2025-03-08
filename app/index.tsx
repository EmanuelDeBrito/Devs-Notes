import { Stack, router } from "expo-router"
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text } from "react-native"
import { NotFoundNotes } from "../components/not-found-notes"
import { useContext } from "react"
import { NotesContext } from "../contexts/notes-context"
import { NoteItem } from "../components/note-item"

const Screen = () => {
    const notesCtx = useContext(NotesContext);

    const handleAddNoteButton = () => {
        router.navigate("/edit");
    }

    const handleEditNoteButton = (index: number) => {
        const query = new URLSearchParams();
        query.set("index", `${index}`);

        router.navigate(`/edit?${query.toString()}`);
    }

    const handleRemoveNoteButton = (index: number) => {
        notesCtx?.dispatch({
            type: 'REMOVE_NOTE',
            payload: {
                index
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options=
                {{
                    title: "Anotações",
                    headerBackVisible: false,
                    headerRight: () => (
                        <Pressable
                            style={styles.iconButton}
                            onPress={handleAddNoteButton}
                        >
                            <Image
                                style={styles.icon}
                                source={require('../assets/icons/more.png')}
                                resizeMode="cover"
                            />
                        </Pressable>
                    )
                }}
            />

            {notesCtx && notesCtx.notes.length > 0 &&
                <FlatList
                    data={notesCtx.notes}
                    renderItem={(item) => (
                        <NoteItem
                            index={item.index}
                            title={item.item.title}
                            onPress={handleEditNoteButton}
                            onRemove={handleRemoveNoteButton}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            }

            {notesCtx?.notes.length === 0 &&
                <NotFoundNotes />
            }
        </SafeAreaView>
    )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333'
    },
    iconButton: {
        paddingHorizontal: 10,
    },
    icon: {
        width: 22,
        height: 22
    }
})