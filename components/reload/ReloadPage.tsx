import TextStyles from '@/constants/Texts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function ReloadPage() {
    return (
        <View style={styles.container}>
            <Text style={TextStyles.text_head5}>Reloading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#88888822',
        paddingVertical: 24,
        borderRadius: 8,
    },
})