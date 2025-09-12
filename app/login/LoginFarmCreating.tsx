import { Colors } from '@/constants/Colors';
import TextStyles from '@/constants/Texts';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Bar } from 'react-native-progress';
import styles from './Styles';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const LoginFarmCreating = ({ setPage }: Props) => {
    const [percent, setPercent] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((prev: number) => {
                if (prev < 1) {
                    return prev + 0.2;
                } else {
                    clearInterval(interval); // Clear here or inside cleanup
                    return prev;
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (percent >= 1) {
            setPage(4);
        }
    }, [percent]);
    return (
        <ScrollView style={{ height: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.logincreatingfarm_styles.container}>
                <Text style={TextStyles.text_head1}>กำลังสร้างฟาร์ม</Text>
                <Text style={TextStyles.text_head5_gray}>กรุณารอสักครู่</Text>
                <View style={[styles.logincreatingfarm_styles.progressContainer]}>
                    <Text style={TextStyles.text_head5_gray}>{Math.round(percent * 100)}%</Text>
                    <Bar
                        progress={percent}
                        height={12}
                        width={null}
                        borderRadius={6}
                        color={Colors.light.main}
                        unfilledColor="#E0E0E0"
                        borderWidth={0}
                        style={{ width: '80%' }}
                    />
                </View>
            </View>
        </ScrollView>

    )
}
export default LoginFarmCreating