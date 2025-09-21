import { Colors } from "@/constants/Colors";
import TextStyles from "@/constants/Texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
    setModuleName: (name: string) => void;
}

export const VaccineList = ({ changePage, setModuleName }: Props) => {

    const [vaccine, setVaccine] = useState<VaccineList[]>([]);

    const handleToggleUse = (index: number) => {
        const updatedVaccine = [...vaccine];
        updatedVaccine[index].use = !updatedVaccine[index].use;
        updatedVaccine.forEach((v, i) => {
            if ((i !== index) && v.type === updatedVaccine[index].type) {
                v.use = false;
            }
        });
        setVaccine(updatedVaccine);
    }

    const handleDeleteVaccine = (index: number) => {
        const updatedVaccine = [...vaccine];
        updatedVaccine.splice(index, 1);
        setVaccine(updatedVaccine);
    }

    const openAddVaccineModal = () => {
        changePage(3);
    }

    const openEditVaccineModule = (name: string) => {
        setModuleName(name);
        changePage(4);
        console.log(name);
    }

    useEffect(() => {
        setVaccine(demo_vaccine_list);
    }, []);

    return (
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>รายการชุดวัคซีน</Text>
            {
                vaccine.map((v, i) => {
                    return (
                        <View key={i} style={styles.card}>
                            <View style={styles.card_header}>
                                <Text style={[styles.card_header_text, { marginTop: 4 }]}>{v.name}</Text>
                                <View style={[styles.statusOriginal, { display: v.original ? "flex" : "none" }]}>
                                    <Text style={[styles.statusTextBlack]}>เริ่มต้น</Text>
                                </View>
                                <View style={[styles.statusUse, { display: v.use ? "flex" : "none" }]}>
                                    <Text style={[styles.statusText]}>ใช้งาน</Text>
                                </View>
                            </View>
                            {
                                vaccine[i].list.map((item, j) => {
                                    return (
                                        <View key={j} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[TextStyles.text_head5_gray]}>{item.name}</Text>
                                            <Text style={[TextStyles.text_head5_gray]}>{item.dose} {item.doseUnit} ทุก {item.period} เดือน</Text>
                                        </View>
                                    )
                                })
                            }

                            <View style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', alignContent: 'stretch' }}>
                                <Pressable onPress={() => !v.original ? handleDeleteVaccine(i) : null} style={[!v.original ? styles.miniButton_red : styles.miniButton_gray_light]}>
                                    <Text style={[TextStyles.text_head5, { color: !v.original ? Colors.light.red : Colors.light.gray_light }]}>ลบชุด</Text>
                                </Pressable>
                                <Pressable onPress={() => !v.original ? openEditVaccineModule(v.name) : null} style={[!v.original ? styles.miniButton_gray : styles.miniButton_gray_light]}>
                                    <Text style={[TextStyles.text_head5, { color: !v.original ? Colors.light.dark : Colors.light.gray_light }]}>แก้ไข</Text>
                                </Pressable>
                                <Pressable onPress={() => !v.use ? handleToggleUse(i) : null} style={[v.use ? styles.miniButton_gray_light : styles.miniButton_green]}>
                                    <Text style={[TextStyles.text_head5, { color: v.use ? Colors.light.gray : Colors.light.main }]}>ตั้งใช้งาน</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                })
            }

            <Pressable onPress={openAddVaccineModal} >
                <View style={{ marginTop: 24, backgroundColor: Colors.light.gray_light, borderRadius: 32, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <MaterialCommunityIcons name="plus" size={24} color={'white'} />
                </View>
                <Text style={TextStyles.text_head5_gray}>เพิ่มชุดวัคซีน</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        margin: 0,
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