import { StyleSheet } from 'react-native';
import { Color } from './Colors';

const styles_text = StyleSheet.create({
    text_head0: {
        fontSize: 42,
        color: Color.text1,
        fontFamily: 'Kanit_600SemiBold',
    },
    text_head1: {
        fontSize: 26,
        color: Color.text1,
        fontFamily: 'Kanit_600SemiBold',
    },
    text_head2: {
        fontSize: 24,
        color: Color.text1,
        fontFamily: 'Kanit400',
    },
    text_head3: {
        fontSize: 18,
        color: Color.text3,
        margin: 0,
        padding: 0,
        fontFamily: 'Kanit400',
    },
    text_head3_white: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    text_head4: {
        fontSize: 20,
        color: Color.text3,
        marginVertical: 6,
        fontFamily: 'Kanit400',
    },
    text_head4_gray: {
        fontSize: 18,
        marginVertical: 6,
        color: Color.text4,
        fontFamily: 'Kanit400',
    },
    text_head5_red: {
        color: '#c44',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    text_norm1: {
        fontSize: 18,
        color: Color.text1,
        margin: 0,
        padding: 0,
        fontFamily: 'Kanit400',
    },
    text_norm2: {
        fontSize: 16,
        color: Color.text1,
        margin: 0,
        padding: 0,
        fontFamily: 'Kanit300',
    },
    text_nimi1: {
        fontSize: 12,
        color: Color.text1,
        margin: 0,
        padding: 0,
        fontFamily: 'Kanit300',
    },
})

export default styles_text;