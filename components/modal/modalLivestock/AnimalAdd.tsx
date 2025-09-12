import Button from '@/components/button/Button';
import TextStyles from "@/constants/Texts";
import { demo_crop } from '@/data/FetchData';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    closeModal: () => void;
    onAddAnimal: (addId: string, addName: string, addSex: string, addDate: Date, addMass: string) => void;
}

export const AnimalAdd = ({ closeModal, onAddAnimal }: Props) => {

    const [listOpen1, setListOpen1] = useState<boolean>(false);
    const [listOpen2, setListOpen2] = useState<boolean>(false);
    const [listOpen3, setListOpen3] = useState<boolean>(false);
    const [show, setShow] = useState(false);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setAddData(prev => ({ ...prev, birthday: selectedDate.toISOString() }));
            setShow(false)
        }
    };
    const showDatepicker = () => {
        setShow(true);
    };
    const [addData, setAddData] = useState<{
        name: string;
        crop: string;
        gender: string;
        birthday: string;
        weight: string;
        dad: string;
        mom: string;
        breed: string;
    }>({
        name: '',
        crop: '',
        gender: '',
        birthday: '',
        weight: '',
        dad: '',
        mom: '',
        breed: ''
    });

    const demoCrop = demo_crop;
    const listCrop = demoCrop.map((item) => ({
        label: item.name,
        value: item.id,
    }));
    const listGender = [
        { label: 'เพศผู้', value: 'male' },
        { label: 'เพศเมีย', value: 'female' }
    ];
    const listBreed = [
        { label: 'พันธุ์ A', value: 'breed_a' },
        { label: 'พันธุ์ B', value: 'breed_b' },
        { label: 'พันธุ์ C', value: 'breed_c' }
    ];

    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>เพิ่มรายการสัตว์</Text>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ชื่อสัตว์</Text>
            <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                <TextInput
                    style={[styles.input, {padding: 12}]}
                    value={addData.name}
                    keyboardType="default"
                    onChangeText={(text) => setAddData(prev => ({ ...prev, name: text }))}
                />
                {/* <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text> */}
            </View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกคอก</Text>
            <DropDownPicker
                open={listOpen1}
                value={addData.crop}
                items={listCrop}
                setOpen={setListOpen1}
                setValue={(callback) => {
                    setAddData(prev => ({
                        ...prev,
                        crop: callback(prev.crop)
                    }))
                }}
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
                            value={addData.birthday !== "" ? new Date(addData.birthday).toLocaleDateString() : ''}
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
                        value={addData.weight}
                        keyboardType="default"
                        onChangeText={(text) => setAddData(prev => ({ ...prev, weight: text }))}
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
                        multiple={false}
                        style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, zIndex: 0 }}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 8, alignContent: 'stretch', marginBottom: 18 }}>
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

            <Button text="บันทึก" theme="green" fn={() => {
                onAddAnimal(
                    addData.name,
                    addData.name,
                    addData.gender,
                    new Date(addData.birthday),
                    addData.weight
                )
                closeModal();
            }} />
            {show && <DateTimePicker
                value={addData.birthday ? new Date(addData.birthday) : new Date()}
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