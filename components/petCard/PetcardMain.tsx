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
    edit: (name: string) => void;
};

const AnimalCard: React.FC<Props> = ({ animals, gridView, fn, edit }) => {
    const status = statusColors[animals.status];
    return (
        <Pressable style={[styles.card, { display: 'flex', flexDirection: gridView ? 'column' : 'row' }]} onPress={() => { console.log(`Selected: ${animals.code}`); fn ? fn() : {}; }}>
            <View style={{ width: '100%', backgroundColor: status.bg, padding: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'baseline', gap: 12 }}>
                <Text style={[styles.name, { color: status.border }]}>{animals.name}</Text>
                <Text style={[styles.text_head4]}>{animals.code}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: gridView ? 8 : 0, padding: 8, paddingHorizontal: 18, borderRadius: 8 }}>
                <View style={{ flexDirection: 'column', gap: 2, width: '50%' }}>
                    <View style={{ flexDirection: 'row', paddingRight: gridView ? 0 : 16, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.text_head4}>เพศ</Text>
                        <Text style={styles.text_head3}>{"เมีย"}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingRight: gridView ? 0 : 16, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.text_head4}>อายุ</Text>
                        <Text style={styles.text_head3}>{"6 ปี 4 เดือน"}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingRight: gridView ? 0 : 16, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.text_head4}>วันเกิด</Text>
                        <Text style={styles.text_head3}>{"1/1/2542"}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingRight: gridView ? 0 : 16, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.text_head4}>คอก</Text>
                        <Text style={styles.text_head3}>{"คอกตะเล็ก"}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', gap: 2 }}>
                    <View style={{ flexDirection: 'row', paddingRight: gridView ? 0 : 16, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.text_head4}>พันธุ์</Text>
                        <Text style={styles.text_head3}>{"Murrah"}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingRight: gridView ? 0 : 16, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.text_head4}>พ่อ</Text>
                        <Text style={styles.text_head3}>{"นิโคลัส, M2158"}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingRight: gridView ? 0 : 16, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.text_head4}>แม่</Text>
                        <Text style={styles.text_head3}>{"มาริอา, F2158"}</Text>
                    </View>
                    <Pressable style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8}} onPress={() => edit(animals.id)}>
                        <Text style={[styles.text_head3_2, { color: Colors.light.gray, textDecorationLine: 'underline' }]}>แก้ไข</Text>
                    </Pressable>
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
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#eaeaea',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        marginVertical: 2,
        width: '100%',
    },
    name: {
        fontSize: 22,
        fontFamily: 'Kanit400',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 50,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 18,
        right: 18,
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

export default AnimalCard;