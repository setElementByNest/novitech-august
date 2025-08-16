import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type SummaryCardProps = {
    title: string;
    textHead: string;
    lock?: boolean;
    textSub1: string;
    textSub2: string;
    textValue1: string;
    textValue2: string;
    textUnit: string;
    status: 'normal' | 'warning' | 'critical';
    dot?: boolean;
};

const statusRecord: Record<string, { color: string; bg: string }> = {
    'normal': { color: '#2F8668', bg: '#4CB59122' },
    'warning': { color: '#dbac00', bg: '#ffc80022' },
    'critical': { color: '#bb0000', bg: '#bb000022' },
};

const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    textHead,
    textSub1,
    textSub2,
    textValue1,
    textValue2,
    textUnit,
    status,
    dot,
    lock,
}) => {
    const statusColors = statusRecord[status];
    return (
        <Pressable style={[styles.card]}>
            <View style={styles.card_header}>
                <Text style={styles.card_header_text}>{title}</Text>
                <MaterialCommunityIcons style={[styles.card_header_icon, { display: dot ? 'flex' : 'none' }]} name="dots-horizontal" />
            </View>
            <View style={[styles.card_content, { backgroundColor: statusColors.bg }]}>
                <View style={{ width: '100%', display: lock ? 'none' : 'flex' }}>
                    <Text style={[styles.mainCount, { color: statusColors.color }]}>{textHead}</Text>
                    <View style={styles.headerRow}>
                        <Text style={styles.subLabel}>{textSub1}</Text>
                        <Text style={styles.subLabel}>{textValue1 + " " + textUnit}</Text>
                    </View>
                    <View style={styles.headerRow}>
                        <Text style={styles.subLabel}>{textSub2}</Text>
                        <Text style={styles.subLabel}>{textValue2 + " " + textUnit}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 6,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#eaeaea',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        marginVertical: 2,
        width: '49%',
    },
    card_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
        paddingHorizontal: 8,
    },
    card_header_text: {
        fontSize: 16,
        fontFamily: 'Kanit_400Regular',
        color: '#000000ff',
        margin: 0,
        padding: 0,
    },
    card_header_icon: {
        fontSize: 18,
        fontFamily: 'Kanit_300Light',
        color: '#000000ff',
        margin: 0,
        padding: 0,
    },
    card_content: {
        backgroundColor: '#4CB59122',
        padding: 8,
        borderRadius: 6,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f5132',
        fontFamily: 'Kanit_400Regular',
    },
    subLabel: {
        fontSize: 14,
        color: '#000',
        marginBottom: 4,
        fontFamily: 'Kanit_300Light',
    },
    mainCount: {
        fontSize: 24,
        color: '#000',
        fontFamily: 'Kanit_400Regular',
        textAlign: 'center',
        marginVertical: 12,
    },
    unit: {
        fontSize: 24,
        fontWeight: 'normal',
        fontFamily: 'Kanit_400Regular',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    footerText: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Kanit_400Regular',
    },
});

export default SummaryCard;
