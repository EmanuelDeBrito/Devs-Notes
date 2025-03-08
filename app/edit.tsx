import { router, Stack, useLocalSearchParams } from "expo-router"
import { useState, useEffect, useContext } from "react"
import { Image, Pressable, SafeAreaView, StyleSheet, TextInput } from "react-native"
import { NotesContext } from "../contexts/notes-context"

type Query = {
    index?: string
}

const Screen = () => {

    // Query
    const { index } = useLocalSearchParams<Query>();

    // Context
    const notesCtx = useContext(NotesContext);

    // States
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState<"add" | "edit">("add");

    const handleBackButton = () => {
        router.back();
    }

    const handleSaveButton = () => {
        if (title.trim() !== "" && body.trim() !== "") {
            if (status === "add") {
                notesCtx?.dispatch({
                    type: 'SET_NOTE',
                    payload: {
                        title,
                        body
                    }
                })
                router.back();
            } else {
                if (index) {
                    notesCtx?.dispatch({
                        type: 'EDIT_NOTE',
                        payload: {
                            index: parseInt(index),
                            title,
                            body
                        }
                    })
                    router.navigate("/");
                }
            }
        } else {
            alert("Preencha os campos corretamente");
        }
    }

    useEffect(() => {
        if (index !== undefined && notesCtx?.notes[parseInt(index)]) {
            setTitle(notesCtx.notes[parseInt(index)].title);
            setBody(notesCtx.notes[parseInt(index)].body);
            setStatus("edit")
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options=
                {{
                    title: status === "add" ? "Adicionar Nota" : "Editar Nota",
                    headerLeft: () => (
                        <Pressable
                            style={styles.iconButton}
                            onPress={handleBackButton}
                        >
                            <Image
                                style={styles.closeIcon}
                                source={require('../assets/icons/close.png')}
                                resizeMode="cover"
                            />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable
                            style={styles.iconButton}
                            onPress={handleSaveButton}
                        >
                            <Image
                                style={styles.saveIcon}
                                source={require('../assets/icons/save.png')}
                                resizeMode="cover"
                            />
                        </Pressable>
                    )
                }}
            />

            <TextInput
                style={styles.titleInput}
                placeholder="Título da anotação"
                placeholderTextColor={"#FFF"}
                value={title}
                onChangeText={t => setTitle(t)}
            />

            <TextInput
                style={styles.bodyInput}
                placeholder="Corpo da anotação"
                placeholderTextColor={"#FFF"}
                multiline
                value={body}
                onChangeText={t => setBody(t)}
            />
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
    closeIcon: {
        width: 18,
        height: 18
    },
    saveIcon: {
        width: 20,
        height: 20
    },
    titleInput: {
        margin: 20,
        padding: 10,
        height: 50,
        color: '#FFF',
        fontSize: 18,
        borderRadius: 10,
        borderColor: '#FFF',
        borderWidth: 1
    },
    bodyInput: {
        marginTop: 10,
        marginHorizontal: 20,
        padding: 10,
        height: 150,
        color: '#FFF',
        fontSize: 18,
        borderRadius: 10,
        borderColor: '#FFF',
        borderWidth: 1
    }
})