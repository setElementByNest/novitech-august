import Button from '@/components/button/Button';
import { FoodAdd } from '@/components/modal/modalHome/FoodAdd';
import { FoodPet } from '@/components/modal/modalHome/FoodPet';
import { GrowSave } from '@/components/modal/modalHome/GrowSave';
import { HealthSave } from '@/components/modal/modalHome/HealthSave';
import { MilkSave } from '@/components/modal/modalHome/MilkSave';
import { SelectFood } from '@/components/modal/modalHome/SelectFood';
import { SelectGrow } from '@/components/modal/modalHome/SelectGrow';
import { SelectHealth } from '@/components/modal/modalHome/SelectHealth';
import { SelectMilk } from '@/components/modal/modalHome/SelectMilk';
import ShowModal from '@/components/modal/ShowModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import FarmdetailCard from '../../components/farmdetailCard/FarmdetailCard';
import SummaryCard from '../../components/summaryCard/SummaryCard';
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
    const [tasks_change, setTasks_change] = useState<TaskProps[]>([]);
    const [allTasks, setAllTasks] = useState<TaskProps[]>([]);
    const [selectDay, setSelectDay] = useState<number>(new Date().getDate());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalPage, setShowModalPage] = useState<number>(0);
    const [addFood, setAddFood] = useState(0);
    const [reportClick, setReportClick] = useState<string>("");



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
        const filterListTask = filteredTasks.filter((task) => {
            const dayTask = new Date(task.timestamp * 1000);
            return dayTask.getDate() === toDay.getDate();
        })
        setTasks(filterListTask);
        setTasks_change(filterListTask);
        setLock(false)
    }, []);

    const onPressSelectDay = (day: number) => {
        setSelectDay(day);
        const filerListTask_day = allTasks.filter((task) => {
            const dayTask = new Date(task.timestamp * 1000);
            return dayTask.getDate() === day;
        })
        setTasks(filerListTask_day);
        setTasks_change(filerListTask_day);
    };

    const toggleTask = (id: number) => {
        setAllTasks(prev => {
            const updatedTasks = prev.map(task =>
                task._id === id
                    ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                    : task
            );
            setTasks_change(updatedTasks.filter(task => {
                const dayTask = new Date(task.timestamp * 1000);
                return dayTask.getDate() === selectDay;
            }));
            return updatedTasks;
        });
    };
    
    const toggleTask_confirm = () => {
       setTasks(tasks_change);
    }

    const toggleTask_cancel = () => {
        setTasks_change(tasks);
        setAllTasks(prev => {
            const updatedTasks = prev.map(task => {
                const originalTask = tasks.find(t => t._id === task._id);
                return originalTask ? { ...task, status: originalTask.status } : task;
            });
            setTasks_change(updatedTasks.filter(task => {
                const dayTask = new Date(task.timestamp * 1000);
                return dayTask.getDate() === selectDay;
            }));
            return updatedTasks;
        });
    }


    const changePage = (page: number) => {
        setShowModalPage(page);
    }

    const data_food = demo_summary.find(item => item.title === 'อาหาร (ฟาง)');
    const data_milk = demo_summary.find(item => item.title === 'ปริมาณน้ำนม');
    const data_listCrop = demo_crop.map((crop) => ({ label: crop.name, value: crop.name }));
    const data_listAnimals = demo_animal.map(item => ({ label: item.name + ", " + item.code, value: item.name + ", " + item.code }));
    const data_crop = ["ทั้งหมด", ...demo_crop.map(item => item.name)];
    const foodTotal = data_food ? (data_food.textvalue2 ?? 0) : 0;
    const foodDay = data_food ? (data_food.textvalue1 ?? 0) : 0;
    const milkStandard = data_milk ? (data_milk.textvalue2 ?? 0) : 0;
    const milkAverage = data_milk ? (data_milk.textvalue1 ?? 0) : 0;

    const [croplist_open, croplist_setOpen] = useState(false);
    const [croplist_value, croplist_setValue] = useState<string | null>(data_crop[0]);
    const [animallist_open, animallist_setOpen] = useState(false);
    const [animallist_value, animallist_setValue] = useState<string | null>(data_listAnimals[0].label);

    const [nowWeight, setWeight] = useState<number>(0);
    const [nowHeight, setHeight] = useState<number>(0);
    const [nowLong, setLong] = useState<number>(0);

    const [nowHealth, setHealth] = useState<string>("");

    const closeModal = () => {
        setShowModal(false);
        setAddFood(0);
        setShowModalPage(0);
        croplist_setOpen(false);
        animallist_setOpen(false);
        croplist_setValue(data_crop[0]);
        animallist_setValue(data_listAnimals[0].label);
    }
    const openModal = (report: string) => {
        setShowModal(true);
        setReportClick(report)
    }

    const viewFoodModal = [
        SelectFood({ changePage }),
        FoodPet({ closeModal, setAddFood, addFood, foodDay, foodTotal, croplist_open, croplist_value, data_listCrop, croplist_setOpen, croplist_setValue }),
        FoodAdd({ closeModal, setAddFood, addFood, foodDay, foodTotal }),
    ];

    const viewMilkModal = [
        SelectMilk({ changePage }),
        MilkSave({ closeModal, setAddFood, addFood, milkAverage, milkStandard, animallist_open, animallist_value, data_listAnimals, animallist_setOpen, animallist_setValue })
    ];

    const viewGrowModal = [
        SelectGrow({ changePage }),
        GrowSave({ closeModal, setWeight, setHeight, setLong, nowWeight, nowHeight, nowLong, croplist_open, croplist_value, data_listCrop, croplist_setOpen, croplist_setValue, animallist_open, animallist_value, data_listAnimals, animallist_setOpen, animallist_setValue })
    ];

    const viewHealthModal = [
        SelectHealth({ changePage }),
        HealthSave({ closeModal, setHealth, nowHealth, croplist_open, croplist_value, data_listCrop, croplist_setOpen, croplist_setValue, animallist_open, animallist_value, data_listAnimals, animallist_setOpen, animallist_setValue })
    ];

    const viewModal = () => {
        switch (reportClick) {
            case "อาหาร (ฟาง)":
                return viewFoodModal[showModalPage];
            case "ปริมาณน้ำนม":
                return viewMilkModal[showModalPage];
            case "การเติบโต":
                return viewGrowModal[showModalPage];
            case "สุขภาพ":
                return viewHealthModal[showModalPage];
            default:
                return null;
        }
    }

    const check_change = JSON.stringify(tasks) === JSON.stringify(tasks_change)

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
                            {/* <Pressable><Text style={TextStyles.text_head4_gray}>ดูทั้งหมด</Text></Pressable> */}
                        </View>
                        <View style={styles.home_styles.calendar}>
                            {listDay.map((day, index) => (
                                <Pressable
                                    key={index}
                                    style={[
                                        styles.home_styles.listItem,
                                        selectDay === day ? styles.home_styles.listItem : styles.home_styles.listItem_disabled,
                                    ]}
                                    onPress={() => {check_change ? onPressSelectDay(day) : null}}
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
                            {tasks_change.length > 0 ? (
                                tasks_change.map((task, i) => {
                                    return(
                                    <Pressable
                                        key={i}
                                        style={[
                                            styles.cardtodo_styles.taskRow,
                                            (task.status == 'completed' && check_change) && styles.cardtodo_styles.taskRow_completed,
                                            (tasks[i]?.status !== tasks_change[i].status) && styles.cardtodo_styles.taskRow_change
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
                                )})
                            ) : (
                                <View>
                                    <Text style={[styles.cardtodo_styles.taskText, { opacity: 0.5, textAlign: 'center', fontSize: 24 }]}>ว่าง</Text>
                                    <Text style={[styles.cardtodo_styles.taskText, { opacity: 0.5, textAlign: 'center' }]}>ไม่มีรายการที่ต้องทำ</Text>
                                </View>
                            )}
                            <View style={{ width: '100%', alignItems: 'center', marginTop: 18, display: !check_change ? 'flex' : 'none' }}>
                                <Button text="บันทึกการแก้ไข" theme="green" fn={toggleTask_confirm} />
                                <Button text="ยกเลิก" theme="gray" fn={toggleTask_cancel} />
                            </View>
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
                        ]} textUnit={'ตัว'} dot={false} />
                    </View>
                </View>
                <ShowModal
                    isVisible={showModal && viewModal() !== null}
                    onClose={closeModal}
                    content={viewModal()}
                />
            </ScrollView>
        </View>
    );
};

export default Home