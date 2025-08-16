import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FarmdetailCardProps = {
    title: string;
    datalist: datalist[];
    textUnit: string;
    dot?: boolean;
};

type datalist = {
    topic: string;
    value: number;
};

const FarmdetailCard: React.FC<FarmdetailCardProps> = ({
    title,
    datalist,
    textUnit,
    dot,
}) => {
    const maxValue = datalist.reduce((max, item) => { return max > item.value ? max : item.value }, 0);
    return (
        <Pressable style={[styles.card]}>
            <View style={styles.card_header}>
                <Text style={styles.card_header_text}>{title}</Text>
                <MaterialCommunityIcons style={[styles.card_header_icon, { display: dot ? 'flex' : 'none' }]} name="dots-horizontal" />
            </View>
            <View style={[styles.card_content]}>
                <View style={{ width: '100%' }}>
                    {
                        datalist.map((item, index) => (
                            <View style={styles.headerRow} key={index}>
                                <Text style={styles.subLabel}>{item.topic}</Text>
                                <Text style={styles.subLabel2}>{item.value + " " + textUnit}</Text>
                                <View style={[styles.valuebar, { width: `${(item.value / maxValue) * 60}%` }]}></View>
                            </View>
                        ))
                    }
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
        width: '100%',
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
        backgroundColor: '#eee',
        padding: 8,
        paddingHorizontal: 18,
        borderRadius: 6,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        width: '16%',
    },
    subLabel2: {
        fontSize: 14,
        color: '#000',
        marginBottom: 4,
        fontFamily: 'Kanit_300Light',
        width: '20%',
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
    valuebar: {
        backgroundColor: '#aaa',
        borderRadius: 50,
        marginVertical: 4,
        display: 'flex',
        justifyContent: 'flex-start',
        width: '50%',
    },
});

export default FarmdetailCard;
