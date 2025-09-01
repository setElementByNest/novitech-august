import Button from '@/components/button/Button';
import { Colors } from "@/constants/Colors";
import TextStyles from "@/constants/Texts";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
    closeModal: () => void;
    setAddFood: (num: number) => void;
    addFood: number;
    foodDay?: number;
    foodTotal?: number;
}

export const FoodAdd = ({ closeModal, setAddFood, addFood, foodDay, foodTotal }: Props) => {
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>เพิ่มอาหารเข้าคลัง</Text>
            <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', padding: 12, backgroundColor: Colors.light.bg_warning, marginBottom: 24 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ต้องการอาหารต่อวัน</Text>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodDay} ก้อน</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>อาหารในคลัง</Text>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodTotal} ก้อน</Text>
                </View>
            </View>
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
            <Button text="บันทึกจำนวนฟาง" theme="green" fn={closeModal} />
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