import { Colors } from "@/constants/Colors";
import TextStyles from "@/constants/Texts";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    closeModal: () => void;
    setWeight: (num: number) => void;
    setHeight: (num: number) => void;
    setLong: (num: number) => void;
    nowWeight: number;
    nowHeight: number;
    nowLong: number;
    croplist_open: boolean;
    croplist_value: string | null;
    data_listCrop: { label: string; value: string }[];
    croplist_setOpen: Dispatch<SetStateAction<boolean>>;
    croplist_setValue: Dispatch<SetStateAction<string | null>>;
    animallist_open: boolean;
    animallist_value: string | null;
    data_listAnimals: { label: string; value: string }[];
    animallist_setOpen: Dispatch<SetStateAction<boolean>>;
    animallist_setValue: Dispatch<SetStateAction<string | null>>;
}

import { ScrollView } from "react-native";

export const GrowSave = ({
    closeModal,
    setWeight,
    setHeight,
    setLong,
    nowWeight,
    nowHeight,
    nowLong,
    croplist_open,
    croplist_value,
    data_listCrop,
    croplist_setOpen,
    croplist_setValue,
    animallist_open,
    animallist_value,
    data_listAnimals,
    animallist_setOpen,
    animallist_setValue }: Props) => {
    return (
        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <DropDownPicker
                open={croplist_open}
                value={croplist_value}
                items={data_listCrop}
                setOpen={croplist_setOpen}
                setValue={croplist_setValue}
                multiple={false}
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12, zIndex: 0 }}
                listMode="SCROLLVIEW"
            />
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกสัตว์</Text>
            <DropDownPicker
                open={animallist_open}
                value={animallist_value}
                items={data_listAnimals}
                setOpen={animallist_setOpen}
                setValue={animallist_setValue}
                multiple={false}
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12, zIndex: 0 }}
                listMode="SCROLLVIEW"
            />
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>น้ำหนัก</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={styles.input}
                    placeholder={"น้ำหนัก"}
                    value={nowWeight.toString()}
                    onChangeText={e => setWeight(Number(e))}
                    keyboardType="numeric"
                />
                <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>กิโลกรัม</Text>
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ส่วนสูง</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={styles.input}
                    placeholder={"ส่วนสูง"}
                    value={nowHeight.toString()}
                    onChangeText={e => setHeight(Number(e))}
                    keyboardType="numeric"
                />
                <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>เซนติเมตร</Text>
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ความยาวหัวท้าย</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={styles.input}
                    placeholder={"ความยาวหัวท้าย"}
                    value={nowLong.toString()}
                    onChangeText={e => setLong(Number(e))}
                    keyboardType="numeric"
                />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    input: {
        padding: 8,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        fontFamily: 'Kanit400',
        width: '100%',
        borderWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 6,
    }
})