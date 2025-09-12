import { StyleSheet } from 'react-native';
// import { Color } from '../../components/Colors';
import { Colors } from './Colors';
const TextStyles = StyleSheet.create({
    text_head0: {
        fontSize: 32,
        color: Colors.light.dark,
        fontFamily: 'Kanit500',
    },
    text_head1: {
        fontSize: 26,
        color: Colors.light.dark,
        fontFamily: 'Kanit500',
    },
    text_head2: {
        fontSize: 20,
        color: Colors.light.dark,
        fontFamily: 'Kanit400',
        padding: 0,
        margin: 0,
        textAlign: 'center',
    },
    text_head3: {
        fontSize: 20,
        color: Colors.light.gray,
        marginTop: 16,
        marginBottom: 6,
        fontFamily: 'Kanit400',
    },
    text_head3_white: {
        color: Colors.light.gray,
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    text_head4: {
        fontSize: 18,
        color: Colors.light.dark,
        fontFamily: 'Kanit400',
    },
    text_head4_gray: {
        fontSize: 16,
        color: Colors.light.gray,
        fontFamily: 'Kanit400',
    },
    text_head5: {
        fontSize: 16,
        color: Colors.light.dark,
        fontFamily: 'Kanit400',
    },
    text_head5_red: {
        color: '#c44',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    text_head5_gray: {
        color: Colors.light.gray,
        fontSize: 16,
        fontFamily: 'Kanit400',
    }
});

export default TextStyles;