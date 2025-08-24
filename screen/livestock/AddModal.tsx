import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../components/button/Button';
import { AnimalContext, AnimalProps } from '../../contexts/ListAnimalContext';
import styles from './Styles';

interface SettingsModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export type SettingProps = {
    lang: string;
    theme: string;
    fontsizre: number;
};

export const defaultSetting: SettingProps = {
    lang: 'THA',
    theme: 'light',
    fontsizre: 20,
};

export type SettingContextType = {
    nowSetting: SettingProps;
    setNowSetting: React.Dispatch<React.SetStateAction<SettingProps>>;
    changeLang: (lang: string) => void;
}

export const SettingContext = createContext<SettingContextType>({
    nowSetting: defaultSetting,
    setNowSetting: () => { },
    changeLang: () => { },
});

const formDefault = {
    addId: "XX000",
    addName: "",
    addSex: "m",
    addMass: "",
    addPedigree: "",
    addDad: "",
    addMom: "",
    addDate: new Date(),
};

const AddModal: React.FC<SettingsModalProps> = ({ isVisible, onClose }) => {
    const { animals, setAnimal } = useContext(AnimalContext);
    const [form, setForm] = useState(formDefault);
    const setField = (key: keyof typeof form, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const {
        addId,
        addName,
        addSex,
        addMass,
        addPedigree,
        addDad,
        addMom,
        addDate,
    } = form;

    const [show, setShow] = useState(false);
    const [lock, setLock] = useState(false);
    const setting = useContext(SettingContext);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setField('addDate', selectedDate);
            setShow(false)
        }
    };
    const showDatepicker = () => {
        setShow(true);
    };
    const onSave = () => {
        setAnimal({
            id: (animals.length + 1).toString(),
            name: addName,
            code: addId,
            gender: addSex === 'm' ? 'ผู้' : 'เมีย',
            weight: addMass ? Number(addMass) : 0,
            age: addDate ? Math.floor((new Date().getTime() - addDate.getTime()) / (1000 * 60 * 60 * 24 * 365)) : 0,
            status: 'ปกติ'
        } as AnimalProps
        );
        onClose();
        setForm(formDefault);
        const dataToSave = JSON.stringify({
            id: addId,
            name: addName,
            code: addId,
            gender: addSex === 'm' ? 'ผู้' : 'เมีย',
            age: addDate ? Math.floor((new Date().getTime() - addDate.getTime()) / (1000 * 60 * 60 * 24 * 365)) : 0,
            weight: addMass ? Number(addMass) : 0,
            status: 'ปกติ'
        });


        const dirUri = FileSystem.documentDirectory + 'data/';
        const fileUri = dirUri + `${addId}.txt`; // Ensure `addId` is defined and consistent
        (async () => {
            try {
                // Create directory if needed
                const dirInfo = await FileSystem.getInfoAsync(dirUri);
                if (!dirInfo.exists) {
                    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
                }

                // Write the file
                await FileSystem.writeAsStringAsync(fileUri, dataToSave);
                console.log("File written:", fileUri);

                // Confirm file exists
                const fileInfo = await FileSystem.getInfoAsync(fileUri);
                console.log("File exists after write:", fileInfo.exists);
                // Read all file names in the directory
                const dirFiles = await FileSystem.readDirectoryAsync(dirUri);
                console.log("Files in directory:", dirFiles);
                if (fileInfo.exists) {
                    const content = await FileSystem.readAsStringAsync(fileUri);
                    console.log("Read content:", content);
                } else {
                    console.warn("File not found when trying to read.");
                }

            } catch (error) {
                console.error("Error during file write/read:", error);
            }
        })();
        // FileSystem.readAsStringAsync(fileUri)
        //     .then(content => {
        //         console.log('File content:', content);
        //     })
        //     .catch(err => {
        //         console.log('Read file error:', err);
        //     });
    }

    useEffect(() => {
        setting.changeLang(setting.nowSetting.lang);
        setLock(false)
    }, []);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            swipeDirection="down"
            style={styles.addmodal_styles.modal}
            backdropTransitionOutTiming={0}
            scrollHorizontal={false}
            propagateSwipe={true}
            avoidKeyboard={true}
        >
            <ScrollView style={[styles.addmodal_styles.container, { maxHeight: '60%' }]}>
                <Text style={styles.addmodal_styles.title}>เพิ่มรายการปศุสัตว์</Text>
                <View style={{ display: lock ? 'none' : 'contents' }}>
                    <Text style={styles.addmodal_styles.label}>ID</Text>
                    <TextInput
                        style={styles.addmodal_styles.input}
                        placeholder={"ID"}
                        value={addId}
                        onChangeText={e => setField('addId', e)}
                    />
                    <Text style={styles.addmodal_styles.label}>ชื่อสัตว์</Text>
                    <TextInput
                        style={styles.addmodal_styles.input}
                        placeholder={"ชื่อสัตว์"}
                        value={addName}
                        onChangeText={e => setField('addName', e)}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                        <View style={{ display: 'flex', width: '48%' }}>
                            <Text style={styles.addmodal_styles.label}>เพศ</Text>
                            <View style={styles.addmodal_styles.buttonRow}>
                                <Pressable onPress={() => setField('addSex', 'm')} style={addSex == 'm' ? styles.addmodal_styles.activeButton : styles.addmodal_styles.inactiveButton}>
                                    <Text style={addSex == 'm' ? styles.addmodal_styles.buttonRow_text_active : styles.addmodal_styles.buttonRow_text_inactive}>ผู้</Text>
                                </Pressable>
                                <Pressable onPress={() => setField('addSex', 'w')} style={addSex == 'w' ? styles.addmodal_styles.activeButton : styles.addmodal_styles.inactiveButton}>
                                    <Text style={addSex == 'w' ? styles.addmodal_styles.buttonRow_text_active : styles.addmodal_styles.buttonRow_text_inactive}>เมีย</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{ display: 'flex', width: '48%' }}>
                            <Text style={styles.addmodal_styles.label}>วันเกิด</Text>
                            <TouchableOpacity onPress={showDatepicker}>
                                <TextInput
                                    style={styles.addmodal_styles.input}
                                    placeholder={"วันเกิด"}
                                    value={addDate.toLocaleDateString()}
                                    editable={false}
                                    pointerEvents="none"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                        <View style={{ display: 'flex', width: '48%' }}>
                            <Text style={styles.addmodal_styles.label}>น้ำหนัก</Text>
                            <TextInput
                                style={styles.addmodal_styles.input}
                                placeholder={"น้ำหนัก"}
                                value={addMass}
                                onChangeText={e => setField('addMass', e)}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ display: 'flex', width: '48%' }}>
                            <Text style={styles.addmodal_styles.label}>สายพันธุ์</Text>
                            <TextInput
                                style={styles.addmodal_styles.input}
                                placeholder={"สายพันธุ์"}
                                value={addPedigree}
                                onChangeText={e => setField('addPedigree', e)}
                            />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                        <View style={{ display: 'flex', width: '48%' }}>
                            <Text style={styles.addmodal_styles.label}>พ่อพันธุ์</Text>
                            <TextInput
                                style={styles.addmodal_styles.input}
                                placeholder={"พ่อพันธุ์"}
                                value={addDad}
                                onChangeText={e => setField('addDad', e)}
                            />
                        </View>
                        <View style={{ display: 'flex', width: '48%' }}>
                            <Text style={styles.addmodal_styles.label}>แม่พันธุ์</Text>
                            <TextInput
                                style={styles.addmodal_styles.input}
                                placeholder={"แม่พันธุ์"}
                                value={addMom}
                                onChangeText={e => setField('addMom', e)}
                            />
                        </View>
                    </View>
                </View>
                {show && <DateTimePicker
                    value={addDate}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />}
                <View style={{ height: 32 }} />
                {
                    lock ? (
                        <Button text='ปลดล็อกขีดจำกัด' theme='lock' fn={onSave} />
                    ) : (
                        <Button text='บันทึกข้อมูล' theme='green' fn={onSave} />
                    )
                }
                <View style={{ height: 42 }} />
            </ScrollView>
        </Modal>
    );
};

export default AddModal;