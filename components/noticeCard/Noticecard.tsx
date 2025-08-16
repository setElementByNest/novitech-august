import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Color } from '../Colors';

const statusColors: Record<string, { border: string; label: string }> = {
    'unread': { border: '#B71C1C', label: 'darkred' },
    'read': { border: '#95b5a6', label: 'orange' },
};

type noticeListProps = {
    time: string;
    list: string;
    read: boolean;
};

type Props = {
    data: noticeListProps;
};

const NoticeCard: React.FC<Props> = ({ data }) => {
    const status = statusColors[data.read ? 'read' : 'unread'];
    return (
        <Pressable style={[styles.card, { borderColor: status.border, width: '100%', display: 'flex', flexDirection: 'column' }]} >
            <View>
                <Text style={[styles.text_head4, { color: status.border }]}>{new Date(Number(data.time) * 1000).toLocaleString()}</Text>
            </View>
            <View>
                <Text style={[styles.text_head3, { color: status.border }]}>{data.list}</Text>
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
        fontFamily: 'Kanit_400Regular',
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
        fontFamily: 'Kanit_400Regular',
    },
    text_head3: {
        fontSize: 18,
        color: Color.text1,
        fontFamily: 'Kanit_400Regular',
    },
    text_head3_2: {
        fontSize: 16,
        color: Color.text1,
        fontFamily: 'Kanit_400Regular',
    },
    text_head4: {
        fontSize: 12,
        color: Color.text4,
        fontFamily: 'Kanit_400Regular',
    },
});

export default NoticeCard;