import Button from '@/components/button/Button';
import { Colors } from '@/constants/Colors';
import TextStyles from "@/constants/Texts";
import { demo_animal } from '@/data/FetchData';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    closeModal: () => void;
    selectCrop: string;
}

export const CropAnimalAdd = ({ selectCrop, closeModal }: Props) => {

    const [listOpen1, setListOpen1] = useState<boolean>(false);
    const [nowChange, setChange] = useState<string>('');
    const listAnimal = demo_animal.map((item) => ({
        label: item.name + ", " + item.id,
        value: item.id,
    }));
    const onSave = () => {
        setListOpen1(false);
        setChange('');
        closeModal();
    }

    const onCancel = () => {
        setListOpen1(false);
        setChange('');
        closeModal();
    }

    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>ย้ายสัตว์เข้า {selectCrop}</Text>
            <View style={{ padding: 12 }}></View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกสัตว์</Text>
            <DropDownPicker
                open={listOpen1}
                value={nowChange}
                items={listAnimal}
                setOpen={setListOpen1}
                setValue={setChange}
                multiple={false}
                listMode="SCROLLVIEW"
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, zIndex: 0 }}
            />
            <View style={{ padding: 24, flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', display: nowChange === '' ? 'none' : 'flex' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{width: 12, height: 12, backgroundColor: '#aaa', borderRadius: 50}}></View>
                    <Text style={[TextStyles.text_head5_gray, { textAlign: 'left', width: '100%' }]}>คอกวัยรุ่นชาย</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{width: 12, height: 12, backgroundColor: Colors.light.main, borderRadius: 50}}></View>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%', color: Colors.light.main }]}>{selectCrop}</Text>
                </View>
            </View>
            <View style={{ padding: 12 }}></View>
            <Button text="บันทึก" theme="green" fn={onSave} />
            <Button text="ยกเลิก" theme="gray" fn={onCancel} />
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