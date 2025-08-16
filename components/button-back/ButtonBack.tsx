import { Text, StyleSheet, View, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

type Props = {
    text: string;
    fn: () => void;
}

const ButtonBack = ({ text, fn }: Props) => {
    return (
        <View>
            <Pressable onPress={fn} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <MaterialCommunityIcons name="arrow-left" size={20} color={'gray'} />
                <Text style={[styles.button_text, { color: 'gray' }]}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button_text: {
        fontSize: 20,
        fontFamily: 'Kanit_400Regular',
    },
})

export default ButtonBack