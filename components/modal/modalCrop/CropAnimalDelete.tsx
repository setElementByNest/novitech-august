import Button from '@/components/button/Button';
import { Colors } from '@/constants/Colors';
import TextStyles from "@/constants/Texts";
import { demo_animal } from '@/data/FetchData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    closeModal: () => void;
    changePage: (page: number) => void;
}

export const CropAnimalDelete = ({ closeModal, changePage }: Props) => {

    const listAnimal = demo_animal.map((item) => item.name + ", " + item.id);
    const [nowList, setNowList] = useState<string[]>(listAnimal);
    const [dropList, setDropList] = useState<string[]>([]);

    const onSave = () => {
        setNowList(listAnimal);
        setDropList([]);
        closeModal();
    }

    const onCancel = () => {
        setNowList(listAnimal);
        setDropList([]);
        changePage(1);
    }

    const onDrop = (id: string) => {
        setNowList((prev) => prev.filter((item) => item.split(", ")[1] !== id));
        setDropList((prev) => [...prev, listAnimal.find((item) => item.split(", ")[1] === id)!]);
    }
    const onComeBack = (id: string) => {
        setNowList((prev) => [...prev, listAnimal.find((item) => item.split(", ")[1] === id)!]);
        setDropList((prev) => prev.filter((item) => item.split(", ")[1] !== id));
    }

    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>ถอดสัตว์ออกจากคอก</Text>
            <View style={{padding: 12}}></View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%', display: nowList.length === 0 ? 'none' : 'flex' }]}>รายการสัตว์ที่อยู่ในคอก</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                {
                    nowList.map((item, index) => (
                        <View key={index} style={[styles.input, { borderColor: Colors.light.gray_light }]}>
                            <Text style={[TextStyles.text_head4]}>
                                {item}
                            </Text>
                            <Pressable onPress={() => onDrop(item.split(", ")[1])} style={{ position: 'absolute', right: 12, top: 8, }}>
                                <MaterialCommunityIcons style={[{ color: Colors.light.red, fontSize: 24 }]} name='delete' />
                            </Pressable>
                        </View>
                    ))
                }
                {/* <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text> */}
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%', display: dropList.length === 0 ? 'none' : 'flex' }]}>รายการสัตว์ที่จะถูกถอน</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                {
                    dropList.map((item, index) => (
                        <View key={index} style={[styles.input, { borderColor: Colors.light.gray_light }]}>
                            <Text style={[TextStyles.text_head4]}>
                                {item}
                            </Text>
                            <Pressable onPress={() => onComeBack(item.split(", ")[1])} style={{ position: 'absolute', right: 12, top: 8, }}>
                                <MaterialCommunityIcons style={[{ color: Colors.light.main, fontSize: 24 }]} name='plus' />
                            </Pressable>
                        </View>
                    ))
                }
            </View>


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