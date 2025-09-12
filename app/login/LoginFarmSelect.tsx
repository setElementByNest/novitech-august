import { Colors } from '@/constants/Colors';
import TextStyles from '@/constants/Texts';
import { IsLoginContext } from '@/contexts/IsLoginContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './Styles';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const LoginFarmSelect = ({ setPage }: Props) => {
    const [selected, setSelected] = useState<number | null>(null);

    const dataSelectFarm = [
        {
            id: 1,
            name: 'Novitech Farm',
            detail: 'ฟาร์มเลี้ยงควาย',
            count: 20,
            warn: 0,
        },
        {
            id: 2,
            name: 'Chokchai Farm',
            detail: '-',
            count: 12,
            warn: 2,
        },
        {
            id: 3,
            name: 'A113 Farm',
            detail: 'ควายสวยงาม',
            count: 4,
            warn: 0,
        },
    ];

    const { setIsLoggedIn } = useContext(IsLoginContext);

    const handleSelectFarm = (id: number) => {
        setSelected(id);
    };

    const onPressNext = () => {
        if (selected !== null) {
            setIsLoggedIn(true);
            setPage(0);
        }
    }

    const onCreateNewFarm = () => {
        setPage(2);
        console.log('Create new farm');
    }

    return (
        <ScrollView style={{ height: '100%' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.loginselect_styles.container}>

                <Text style={TextStyles.text_head1}>ฟาร์มของคุณ</Text>
                <Text style={[TextStyles.text_head5_gray, { paddingVertical: 6 }]}>กดเพื่อเลือกฟาร์ม</Text>
                <View style={styles.loginselect_styles.selectLayout}>
                    {
                        dataSelectFarm.map((farm) => (
                            <TouchableOpacity
                                key={farm.id}
                                style={styles.loginselect_styles.selectFarmItem}
                                onPress={() => handleSelectFarm(farm.id)}
                            >
                                <View style={[styles.loginselect_styles.selectFarmItemImg,
                                selected === farm.id && { outlineColor: Colors.light.main }]}>
                                    <Text style={TextStyles.text_head2}>{farm.name}</Text>
                                    <Text style={TextStyles.text_head5_gray}>{farm.detail}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, width: '100%' }}>
                                        <Text style={TextStyles.text_head5}>จำนวนสัตว์: {farm.count} ตัว</Text>
                                        {farm.warn > 0 && <Text style={[TextStyles.text_head5_gray, { color: Colors.light.red }]}>แจ้งเตือน: {farm.warn} รายการ</Text>}
                                        {farm.warn == 0 && <Text style={[TextStyles.text_head5_gray, { color: Colors.light.main }]}>แจ้งเตือน: {farm.warn} รายการ</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                    <TouchableOpacity style={styles.loginselect_styles.selectFarmItem} onPress={onCreateNewFarm}>
                        <Text></Text>
                        <MaterialCommunityIcons name="plus-circle" size={40} color={Colors.light.gray_light} />
                        <Text style={TextStyles.text_head5_gray}>{"สร้างฟาร์มใหม่"}</Text>
                        <Text></Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginselect_styles.nextIcon} onPress={onPressNext}>
                    <Text style={[styles.loginselect_styles.nextIconText, { color: selected !== null ? Colors.light.main : Colors.light.gray_light }]}>เริ่มใช้งาน</Text>
                    <MaterialCommunityIcons name="arrow-right-circle" size={80} color={selected !== null ? Colors.light.main : Colors.light.gray_light} />
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

export default LoginFarmSelect