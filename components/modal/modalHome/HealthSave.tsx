import Button from '@/components/button/Button';
import TextStyles from "@/constants/Texts";
import { Dispatch, SetStateAction } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    closeModal: () => void;
    setHealth: (health: string) => void;
    nowHealth: string;
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

export const HealthSave = ({
    closeModal,
    setHealth,
    nowHealth,
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
        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>บันทึกสุขภาพ</Text>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกคอก</Text>
            <DropDownPicker
                open={croplist_open}
                value={croplist_value}
                items={data_listCrop}
                setOpen={croplist_setOpen}
                setValue={croplist_setValue}
                multiple={false}
                listMode="SCROLLVIEW"
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12, zIndex: 0 }}
            />
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกสัตว์</Text>
            <DropDownPicker
                open={animallist_open}
                value={animallist_value}
                items={data_listAnimals}
                setOpen={animallist_setOpen}
                setValue={animallist_setValue}
                multiple={false}
                listMode="SCROLLVIEW"
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12, zIndex: 0 }}
            />
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>โรค / อาการ</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    // placeholder={"โรค / อาการ"}
                    value={nowHealth}
                    onChangeText={e => setHealth(e)}
                    keyboardType="default"
                    multiline
                    numberOfLines={4}
                    maxLength={500}
                />
            </View>
            <Button text="บันทึก" theme="green" fn={closeModal} />
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