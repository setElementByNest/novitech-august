import { Colors } from '@/constants/Colors';
import TextStyles from '@/constants/Texts';
import { IsLoginContext } from '@/contexts/IsLoginContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const LoginFarmCreated = ({ setPage }: Props) => {
    const { setIsLoggedIn } = useContext(IsLoginContext);

    const onPressStart = () => {
        setIsLoggedIn(true);
        setPage(0);
    }

    return (
        <ScrollView style={{ height: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.logincreatedone_styles.container}>
                <Text style={TextStyles.text_head1}>สร้างฟาร์มเสร็จสิ้น</Text>
                <Text style={TextStyles.text_head5_gray}>กดปุ่มเริ่มใช้งาน</Text>
                <TouchableOpacity style={styles.logincreatedone_styles.nextIcon} onPress={onPressStart}>
                    <Text style={[styles.logincreatedone_styles.nextIconText, { color: Colors.light.main }]}>เริ่มใช้งาน</Text>
                    <MaterialCommunityIcons name="arrow-right-circle" size={80} color={Colors.light.main} />
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

export default LoginFarmCreated