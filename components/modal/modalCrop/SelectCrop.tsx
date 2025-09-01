import TextStyles from "@/constants/Texts";
import { Pressable, Text, View } from "react-native";

interface Props {
    changePage: (page: number) => void;
    selectCrop: string;
}

export const SelectCrop = ({ changePage, selectCrop }: Props) => {
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>จัดการ {selectCrop}</Text>
            <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(2) }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ดูสัตว์ในคอก</Text>
                </Pressable>
                <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(3) }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ย้ายสัตว์เข้าคอก</Text>
                </Pressable>
                <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(4) }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>ถอดสัตว์ออกจากคอก</Text>
                </Pressable>
                <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(5) }}>
                    <Text style={[TextStyles.text_head5_red, { textAlign: 'left', width: '100%' }]}>ลบคอก</Text>
                </Pressable>
            </View>
        </View>
    )
}