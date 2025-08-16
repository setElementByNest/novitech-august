import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import FarmdetailCard from '../../components/farmdetailCard/FarmdetailCard';
import SummaryCard from '../../components/summaryCard/SummaryCard';
import { demo_summary, demo_task } from '../../data/FetchData';
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

    const iconStatus = (status: string) => {
        switch (status) {
            case 'done':
                return <MaterialCommunityIcons style={styles.home_styles.listIconDone} name="check" />;
            case 'not':
                return <MaterialCommunityIcons style={styles.home_styles.listIconNot} name="close" />;
            case 'now':
                return <MaterialCommunityIcons style={styles.home_styles.listIconNow} name="record" />;
            default:
                return <View />;
        }
    };

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

    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', justifyContent: 'flex-start', alignItems: 'center' }}>
            <ScrollView style={{ width: '100%', height: '100%', position: 'relative' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.home_styles.container}>
                    <View style={[styles.home_styles.header, { justifyContent: 'flex-end', alignItems: 'center' }]}>
                        <Image
                            source={require('../../assets/images/headdrop2.png')}
                            style={styles.home_styles.headerBackground}
                            resizeMode="cover"
                        />
                        <View style={styles.home_styles.headerText}>
                            <Text style={styles.home_styles.text_head2}>Novitech Farm</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.home_styles.calendar_head}>
                            <Text style={styles.home_styles.text_head4}>{(new Date()).toLocaleString('default', { month: 'long' })}, {new Date().getFullYear()}</Text>
                            <Pressable><Text style={styles.home_styles.text_head4_gray}>ดูทั้งหมด</Text></Pressable>
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

                    <Text style={[styles.home_styles.text_head4_gray, {paddingHorizontal: 12}]}>รายงานผลแบบย่อ</Text>
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
                                />
                            ))
                        }
                    </View>
                    <Text style={[styles.home_styles.text_head4_gray, {paddingHorizontal: 12}]}>ข้อมูลฟาร์ม</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap', marginVertical: 8 }}>
                        <FarmdetailCard title={'กลุ่มสัตว์'} datalist={[
                            { topic: '< 1 ปี', value: 96 },
                            { topic: '1-2 ปี', value: 154 },
                            { topic: '2-3 ปี', value: 62 },
                            { topic: '> 3 ปี', value: 118 }
                        ]} textUnit={'ตัว'} dot={true} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home