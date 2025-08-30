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
    foodDay: number;
    foodTotal: number;
    croplist_open: boolean;
    croplist_value: string | null;
    data_listCrop: { label: string; value: string }[];
    croplist_setOpen: Dispatch<SetStateAction<boolean>>;
    croplist_setValue: Dispatch<SetStateAction<string | null>>;
}

export const FoodPet = ({ closeModal, setAddFood, addFood, foodDay, foodTotal, croplist_open, croplist_value, data_listCrop, croplist_setOpen, croplist_setValue }: Props) => {
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>บันทึกการให้อาหาร</Text>
            <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', padding: 12, backgroundColor: Colors.light.bg_warning, marginBottom: 24 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ต้องการอาหารต่อวัน</Text>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodDay.toLocaleString()} ก้อน</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>อาหารในคลัง</Text>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodTotal.toLocaleString()} ก้อน</Text>
                </View>
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกคอก</Text>
            <DropDownPicker
                open={croplist_open}
                value={croplist_value}
                items={data_listCrop}
                setOpen={croplist_setOpen}
                setValue={croplist_setValue}
                multiple={false}
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12 }}
            />
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>จำนวนฟาง</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={styles.input}
                    placeholder={"น้ำหนัก"}
                    value={addFood.toString()}
                    onChangeText={e => setAddFood(Number(e))}
                    keyboardType="numeric"
                />
                <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text>
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