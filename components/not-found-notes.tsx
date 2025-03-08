import { View, Text, Image, StyleSheet } from "react-native"

export const NotFoundNotes = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require('../assets/icons/note.png')}
                resizeMode="cover"
            />
            <Text style={styles.text}>Não há anotações feitas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 50,
        height: 50
    },
    text: {
        marginTop: 15,
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
})