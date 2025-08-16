import { Text, View, StyleSheet } from 'react-native'

const Linetext = ({ text }: { text: string }) => {
    return (
        <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>{text}</Text>
            <View style={styles.separatorLine} />
        </View>
    )
}

const styles = StyleSheet.create({
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#999',
        fontFamily: 'Kanit_400Regular',
    },
})

export default Linetext