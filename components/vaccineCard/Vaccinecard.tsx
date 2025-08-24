import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../Colors';

const statusColors: Record<string, { border: string; label: string }> = {
    'not': { border: '#2e6b50', label: 'main' },
    'done': { border: '#95b5a6', label: 'mainlight' },
};

type noticeListProps = {
    date: number;
    name: string;
    done: boolean;
};

type Props = {
    data: noticeListProps;
};

const VaccineCard: React.FC<Props> = ({ data }) => {
    const status = statusColors[data.done ? 'done' : 'not'];
    return (
        <Pressable style={[styles.card, { borderColor: status.border, width: '100%', display: 'flex', flexDirection: 'column', marginVertical: 4 }]} >
            <View>
                <Text style={[styles.text_head4, { color: status.border }]}>{new Date(data.date * 1000).toLocaleDateString('th-TH', {
                    timeZone: 'Asia/Bangkok',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}</Text>
            </View>
            <View>
                <Text style={[styles.text_head3, { color: status.border }]}>{data.name}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 12,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderLeftColor: '#0f5132',
        borderRightColor: '#0f5132',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginVertical: 1,
        elevation: 2,
        overflow: 'hidden',
        // width: '48%',
    },
    name: {
        fontSize: 22,
        fontFamily: 'Kanit400',
    },
    statusBadge: {
        marginTop: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 10,
        right: 16,
    },
    statusText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    text_head3: {
        fontSize: 18,
        color: Color.text1,
        fontFamily: 'Kanit400',
    },
    text_head3_2: {
        fontSize: 16,
        color: Color.text1,
        fontFamily: 'Kanit400',
    },
    text_head4: {
        fontSize: 12,
        color: Color.text4,
        fontFamily: 'Kanit400',
    },
});

export default VaccineCard;