import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const statusColors: Record<string, { border: string; label: string; bg: string }> = {
    'ติดสัด': { border: Colors.light.main_heat, label: 'pink', bg: Colors.light.bg_heat },
    'ผิดปกติ': { border: Colors.light.main_critical, label: 'darkred', bg: Colors.light.bg_critical },
    'ปกติ': { border: Colors.light.main_normal, label: 'green', bg: Colors.light.bg_normal },
    'ส่งออก': { border: Colors.light.main_sold, label: 'orange', bg: Colors.light.bg_sold },
    'ตาย': { border: Colors.light.main_death, label: 'gray', bg: Colors.light.bg_death },
};

type AnimalStatus = 'ปกติ' | 'ติดสัด' | 'ผิดปกติ' | 'ส่งออก' | 'ตาย' | 'ว่าง';

type Animal = {
    id: string;
    name: string;
    code: string;
    gender: 'ผู้' | 'เมีย';
    birth: number;
    weight: number;
    status: AnimalStatus;
    pen: string;
};

type Props = {
    animals: Animal;
    gridView: boolean;
    fn?: () => void;
};

const AnimalCardList: React.FC<Props> = ({ animals, gridView, fn }) => {
    const status = statusColors[animals.status];

    const ageFormat = (birth: number) => {
        const ageInMonths = Math.floor((Date.now() - birth * 1000) / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(ageInMonths / 12);
        const months = ageInMonths % 12;
        return `${years} ปี ${months} เดือน`;
    }
    return (
        <Pressable style={[styles.card, { display: 'flex', flexDirection: gridView ? 'column' : 'row' }]} onPress={() => { console.log(`Selected: ${animals.code}`); fn ? fn() : {}; }}>
            <View style={{ width: gridView ? 'auto' : '30%' }}>
                <Text style={[styles.name, { color: status.border }]}>{animals.name}</Text>
                <Text style={[styles.text_head4]}>{animals.code}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: gridView ? 8 : 0, backgroundColor: status.bg, padding: 8, borderRadius: 8 }}>
                <View style={{ flexDirection: 'column', paddingRight: gridView ? 0 : 16, alignItems: 'center' }}>
                    <Text style={styles.text_head4}>เพศ</Text>
                    <Text style={gridView ? styles.text_head3 : styles.text_head3_2}>{animals.gender}</Text>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: gridView ? 0 : 16, alignItems: 'flex-end' }}>
                    <Text style={styles.text_head4}>อายุ</Text>
                    <Text style={gridView ? styles.text_head3 : styles.text_head3_2}>{ageFormat(animals.birth)}</Text>
                </View>
                {/* <View style={{ flexDirection: 'column', paddingRight: gridView ? 0 : 16, alignItems: 'center' }}>
                    <Text style={styles.text_head4}>น้ำหนัก</Text>
                    <Text style={gridView ? styles.text_head3 : styles.text_head3_2}>{animals.weight} {gridView ? '' : 'Kg.'}</Text>
                </View> */}
            </View>
            <Text style={[styles.text_head4]}>{"คอก"} : {animals.pen}</Text>
            <View style={[styles.statusBadge, { backgroundColor: status.border }]}>
                <Text style={styles.statusText}>{animals.status}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#eaeaea',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        marginVertical: 2,
        width: '49%',
    },
    name: {
        fontSize: 22,
        fontFamily: 'Kanit400',
    },
    statusBadge: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 50,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 10,
        right: 8,
    },
    statusText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    text_head3: {
        fontSize: 18,
        color: Colors.light.dark,
        fontFamily: 'Kanit400',
    },
    text_head3_2: {
        fontSize: 16,
        color: Colors.light.dark,
        fontFamily: 'Kanit400',
    },
    text_head4: {
        fontSize: 16,
        color: Colors.light.gray,
        fontFamily: 'Kanit300',
    },
});

export default AnimalCardList;