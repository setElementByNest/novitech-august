import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Color } from '../Colors';

const statusColors: Record<string, { border: string; label: string }> = {
    'ติดสัด': { border: '#e53ae5', label: 'pink' },
    'ผิดปกติ': { border: '#B71C1C', label: 'darkred' },
    'ปกติ': { border: '#0f5132', label: 'green' },
    'ส่งออก': { border: '#95b5a6', label: 'orange' },
    'ตาย': { border: '#aaa', label: 'gray' },
};

type AnimalStatus = 'ปกติ' | 'ติดสัด' | 'ผิดปกติ' | 'ส่งออก' | 'ตาย' | 'ว่าง';

type Animal = {
    id: string;
    name: string;
    code: string;
    gender: 'ผู้' | 'เมีย';
    age: number;
    weight: number;
    status: AnimalStatus;
};

type Props = {
    animals: Animal;
    gridView: boolean;
    fn?: () => void;
};

const AnimalCardList: React.FC<Props> = ({ animals, gridView, fn }) => {
    const status = statusColors[animals.status];
    return (
        <Pressable style={[styles.card, { borderColor: status.border, width: gridView ? '48%' : '100%', display: 'flex', flexDirection: gridView ? 'column' : 'row' }]} onPress={() => { console.log(`Selected: ${animals.code}`); fn ? fn() : {}; }}>
            <View style={{ width: gridView ? 'auto' : '30%' }}>
                <Text style={[styles.name, { color: status.border }]}>{animals.name}</Text>
                <Text style={[styles.text_head3]}>{animals.code}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: gridView ? 8 : 0 }}>
                <View style={{ flexDirection: 'column', paddingRight: gridView ? 0 : 16, alignItems: 'center' }}>
                    <Text style={styles.text_head4}>เพศ</Text>
                    <Text style={gridView ? styles.text_head3 : styles.text_head3_2}>{animals.gender}</Text>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: gridView ? 0 : 16, alignItems: 'center' }}>
                    <Text style={styles.text_head4}>อายุ</Text>
                    <Text style={gridView ? styles.text_head3 : styles.text_head3_2}>{animals.age} {gridView ? '' : 'ปี'}</Text>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: gridView ? 0 : 16, alignItems: 'center' }}>
                    <Text style={styles.text_head4}>น้ำหนัก</Text>
                    <Text style={gridView ? styles.text_head3 : styles.text_head3_2}>{animals.weight} {gridView ? '' : 'Kg.'}</Text>
                </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.border }]}>
                <Text style={styles.statusText}>{animals.status}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        borderBottomWidth: 4,
        borderBottomColor: '#0f5132',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginVertical: 2,
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
        fontSize: 16,
        color: Color.text4,
        fontFamily: 'Kanit_400Regular',
    },
});

export default AnimalCardList;