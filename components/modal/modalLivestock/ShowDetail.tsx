import AnimalCard from "@/components/petCard/PetcardMain";
import SummaryCard from "@/components/summaryCard/SummaryCard";
import TextStyles from "@/constants/Texts";
import { Pressable, Text, View } from "react-native";

type Props = {
    closeModal: () => void;
    demo_animal_detail: any;
}
type AnimalStatus = 'ปกติ' | 'ติดสัด' | 'ผิดปกติ' | 'ส่งออก' | 'ตาย' | 'ว่าง';

type Animal = {
    id: string;
    name: string;
    code: string;
    gender: 'ผู้' | 'เมีย';
    age: number;
    weight: number;
    status: AnimalStatus;
};
export const ShowDetail = ({ closeModal, demo_animal_detail }: Props) => {
    const animal: Animal = {
        id: demo_animal_detail.id,
        name: demo_animal_detail.name,
        code: demo_animal_detail.id,
        gender: demo_animal_detail.gender,
        age: demo_animal_detail.age,
        weight: demo_animal_detail.weight,
        status: "ปกติ",
    };
    return (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1, marginBottom: 8 }} onPress={() => { closeModal() }}>
                    <AnimalCard animals={animal} gridView={true} fn={() => { closeModal() }} />
                </Pressable>
                <Text style={[TextStyles.text_head4_gray, { paddingHorizontal: 12 }]}>รายละเอียด</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap', marginVertical: 8 }}>
                    <SummaryCard
                        title="สุขภาพ"
                        textHead={"ปกติ"}
                        textSub1={"ประวัติการป่วย"}
                        textValue1={demo_animal_detail.health.sick_count + " ครั้ง"}
                        textSub2={"ป่วยล่าสุด"}
                        textValue2={demo_animal_detail.health.sick_last}
                        textUnit={""}
                        status={demo_animal_detail.health.status}
                        dot={false}
                        lock={false}
                        onClick={() => { }}
                    />
                    <SummaryCard
                        title="ปริมาณน้ำนม"
                        textHead={"ต่ำกว่าปกติ"}
                        textSub1={"ปริมาณที่ได้"}
                        textValue1={demo_animal_detail.milk.milked_quantity + " ลิตร"}
                        textSub2={"วันที่ให้นม"}
                        textValue2={demo_animal_detail.milk.milked_last}
                        textUnit={""}
                        status={demo_animal_detail.milk.status}
                        dot={false}
                        lock={false}
                        onClick={() => { }}
                    />
                    <SummaryCard
                        title="การเติบโต"
                        textHead={"ปกติ"}
                        textSub1={"น้ำหนัก"}
                        textValue1={demo_animal_detail.grow.weight + " Kg."}
                        textSub2={"ส่วนสูง"}
                        textValue2={demo_animal_detail.grow.height + " cm."}
                        textUnit={""}
                        status={demo_animal_detail.grow.status}
                        dot={false}
                        lock={false}
                        onClick={() => { }}
                    />
                    <SummaryCard
                        title="ติดสัด"
                        textHead={"อีก 4 วัน"}
                        textSub1={"คาดการณ์"}
                        textValue1={demo_animal_detail.heat.heat_next}
                        textSub2={"ติดสัดล่าสุด"}
                        textValue2={"12/5/2565"}
                        textUnit={""}
                        status={"normal"}
                        dot={false}
                        lock={false}
                        onClick={() => { }}
                    />
                </View>
            </View>
        </View>
    )
}