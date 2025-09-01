import Button from "@/components/button/Button";
import TextStyles from "@/constants/Texts";
import { Text, View } from "react-native";

interface Props {
    closeModal: () => void;
    selectCrop: string;
}

export const CropDelete = ({ closeModal, selectCrop }: Props) => {
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>ยืนยันการลบ {selectCrop}</Text>
            <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Button text="ยืนยัน" theme="red" fn={closeModal} />
                <Button text="ยกเลิก" theme="gray" fn={closeModal} />
            </View>
        </View>
    )
}