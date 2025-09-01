import Button from '@/components/button/Button';
import TextStyles from "@/constants/Texts";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
    closeModal: () => void;
}

export const CropAdd = ({ closeModal }: Props) => {

    const [addData, setAddData] = useState<string>('');
    const onClose = () => {
        setAddData('');
        closeModal();
    }

    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>สร้างคอกสัตว์</Text>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ตั้งชื่อคอก</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={[styles.input, {padding: 12}]}
                    value={addData}
                    keyboardType="default"
                    onChangeText={setAddData}
                />
                {/* <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text> */}
            </View>

            <Button text="สร้าง" theme="green" fn={onClose} />
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