import { Pressable, StyleSheet, Text } from "react-native"

type Props = {
    index: number,
    title: string,
    onPress: (index: number) => void,
    onRemove: (index: number) => void
}

export const NoteItem = ({ index, title, onPress, onRemove }: Props) => {
    return (
        <Pressable
            style={styles.container}
            onPress={() => onPress(index)}
        >
            <Text style={styles.title}>{title}</Text>

            <Pressable
                style={styles.removeButton}
                onPress={() => onRemove(index)}
            >
                <Text style={styles.removeText}>Apagar</Text>
            </Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
    },
    title: {
        color: '#FFF',
        fontSize: 22,
    },
    removeButton: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#F00',
        borderRadius: 10,
    },
    removeText: {
        color: '#FFF',
        fontSize: 15
    }
})