import TextStyles from "@/constants/Texts";
import { Pressable, Text, View } from "react-native";

interface Props {
    changePage: (page: number) => void;
}

export const SelectGlow = ({ changePage }: Props) => {
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>จัดการการเติบโต</Text>
            <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(1) }}>
                    <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>บันทึกการเติบโต</Text>
                </Pressable>
            </View>
        </View>
    )
}