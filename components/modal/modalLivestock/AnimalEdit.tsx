import Button from '@/components/button/Button';
import TextStyles from "@/constants/Texts";
import { AnimalProps } from '@/contexts/ListAnimalContext';
import { demo_crop } from '@/data/FetchData';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

type AnimalStatus = 'ปกติ' | 'ติดสัด' | 'ผิดปกติ' | 'ส่งออก' | 'ตาย' | 'ว่าง';

interface Props {
    closeModal: () => void;
    onEditAnimal: (editId: string, editName: string, editSex: string, editDate: number, editMass: number, editStatus: string, editPen: string) => void;
    nameEdit: string;
    deleteAnimalByName: (name: string) => void;
}

interface addDataType {
    name: string;
    pen: string;
    gender: 'ผู้' | 'เมีย';
    birth: number;
    weight: number;
    dad: string;
    mom: string;
    breed: string;
    status: AnimalStatus;
}

const initialData: addDataType = {
    name: '',
    pen: '',
    gender: 'ผู้',
    birth: new Date().getTime(),
    weight: 0,
    dad: '',
    mom: '',
    breed: '',
    status: 'ปกติ'
}

export const AnimalEdit = ({ closeModal, onEditAnimal, nameEdit, deleteAnimalByName }: Props) => {

    const [listOpen1, setListOpen1] = useState<boolean>(false);
    const [listOpen2, setListOpen2] = useState<boolean>(false);
    const [listOpen3, setListOpen3] = useState<boolean>(false);
    const [listOpen4, setListOpen4] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [animalData, setAnimalData] = useState<AnimalProps | null>(null);
    const [addData, setAddData] = useState<addDataType>(initialData);

    const dataExpo_showlist = async () => {
        if (nameEdit === "") {
            console.log("No animal selected for editing.");
            return;
        };
        const dirUri = FileSystem.documentDirectory + 'data/';
        try {
            // Create directory if needed
            const dirInfo = await FileSystem.getInfoAsync(dirUri);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
            }
            // Read all file names in the directory
            const dirFiles = await FileSystem.readDirectoryAsync(dirUri);
            const fileUri = dirUri + nameEdit + '.txt';
            const content = await FileSystem.readAsStringAsync(fileUri);
            const parsed = JSON.parse(content);
            setAnimalData(parsed);
            setAddData({
                ...parsed,
                birth: parsed.birth * 1000 // ensure ms
            });
            console.log("nameEdit:", nameEdit);
            console.log("Files in directory:", dirFiles);
            console.log("Parsed animal data:", parsed);
        } catch (error) {
            console.error("Error during file write/read:", error);
        }
    }

    useEffect(() => {
        dataExpo_showlist();
    }, [nameEdit]);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setAddData(prev => ({ ...prev, birth: (selectedDate.getTime())}));
            setShow(false)
            console.log("Selected date (ms):", selectedDate.getTime());
        }
    };
    const showDatepicker = () => {
        setShow(true);
    };

    const demoCrop = demo_crop;
    const listCrop = demoCrop.map((item) => ({
        label: item.name,
        value: item.name,
    }));
    const listGender = [
        { label: 'ผู้', value: 'ผู้' },
        { label: 'เมีย', value: 'เมีย' }
    ];
    const listBreed = [
        { label: 'พันธุ์ A', value: 'breed_a' },
        { label: 'พันธุ์ B', value: 'breed_b' },
        { label: 'พันธุ์ C', value: 'breed_c' }
    ];
    // const statusOrder: AnimalStatus[] = ['ติดสัด', 'ผิดปกติ', 'ปกติ', 'ส่งออก', 'ตาย'];
    const statusOrder = [
        { label: 'ปกติ', value: 'ปกติ' },
        { label: 'ติดสัด', value: 'ติดสัด' },
        { label: 'ผิดปกติ', value: 'ผิดปกติ' },
        { label: 'ส่งออก', value: 'ส่งออก' },
        { label: 'ตาย', value: 'ตาย' },
    ]

    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>แก้ไขรายการสัตว์</Text>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ชื่อสัตว์</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={[styles.input, { padding: 12 }]}
                    value={animalData?.name}
                    editable={false}
                    keyboardType="default"
                    onChangeText={(text) => setAddData(prev => ({ ...prev, name: text }))}
                />
                {/* <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text> */}
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกคอก</Text>
            <DropDownPicker
                open={listOpen1}
                value={addData.pen}
                items={listCrop}
                setOpen={setListOpen1}
                setValue={(callback) => {
                    setAddData(prev => ({
                        ...prev,
                        pen: callback(prev.pen)
                    }))
                }}
                listMode="SCROLLVIEW"
                multiple={false}
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, zIndex: 0 }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 8, alignContent: 'stretch', marginTop: 12 }}>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>วันเกิด</Text>
                    <TouchableOpacity onPress={showDatepicker} style={{ width: '100%', marginVertical: 6 }}>
                        <TextInput
                            style={[styles.input, { padding: 12 }]}
                            placeholder={"วันเกิด"}
                            value={new Date(addData.birth).toLocaleDateString('th-TH')}
                            editable={false}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกเพศ</Text>
                    <DropDownPicker
                        open={listOpen2}
                        value={addData.gender}
                        items={listGender}
                        setOpen={setListOpen2}
                        setValue={(callback) => {
                            setAddData(prev => ({
                                ...prev,
                                gender: callback(prev.gender)
                            }))
                        }}
                        listMode="SCROLLVIEW"
                        multiple={false}
                        style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, zIndex: 0 }}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 8, alignContent: 'stretch' }}>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>น้ำหนัก</Text>
                    <TextInput
                        style={[styles.input, { padding: 12, marginVertical: 6 }]}
                        value={(addData.weight).toString()}
                        keyboardType="default"
                        onChangeText={(text) => setAddData(prev => ({ ...prev, weight: Number(text) }))}
                    />
                </View>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>สายพันธุ์</Text>
                    <DropDownPicker
                        open={listOpen3}
                        value={addData.breed}
                        items={listBreed}
                        setOpen={setListOpen3}
                        setValue={(callback) => {
                            setAddData(prev => ({
                                ...prev,
                                breed: callback(prev.breed)
                            }))
                        }}
                        listMode="SCROLLVIEW"
                        multiple={false}
                        style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, zIndex: 0 }}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 8, alignContent: 'stretch' }}>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>พ่อพันธุ์</Text>
                    <TextInput
                        style={[styles.input, { padding: 12, marginVertical: 6 }]}
                        value={addData.dad}
                        keyboardType="default"
                        onChangeText={(text) => setAddData(prev => ({ ...prev, dad: text }))}
                    />
                </View>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>แม่พันธุ์</Text>
                    <TextInput
                        style={[styles.input, { padding: 12, marginVertical: 6 }]}
                        value={addData.mom}
                        keyboardType="default"
                        onChangeText={(text) => setAddData(prev => ({ ...prev, mom: text }))}
                    />
                </View>
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>สถานะ</Text>
            <DropDownPicker
                open={listOpen4}
                value={addData.status}
                items={statusOrder}
                listMode="SCROLLVIEW"
                setOpen={setListOpen4}
                setValue={(callback) => {
                    setAddData(prev => ({
                        ...prev,
                        status: callback(prev.status)
                    }))
                }}
                multiple={false}
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, zIndex: 0 }}
            />
            <View style={{ padding: 12 }} />
            <Button text="บันทึก" theme="green" fn={() => {
                onEditAnimal(
                    nameEdit,
                    addData.name,
                    addData.gender,
                    addData.birth / 1000,
                    addData.weight,
                    addData.status,
                    addData.pen
                );
                closeModal();
            }} />
            <Button text="ยกเลิก" theme="gray" fn={() => {
                setAddData(initialData);
                closeModal();
            }} />
            <View style={{ paddingVertical: 24 }}></View>
            <Text style={[TextStyles.text_head5_red, { textAlign: 'left', width: '100%', paddingVertical: 6 }]}>ลบรายการสัตว์</Text>
            <Button text="ลบสัตว์" theme="red" fn={() => {
                deleteAnimalByName(nameEdit);
                closeModal();
            }} />
            {show && <DateTimePicker
                value={new Date(addData.birth)}
                mode="date"
                display="default"
                onChange={onChangeDate}
            />}
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