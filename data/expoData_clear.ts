import * as FileSystem from 'expo-file-system';

const dirUri = FileSystem.documentDirectory + 'data/';

async function showAndDeleteFiles() {
    try {
        // Show all file names in dirUri
        const filesBefore = await FileSystem.readDirectoryAsync(dirUri);
        console.log('Files before deletion:', filesBefore);

        // Delete all files
        await Promise.all(
            filesBefore.map(async (file) => {
                await FileSystem.deleteAsync(dirUri + file, { idempotent: true });
            })
        );

        // Show all file names after deletion
        const filesAfter = await FileSystem.readDirectoryAsync(dirUri);
        console.log('Files after deletion:', filesAfter);
    } catch (error) {
        console.error('Error handling files:', error);
    }
}

showAndDeleteFiles();