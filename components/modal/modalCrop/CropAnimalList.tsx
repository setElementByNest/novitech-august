import { Colors } from '@/constants/Colors';
import TextStyles from "@/constants/Texts";
import { demo_animal } from '@/data/FetchData';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";

interface Props {
    selectCrop: string;
}

export const CropAnimalList = ({ selectCrop }: Props) => {

    const listAnimal = demo_animal.map((item) => item.name + ", " + item.id);

    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>รายชื่อสัตว์ใน {selectCrop}</Text>
            <View style={{ padding: 12 }}></View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>รายการสัตว์ที่อยู่ในคอก</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                {
                    listAnimal.map((item, index) => (
                        <View key={index} style={[styles.input, { borderColor: Colors.light.gray_light }]}>
                            <Text style={[TextStyles.text_head4]}>
                                {item}
                            </Text>
                        </View>
                    ))
                }
            </View>
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