import Button from '@/components/button/Button';
import { Colors } from "@/constants/Colors";
import TextStyles from "@/constants/Texts";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    closeModal: () => void;
    setAddFood: (num: number) => void;
    addFood: number;
    milkAverage: number;
    milkStandard: number;
    animallist_open: boolean;
    animallist_value: string | null;
    data_listAnimals: { label: string; value: string }[];
    animallist_setOpen: Dispatch<SetStateAction<boolean>>;
    animallist_setValue: Dispatch<SetStateAction<string | null>>;
}

export const MilkSave = ({ 
    closeModal,
    setAddFood,
    addFood,
    milkAverage,
    milkStandard,
    animallist_open,
    animallist_value,
    data_listAnimals,
    animallist_setOpen,
    animallist_setValue }: Props) => {
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>บันทึกการให้นม</Text>
            <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', padding: 12, backgroundColor: Colors.light.bg_warning, marginBottom: 24 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ปริมาณเฉลี่ย</Text>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{milkAverage.toLocaleString()} ลิตร</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ปริมาณมาตรฐาน</Text>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{milkStandard.toLocaleString()} ลิตร</Text>
                </View>
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกสัตว์ในคอกให้นม</Text>
            <DropDownPicker
                open={animallist_open}
                value={animallist_value}
                items={data_listAnimals}
                setOpen={animallist_setOpen}
                setValue={animallist_setValue}
                multiple={false}
                listMode="SCROLLVIEW"
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12 }}
            />
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ปริมาณน้ำนม</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={styles.input}
                    placeholder={"น้ำหนัก"}
                    value={addFood.toString()}
                    onChangeText={e => setAddFood(Number(e))}
                    keyboardType="numeric"
                />
                <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ลิตร</Text>
            </View>
            <Button text="บันทึก" theme="green" fn={closeModal} />
        </View>
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