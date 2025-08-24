import Button from '@/components/button/Button';
import HomeFoodModal from '@/components/modal/HomeFoodModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FarmdetailCard from '../../components/farmdetailCard/FarmdetailCard';
import SummaryCard from '../../components/summaryCard/SummaryCard';
import { Colors } from '../../constants/Colors';
import TextStyles from '../../constants/Texts';
import { demo_animal, demo_crop, demo_summary, demo_task } from '../../data/FetchData';
import styles from './Styles';

type TaskProps = {
    name: string;
    status: string;
    timestamp: number;
    _id: number;
};

const Home = () => {
    const [listDay, setListDay] = useState<number[]>([]);
    const [lock, setLock] = useState<boolean>(false)
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [allTasks, setAllTasks] = useState<TaskProps[]>([]);
    const [selectDay, setSelectDay] = useState<number>(new Date().getDate());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalPage, setShowModalPage] = useState<number>(0);
    const [addFood, setAddFood] = useState(0);
    const [reportClick, setReportClick] = useState<string>("");

    const closeModal = () => {
        setShowModal(false);
        setAddFood(0);
        setShowModalPage(0);
        croplist_setOpen(false);
        croplist_setValue(data_crop[0]);
    }
    const openModal = (report: string) => {
        setShowModal(true);
        setReportClick(report)
    }


    useEffect(() => {
        const demoData = demo_task;
        const toDay = new Date();
        const showDemo = () => {
            const dataFilter = demoData.filter((task) => {
                // Collect unique days within +/- 3 days of today
                const taskDate = new Date(task.timestamp * 1000);
                const diff = Math.abs(taskDate.getTime() - toDay.getTime());
                return diff <= 259200000; // 3 days in ms
            });
            return dataFilter;
        };
        const filteredTasks = showDemo();
        // console.log("filteredTasks", filteredTasks)
        setAllTasks(filteredTasks);
        const days = [];
        for (let i = -3; i <= 3; i++) {
            const date = new Date(toDay);
            date.setDate(toDay.getDate() + i);
            days.push(date.getDate());
        }
        setListDay(days);
        setSelectDay(toDay.getDate());
        setTasks(
            filteredTasks.filter((task) => {
                const dayTask = new Date(task.timestamp * 1000);
                return dayTask.getDate() === toDay.getDate();
            })
        );
        setLock(false)
    }, []);

    const onPressSelectDay = (day: number) => {
        setSelectDay(day);
        setTasks(
            allTasks.filter((task) => {
                const dayTask = new Date(task.timestamp * 1000);
                return dayTask.getDate() === day;
            })
        );
    };

    const toggleTask = (id: number) => {
        setAllTasks(prev => {
            const updatedTasks = prev.map(task =>
                task._id === id
                    ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                    : task
            );
            setTasks(updatedTasks.filter(task => {
                const dayTask = new Date(task.timestamp * 1000);
                return dayTask.getDate() === selectDay;
            }));
            return updatedTasks;
        });
    };

    const changePage = (page: number) => {
        setShowModalPage(page);
    }

    const data_food = demo_summary.find(item => item.title === 'อาหาร (ฟาง)');
    const data_milk = demo_summary.find(item => item.title === 'ปริมาณน้ำนม');
    const data_listAnimals = demo_animal.map(item => ({ label: item.name + ", " + item.code, value: item.name + ", " + item.code }));
    const data_crop = ["ทั้งหมด", ...demo_crop.map(item => item.name)];
    const foodTotal = data_food ? (data_food.textvalue2 ?? 0) : 0;
    const foodDay = data_food ? (data_food.textvalue1 ?? 0) : 0;
    const milkStandard = data_milk ? (data_milk.textvalue2 ?? 0) : 0;
    const milkAverage = data_milk ? (data_milk.textvalue1 ?? 0) : 0;

    const [croplist_open, croplist_setOpen] = useState(false);
    const [croplist_value, croplist_setValue] = useState<string | null>(data_crop[0]);
    const [croplist_items, croplist_setItems] = useState(data_crop.map((crop) => ({ label: crop, value: crop })));
    const [animalMilk_value, animalMilk_setValue] = useState<string | null>(data_listAnimals[0].label);

    const viewModal1 = () => {
        return (
            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={TextStyles.text_head2}>จัดการอาหาร</Text>
                <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(1) }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>บันทึกการให้อาหาร</Text>
                    </Pressable>
                    <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(2) }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เพิ่มอาหารเข้าคลัง</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const viewModal2 = () => {
        return (
            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={TextStyles.text_head2}>บันทึกการให้อาหาร</Text>
                <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', padding: 12, backgroundColor: Colors.light.bg_warning, marginBottom: 24 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ต้องการอาหารต่อวัน</Text>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodDay} ก้อน</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>อาหารในคลัง</Text>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodTotal} ก้อน</Text>
                    </View>
                </View>
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>จำนวนฟาง</Text>
                <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                    <TextInput
                        style={styles.home_styles.input}
                        placeholder={"น้ำหนัก"}
                        value={addFood.toString()}
                        onChangeText={e => setAddFood(Number(e))}
                        keyboardType="numeric"
                    />
                    <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text>
                </View>
                <Button text="บันทึกจำนวนฟาง" theme="green" fn={closeModal} />
            </View>
        )
    }

    const viewModal3 = () => {
        return (
            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={TextStyles.text_head2}>บันทึกการให้อาหาร</Text>
                <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', padding: 12, backgroundColor: Colors.light.bg_warning, marginBottom: 24 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ต้องการอาหารต่อวัน</Text>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodDay.toLocaleString()} ก้อน</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>อาหารในคลัง</Text>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{foodTotal.toLocaleString()} ก้อน</Text>
                    </View>
                </View>
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกคอก</Text>
                <DropDownPicker
                    open={croplist_open}
                    value={croplist_value}
                    items={croplist_items}
                    setOpen={croplist_setOpen}
                    setValue={croplist_setValue}
                    setItems={croplist_setItems}
                    multiple={false}
                    style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12 }}
                />
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>จำนวนฟาง</Text>
                <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                    <TextInput
                        style={styles.home_styles.input}
                        placeholder={"น้ำหนัก"}
                        value={addFood.toString()}
                        onChangeText={e => setAddFood(Number(e))}
                        keyboardType="numeric"
                    />
                    <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ก้อน</Text>
                </View>
                <Button text="บันทึก" theme="green" fn={closeModal} />
            </View>
        )
    }
    
    const viewModal4 = () => {
        return (
            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={TextStyles.text_head2}>จัดการการให้นม</Text>
                <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable style={{ paddingVertical: 8, width: '100%', display: 'flex', borderBottomColor: '#00000022', borderBottomWidth: 1 }} onPress={() => { changePage(1) }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>บันทึกการให้นม</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const viewModal5 = () => {
        return (
            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={TextStyles.text_head2}>บันทึกการให้นม</Text>
                <View style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column', padding: 12, backgroundColor: Colors.light.bg_warning, marginBottom: 24 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ปริมาณเฉลี่ย</Text>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{milkAverage.toLocaleString()} ลิตร</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>ปริมาณมาตรฐาน</Text>
                        <Text style={[TextStyles.text_head5, { textAlign: 'left' }]}>{milkStandard.toLocaleString()} ลิตร</Text>
                    </View>
                </View>
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกคอก</Text>
                <DropDownPicker
                    open={croplist_open}
                    value={animalMilk_value}
                    items={data_listAnimals}
                    setOpen={croplist_setOpen}
                    setValue={animalMilk_setValue}
                    multiple={false}
                    style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12 }}
                />
                <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>จำนวนฟาง</Text>
                <View style={{ display: 'flex', position: 'relative', width: '100%', marginVertical: 6 }}>
                    <TextInput
                        style={styles.home_styles.input}
                        placeholder={"น้ำหนัก"}
                        value={addFood.toString()}
                        onChangeText={e => setAddFood(Number(e))}
                        keyboardType="numeric"
                    />
                    <Text style={[TextStyles.text_head4, { color: Colors.light.main, position: 'absolute', right: 12, top: 6 }]}>ลิตร</Text>
                </View>
                <Button text="บันทึก" theme="green" fn={closeModal} />
            </View>
        )
    }

    const viewFoodModal = [viewModal1(), viewModal2(), viewModal3()];
    const viewMilkModal = [viewModal4(), viewModal5()];
    const viewModal = () => {
        switch (reportClick) {
            case "อาหาร (ฟาง)":
                return viewFoodModal[showModalPage];
            case "ปริมาณน้ำนม":
                return viewMilkModal[showModalPage];
            default:
                return null;
        }
    }

    return (
        <View style={styles.home_styles.viewmain}>
            <ScrollView style={styles.home_styles.scrollmain} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.home_styles.container}>
                    <View style={styles.home_styles.header}>
                        <Image
                            source={require('../../assets/images/headdrop2.png')}
                            style={styles.home_styles.headerBackground}
                            resizeMode="cover"
                        />
                        <View style={styles.home_styles.headerText}>
                            <Text style={TextStyles.text_head2}>Novitech Farm</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.home_styles.calendar_head}>
                            <Text style={TextStyles.text_head4}>{(new Date()).toLocaleString('default', { month: 'long' })}, {new Date().getFullYear()}</Text>
                            <Pressable><Text style={TextStyles.text_head4_gray}>ดูทั้งหมด</Text></Pressable>
                        </View>
                        <View style={styles.home_styles.calendar}>
                            {listDay.map((day, index) => (
                                <Pressable
                                    key={index}
                                    style={[
                                        styles.home_styles.listItem,
                                        selectDay === day ? styles.home_styles.listItem : styles.home_styles.listItem_disabled,
                                    ]}
                                    onPress={() => onPressSelectDay(day)}
                                >
                                    <Text style={selectDay === day ? styles.home_styles.listItemText : styles.home_styles.listItemText_disabled}>{day}</Text>

                                </Pressable>
                            ))}
                        </View>
                        <View style={styles.cardtodo_styles.card}>
                            <View style={styles.cardtodo_styles.card_header}>
                                <Text style={styles.cardtodo_styles.card_header_text}>สิ่งที่ต้องทำ</Text>
                                <MaterialCommunityIcons style={styles.cardtodo_styles.card_header_icon} name="dots-horizontal" />
                            </View>
                            {tasks.length > 0 ? (
                                tasks.map((task, i) => (
                                    <Pressable
                                        key={i}
                                        style={[
                                            styles.cardtodo_styles.taskRow,
                                            (task.status == 'completed') && styles.cardtodo_styles.taskRow_completed
                                        ]}
                                        onPress={() => toggleTask(task._id)}
                                    >
                                        <Text style={[
                                            styles.cardtodo_styles.taskText,
                                            (task.status == 'completed') && styles.cardtodo_styles.completed
                                        ]}>
                                            {task.name}
                                        </Text>
                                        <Text style={styles.cardtodo_styles.taskText_completed}>
                                            {task.status == 'completed' ? 'เสร็จสิ้น' : ''}
                                        </Text>
                                    </Pressable>
                                ))
                            ) : (
                                <View>
                                    <Text style={[styles.cardtodo_styles.taskText, { opacity: 0.5, textAlign: 'center', fontSize: 24 }]}>ว่าง</Text>
                                    <Text style={[styles.cardtodo_styles.taskText, { opacity: 0.5, textAlign: 'center' }]}>ไม่มีรายการที่ต้องทำ</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <Text style={[TextStyles.text_head4_gray, { paddingHorizontal: 12 }]}>รายงานผลแบบย่อ</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap', marginVertical: 8 }}>
                        {
                            demo_summary.map((item, index) => (
                                <SummaryCard
                                    key={index}
                                    title={item.title}
                                    textHead={item.textsummary}
                                    textSub1={item.textlist1}
                                    textValue1={(item.textvalue1).toString()}
                                    textSub2={item.textlist2}
                                    textValue2={(item.textvalue2).toString()}
                                    textUnit={item.textunit}
                                    status={item.status}
                                    dot={item.dot ?? false}
                                    lock={lock}
                                    onClick={() => openModal(item.title)}
                                />
                            ))
                        }
                    </View>
                    <Text style={[TextStyles.text_head4_gray, { paddingHorizontal: 12 }]}>ข้อมูลฟาร์ม</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap', marginVertical: 8 }}>
                        <FarmdetailCard title={'กลุ่มสัตว์'} datalist={[
                            { topic: '< 1 ปี', value: 96 },
                            { topic: '1-2 ปี', value: 154 },
                            { topic: '2-3 ปี', value: 62 },
                            { topic: '> 3 ปี', value: 118 }
                        ]} textUnit={'ตัว'} dot={true} />
                    </View>
                </View>
                <HomeFoodModal
                    isVisible={showModal && viewModal() !== null}
                    onClose={closeModal}
                    content={viewModal()}
                />
            </ScrollView>
        </View>
    );
};

export default Home