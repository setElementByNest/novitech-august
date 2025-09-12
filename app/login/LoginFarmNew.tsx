import { Colors } from '@/constants/Colors';
import TextStyles from '@/constants/Texts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './Styles';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const LoginFarmNew = ({ setPage }: Props) => {
    const [farmName, setFarmName] = useState<string | null>(null);
    const onPressNext = () => {
        if (!(farmName == null || farmName == '')) {
            setPage(3);
        }
    }
    const validText = (text: string) => {
        const textRegex = /^[A-Za-z0-9ก-๏\s]+$/;
        return textRegex.test(text) && text.length <= 20;
    }
    return (
        <ScrollView style={{ height: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.logincreatefarm_styles.container}>

                <Text style={TextStyles.text_head1}>ตั้งชื่อฟาร์ม</Text>
                <Text style={[TextStyles.text_head5_gray, { paddingVertical: 12 }]}>ชื่อไม่เกิน 20 ตัวอักษร</Text>
                <TextInput
                    style={styles.logincreatefarm_styles.input}
                    placeholder="ชื่อฟาร์มของคุณ"
                    maxLength={20}
                    value={farmName ?? ''}
                    onChangeText={setFarmName}
                />
                <TouchableOpacity style={styles.logincreatefarm_styles.nextIcon} onPress={onPressNext}>
                    <Text style={[styles.logincreatefarm_styles.nextIconText, { color: validText(farmName ?? '') ? Colors.light.main : Colors.light.gray_light }]}>ถัดไป</Text>
                    <MaterialCommunityIcons name="arrow-right-circle" size={80} color={validText(farmName ?? '') ? Colors.light.main : Colors.light.gray_light} />
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

export default LoginFarmNew