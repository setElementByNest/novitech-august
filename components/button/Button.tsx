import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

type themeProps = 'green' | 'gray' | 'graydark' | 'white' | 'lock' | 'red';

const themeSet: Record<string, { background: string; color: string }> = {
    'green': { background: Colors.light.main, color: '#fff' },
    'gray': { background: '#eaeaea', color: '#888' },
    'graydark': { background: '#eaeaea', color: '#444' },
    'white': { background: '#ffffff', color: '#222' },
    'lock': { background: '#fc0', color: '#fff' },
    'red': { background: '#ff4d4d', color: '#fff' },
};

type Props1 = {
    text: string;
    theme: themeProps;
    fn: () => void;
}
type Props2 = {
    text: string;
    theme: themeProps;
    fn: () => void;
}

const Button = ({ text, theme, fn }: Props1) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: themeSet[theme].background }]} onPress={fn}>
            <View style={{ display: theme === 'lock' ? 'flex' : 'none' }}>
                <MaterialCommunityIcons
                    name={'lock'}
                    size={28}
                    color={'white'}
                    style={{ margin: 0, padding: 0, marginRight: 4 }}
                />
            </View>
            <Text style={[styles.button_text, { color: themeSet[theme].color }]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export const ButtonBack = ({ text, fn }: Props2) => {
    return (
        <View>
            <Pressable onPress={fn} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <MaterialCommunityIcons name="arrow-left" size={16} color={'gray'} />
                <Text style={[styles.button_text, { color: 'gray' }]}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 6,
        borderColor: '#ddd',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
    },
    button_text: {
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
})

export default Button