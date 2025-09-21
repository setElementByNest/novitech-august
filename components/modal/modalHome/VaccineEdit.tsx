import Button from "@/components/button/Button";
import { Colors } from "@/constants/Colors";
import TextStyles from "@/constants/Texts";
import { dataListVaccines } from "@/data/FetchData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import demo_vaccine_list from '../../../data/json/infoVaccine.json';

interface VaccineList {
    name: string;
    type: string;
    use: boolean;
    original: boolean;
    list: VaccineListItem[];
}

interface VaccineListItem {
    name: string;
    dose: number;
    period: number;
    doseUnit: string;
}
interface Props {
    changePage: (page: number) => void;
    moduleName: string;
    setModuleName: (name: string) => void;
}

const empty_vaccine: VaccineList = {
    name: "",
    type: "",
    use: false,
    original: false,
    list: []
};

const empty_vaccine_item: VaccineListItem = {
    name: "",
    dose: 1,
    period: 1,
    doseUnit: "โดส"
};

export const VaccineEdit = ({ changePage, moduleName, setModuleName }: Props) => {
    ;

    const listVaccine = dataListVaccines.map((v) => v.name);

    const [nowModule, setNowModule] = useState<VaccineList>(empty_vaccine);

    const [nowSelect1, setNowSelect1] = useState<string>('');
    const [nowPeriod, setNowPeriod] = useState<number>(1);
    const [nowPeriodText, setNowPeriodText] = useState<string>('ทุก 1 เดือน');
    const [nowDose, setNowDose] = useState<number>(1);
    const [nowDoseText, setNowDoseText] = useState<string>('1 โดส');
    const [nowDoseUnit, setNowDoseUnit] = useState<boolean>(false);

    const [nowList, setNowList] = useState<VaccineListItem[]>([empty_vaccine_item]);
    const [dropList, setDropList] = useState<string[]>(listVaccine);
    const [listOpenA, setListOpenA] = useState<boolean>(false);
    const [nowChange, setChange] = useState<string>('');
    const [nameModule, setNameModule] = useState<string>('');

    const listType = [
        { label: 'ชุดวัคซีนแรกเกิด', value: 'newborn' },
        { label: 'ชุดวัคซีน 1-3 ปี', value: 'fewyears' },
        { label: 'ชุดวัคซีนแม่ให้นม', value: 'mom' },
        { label: 'กำหนดเอง', value: 'custom' },
    ]

    const onSave = () => {
        // setNowList([]);
        // setDropList(listVaccine);
        // changePage(2);
        const formlist: VaccineList = {
            name: nameModule,
            type: nowChange,
            use: false,
            original: false,
            list: nowList
        }
        console.log(formlist);
    }

    const onCancel = () => {
        setNowList([]);
        setDropList(listVaccine);
        changePage(2);
        setChange('');
        setNameModule('');
        setModuleName('');
    }

    const onDrop = (name: string) => {
        setNowList((prev) => prev.filter((item) => item.name !== name));
        setDropList((prev) => [...prev, listVaccine.find((item) => item === name)!]);
    }
    const onComeBack = (name: string) => {
        setNowList((prev) => [
            ...prev,
            {
                name: name,
                dose: nowDose,
                period: nowPeriod,
                doseUnit: nowDoseUnit ? 'ml' : 'โดส'
            }
        ]);
        setDropList((prev) => prev.filter((item) => item !== name));
        onSettingCancel();
    }
    const onSettingCancel = () => {
        setNowSelect1('');
        setNowPeriod(1);
        setNowPeriodText('ทุก 1 เดือน');
        setNowDose(1);
        setNowDoseText('1 โดส');
        setNowDoseUnit(false);
    }
    const onSetting = (name: string) => {
        setNowSelect1(name);
    }
    const openVaccineModals = () => {
        changePage(2);
    }
    const showPersiod_add = () => {
        if (nowPeriod < 12) {
            const np = nowPeriod + 1;
            setNowPeriod(np);
            setNowPeriodText(`ทุก  ${np}  เดือน`);
        }
    }
    const showPersiod_dis = () => {
        if (nowPeriod > 1) {
            const np = nowPeriod - 1;
            setNowPeriod(np);
            setNowPeriodText(`ทุก  ${np}  เดือน`);
        }
    }
    const showDose_add = () => {
        if (nowDose < 20) {
            const np = nowDose + 1;
            setNowDose(np);
            setNowDoseText(`${np}  ${nowDoseUnit ? 'ml' : 'โดส'}`);
        }
    }
    const showDose_dis = () => {
        if (nowDose > 1) {
            const np = nowDose - 1;
            setNowDose(np);
            setNowDoseText(`${np}  ${nowDoseUnit ? 'ml' : 'โดส'}`);
        }
    }

    // useEffect(() => {
    //     setChange('');
    // }, []);

    useEffect(() => {
        const nm = demo_vaccine_list.find((v) => v.name === moduleName) ?? empty_vaccine;
        const listVaccine_beforeHave = nm.list;
        const listVaccine_beforeNot = listVaccine.filter((v) => !nm.list.some((nv) => nv.name === v));
        setNowModule(nm);
        setNowList(listVaccine_beforeHave);
        setDropList(listVaccine_beforeNot);
        setChange(nm.type);
        setNameModule(nm.name);

        console.log(moduleName, nowModule);
    }, [moduleName]);

    return (
        <ScrollView contentContainerStyle={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 24 }}>
            <Text style={TextStyles.text_head2}>เพิ่มชุดวัคซีน</Text>
            <View style={{ padding: 12 }}></View>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ประเภท</Text>
            <DropDownPicker
                open={listOpenA}
                value={nowChange}
                items={listType.map((item) => ({ label: item.label, value: item.value }))}
                setOpen={setListOpenA}
                setValue={setChange}
                multiple={false}
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, zIndex: 0 }}
                listMode="SCROLLVIEW"
            />

            <TextInput
                style={[styles.input, { padding: 12, marginVertical: 6 }]}
                value={nameModule}
                keyboardType="default"
                onChangeText={(text) => setNameModule(text)}
                placeholder="ชื่อชุดวัคซีน"
            />
            <View style={{ paddingTop: 12, display: nowList.length === 0 ? 'none' : 'flex', width: '100%' }}>
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%', display: nowList.length === 0 ? 'none' : 'flex' }]}>รายการที่เพิ่มแล้ว</Text>
                <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                    {
                        nowList.map((item, index) => (
                            <View key={index} style={[styles.input, { borderColor: Colors.light.gray_light }]}>
                                <Text style={[TextStyles.text_head4]}>
                                    {item.name}
                                </Text>
                                <Pressable onPress={() => onDrop(item.name)} style={{ position: 'absolute', right: 12, top: 8, }}>
                                    <MaterialCommunityIcons style={[{ color: Colors.light.red, fontSize: 24 }]} name='delete' />
                                </Pressable>
                            </View>
                        ))
                    }
                    {/* <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text> */}
                </View>
            </View>
            <View style={{ paddingVertical: 12, display: nowSelect1 === '' ? 'none' : 'flex', width: '100%' }}>
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ตั้งค่า ก่อนเพิ่มรายการ</Text>
                <View style={{ position: 'relative', width: '100%', marginVertical: 12 }}>
                    <View style={[styles.input, { borderColor: Colors.light.gray_light }]}>
                        <Text style={[TextStyles.text_head4]}>
                            {nowSelect1}
                        </Text>
                        <Pressable onPress={onSettingCancel} style={{ position: 'absolute', right: 12, top: 8, }}>
                            <MaterialCommunityIcons style={[{ color: Colors.light.red, fontSize: 24 }]} name='delete' />
                        </Pressable>
                    </View>
                    <View style={{ padding: 6, display: 'flex', gap: 12, flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                        {/* <Text style={[TextStyles.text_head4, { textAlign: 'center', padding: 0, marginBottom: 2 }]}>{"ระยะการให้"}</Text> */}
                        <Pressable onPress={showPersiod_dis} style={{ backgroundColor: Colors.light.main, borderRadius: 24, width: 24, height: 24, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <MaterialCommunityIcons name="minus" size={16} color={'white'} />
                        </Pressable>
                        <Text style={[TextStyles.text_head4, { textAlign: 'center', padding: 0, marginBottom: 2, width: 100 }]}>{nowPeriodText}</Text>
                        <Pressable onPress={showPersiod_add} style={{ backgroundColor: Colors.light.main, borderRadius: 24, width: 24, height: 24, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <MaterialCommunityIcons name="plus" size={16} color={'white'} />
                        </Pressable>
                    </View>
                    <View style={{ padding: 6, display: 'flex', gap: 12, flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                        {/* <Text style={[TextStyles.text_head4, { textAlign: 'center', padding: 0, marginBottom: 2 }]}>{"ปริมาณ"}</Text> */}
                        <Pressable onPress={showDose_dis} style={{ backgroundColor: Colors.light.main, borderRadius: 24, width: 24, height: 24, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <MaterialCommunityIcons name="minus" size={16} color={'white'} />
                        </Pressable>
                        <Text style={[TextStyles.text_head4, { textAlign: 'center', padding: 0, marginBottom: 2, width: 75 }]}>{nowDoseText}</Text>
                        <Pressable onPress={showDose_add} style={{ backgroundColor: Colors.light.main, borderRadius: 24, width: 24, height: 24, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <MaterialCommunityIcons name="plus" size={16} color={'white'} />
                        </Pressable>
                    </View>
                </View>
                <Button text="เพิ่ม" theme="green" fn={() => onComeBack(nowSelect1)} />
            </View>
            <View style={{ paddingVertical: 12, display: nowSelect1 !== '' ? 'none' : 'flex', width: '100%' }}>
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%', display: dropList.length === 0 ? 'none' : 'flex' }]}>รายการที่สามารถเพิ่มได้</Text>
                <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                    {
                        dropList.map((item, index) => (
                            <View key={index} style={[styles.input, { borderColor: Colors.light.gray_light }]}>
                                <Text style={[TextStyles.text_head4]}>
                                    {item}
                                </Text>
                                <Pressable onPress={() => onSetting(item)} style={{ position: 'absolute', right: 12, top: 8, }}>
                                    <MaterialCommunityIcons style={[{ color: Colors.light.main, fontSize: 24 }]} name='plus' />
                                </Pressable>
                            </View>
                        ))
                    }
                </View>

                <Button text="บันทึก" theme="green" fn={onSave} />
                <Button text="ยกเลิก" theme="gray" fn={onCancel} />
            </View>
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
    },
    card: {
        marginVertical: 0,
        marginTop: 6,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#eaeaea',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        width: '100%',
    },
    card_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        alignContent: 'center',
    },
    card_header_text: {
        fontSize: 20,
        fontFamily: 'Kanit400',
        color: '#000000ff',
        margin: 0,
        padding: 0,
    },
    statusUse: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 50,
        alignSelf: 'flex-start',
        backgroundColor: Colors.light.main,
        marginLeft: 8,
    },
    statusOriginal: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 50,
        alignSelf: 'flex-start',
        backgroundColor: Colors.light.gray_light,
        marginLeft: 8,
    },
    statusText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    statusTextBlack: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    miniButton_red: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1.4,
        borderColor: Colors.light.red,
        width: '32%',
        alignItems: 'center',
    },
    miniButton_gray: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1.4,
        borderColor: Colors.light.dark,
        width: '32%',
        alignItems: 'center',
    },
    miniButton_gray_light: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: '#ccc',
        width: '32%',
        opacity: 0.4,
        alignItems: 'center',
    },
    miniButton_green: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1.4,
        borderColor: Colors.light.main,
        width: '32%',
        alignItems: 'center',
    },
})