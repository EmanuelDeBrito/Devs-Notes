import { Stack } from "expo-router"
import { NotesProvider } from "../contexts/notes-context"

const RootLayout = () => {
    return (
        <NotesProvider>
            <Stack screenOptions={{
                headerStyle: { backgroundColor: '#222' },
                headerTintColor: '#FFF',
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="edit" />
            </Stack>
        </NotesProvider>
    )
}

export default RootLayout