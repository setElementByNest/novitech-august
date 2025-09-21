import { FoodAdd } from '@/components/modal/modalHome/FoodAdd';
import { FoodPet } from '@/components/modal/modalHome/FoodPet';
import { GrowSave } from '@/components/modal/modalHome/GrowSave';
import { HealthSave } from '@/components/modal/modalHome/HealthSave';
import { HealthUpdate } from '@/components/modal/modalHome/HealthUpdate';
import { MilkSave } from '@/components/modal/modalHome/MilkSave';
import { SelectFood } from '@/components/modal/modalHome/SelectFood';
import { SelectGrow } from '@/components/modal/modalHome/SelectGrow';
import { SelectHealth } from '@/components/modal/modalHome/SelectHealth';
import { SelectMilk } from '@/components/modal/modalHome/SelectMilk';
import { SelectVaccine } from '@/components/modal/modalHome/SelectVaccine';
import { VaccineAdd } from '@/components/modal/modalHome/VaccineAdd';
import { VaccineEdit } from '@/components/modal/modalHome/VaccineEdit';
import { VaccineList } from '@/components/modal/modalHome/VaccineList';
import { VaccineTask } from '@/components/modal/modalHome/VaccineTask';
import ShowModal from '@/components/modal/ShowModal';
import { ReloadPage } from '@/components/reload/ReloadPage';
import { TasksTodo } from '@/components/tasks/TasksTodo';
import { IsLoginContext } from '@/contexts/IsLoginContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import FarmdetailCard from '../../components/farmdetailCard/FarmdetailCard';
import SummaryCard from '../../components/summaryCard/SummaryCard';
import TextStyles from '../../constants/Texts';
import { demo_animal, demo_category_animals, demo_crop, demo_summary, demo_task, fetchGet } from '../../data/FetchData';
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
    const [onRefresh, setOnRefresh] = useState(false);
    type DataSummaryItem = {
        title: string;
        textsummary: string;
        textlist1: string;
        textvalue1: number | string;
        textunit1: string;
        textlist2: string;
        textvalue2: number | string;
        textunit2: string;
        status: "normal" | "critical" | "warning";
    };

    const [dataSummary, setDataSummary] = useState<DataSummaryItem[]>([]);
    const { setIsLoggedIn } = useContext(IsLoginContext);
    const backtologin = () => {
        setIsLoggedIn(false);
    }

    type CategoryAnimal = {
        topic: string;
        value: number;
    }

    const [dataCategoryAnimals, setDataCategoryAnimals] = useState<CategoryAnimal[]>(demo_category_animals);

    const refreshing = () => {
        setOnRefresh(true);
        setDataSummary([]);
        setDataCategoryAnimals([]);

        const fetchDataSummary = async () => {
            try {
                const data = await fetchGet("farms/0001/overview_cards/");
                setDataSummary(data);
                console.log("dataSummary", data);
            } catch (error) {
                console.error("Failed to fetch data summary:", error);
            }
            setOnRefresh(false);
        };
        const fetchDataCategory = async () => {
            try {
                const data = await fetchGet("animals/age_summary/");
                const transformedData = Object.entries(data).map(([topic, value]) => ({
                    topic,
                    value: Number(value),
                }));
                setDataCategoryAnimals(transformedData);
                console.log("dataCategoryAnimals", transformedData);
                console.log("dataCategoryAnimals in need", demo_category_animals);
            } catch (error) {
                console.error("Failed to fetch data category animals:", error);
            }
            setOnRefresh(false);
        };

        setTimeout(() => {
            fetchDataSummary();
            fetchDataCategory();
        }, 600);
    }

    useEffect(() => {
        refreshing();

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

    const [moduleName, setModuleName] = useState<string>("");

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
        HealthSave({ closeModal, setHealth, nowHealth, croplist_open, croplist_value, data_listCrop, croplist_setOpen, croplist_setValue, animallist_open, animallist_value, data_listAnimals, animallist_setOpen, animallist_setValue }),
        HealthUpdate({ closeModal, setHealth, nowHealth, croplist_open, croplist_value, data_listCrop, croplist_setOpen, croplist_setValue, animallist_open, animallist_value, data_listAnimals, animallist_setOpen, animallist_setValue })
    ];

    const viewVaccineModal = [
        SelectVaccine({ changePage }),
        VaccineTask(),
        VaccineList({ changePage, setModuleName }),
        VaccineAdd({ changePage }),
        VaccineEdit({ changePage, moduleName, setModuleName }),
        
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
            case "วัคซีน":
                return viewVaccineModal[showModalPage];
            default:
                return null;
        }
    }

    const menulist = [
        {
            title: "วัคซีน",
            icon: require('../../assets/images/iconVaccine.png'),
            onClick: () => openModal("วัคซีน"),
        },
        {
            title: "เติบโต",
            icon: require('../../assets/images/iconGrow.png'),
            onClick: () => openModal("การเติบโต"),
        },
        {
            title: "อาหาร",
            icon: require('../../assets/images/iconFood.png'),
            onClick: () => openModal("อาหาร (ฟาง)"),
        },
        {
            title: "สุขภาพ",
            icon: require('../../assets/images/iconHealth.png'),
            onClick: () => openModal("สุขภาพ"),
        }
    ]

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
                        <Pressable style={styles.home_styles.headerText} onPress={backtologin}>
                            <Text style={TextStyles.text_head2}>Novitech Farm</Text>
                        </Pressable>
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
                                    onPress={() => { check_change ? onPressSelectDay(day) : null }}
                                >
                                    <Text style={selectDay === day ? styles.home_styles.listItemText : styles.home_styles.listItemText_disabled}>{day}</Text>

                                </Pressable>
                            ))}
                        </View>
                        <View style={{marginVertical: 12}} >
                            <TasksTodo textHeader="สิ่งที่ต้องทำ" tasks_change={tasks_change} check_change={check_change} toggleTask={toggleTask} toggleTask_confirm={toggleTask_confirm} toggleTask_cancel={toggleTask_cancel} tasks={tasks} />
                        </View>
                    </View>

                    <Text style={[TextStyles.text_head4_gray, { paddingHorizontal: 12 }]}>เมนูลัด</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 16, flexWrap: 'wrap', marginVertical: 8, width: '100%', paddingHorizontal: 16, paddingVertical: 12 }}>
                        {
                            menulist.map((item, index) => (
                                <Pressable style={{ display: 'flex', alignItems: 'center', gap: 4, flexDirection: 'column' }} onPress={item.onClick} key={index}>
                                    <View
                                        style={{
                                            width: 64,
                                            height: 64,
                                            backgroundColor: '#fff',
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Image
                                            source={item.icon}
                                            resizeMode="contain"
                                            style={{ width: 40, height: 40 }}
                                        />
                                    </View>
                                    <Text style={[TextStyles.text_head5]}>{item.title}</Text>
                                </Pressable>
                            ))
                        }
                    </View>
                    
                    <Text style={[TextStyles.text_head4_gray, { paddingHorizontal: 12 }]}>รายงานผลแบบย่อ</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap', marginVertical: 8 }}>
                        {
                            dataSummary.length === 0 ? (
                                <ReloadPage />
                            ) : (
                                dataSummary.map((item, index) => (
                                    <SummaryCard
                                        key={index}
                                        title={item.title}
                                        textHead={item.textsummary}
                                        textSub1={item.textlist1}
                                        textValue1={(item.textvalue1).toString()}
                                        textUnit1={item.textunit1}
                                        textSub2={item.textlist2}
                                        textValue2={(item.textvalue2).toString()}
                                        textUnit2={item.textunit2}
                                        status={item.status}
                                        dot={true}
                                        lock={lock}
                                        onClick={() => openModal(item.title)}
                                    />
                                )))
                        }
                    </View>
                    <Text style={[TextStyles.text_head4_gray, { paddingHorizontal: 12 }]}>ข้อมูลฟาร์ม</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap', marginVertical: 8 }}>
                        {
                            dataCategoryAnimals.length === 0 ? (
                                <ReloadPage />
                            ) : (
                                <FarmdetailCard title={'กลุ่มสัตว์'} datalist={dataCategoryAnimals} textUnit={'ตัว'} dot={true} />
                            )
                        }
                    </View>
                </View>
                <ShowModal
                    isVisible={showModal && viewModal() !== null}
                    onClose={closeModal}
                    content={viewModal()}
                    gray={reportClick === "วัคซีน" && showModalPage === 2}
                />
            </ScrollView>
            <Pressable onPress={refreshing} style={[styles.home_styles.plusIcon, { backgroundColor: onRefresh ? '#888' : '#4CB591' }]}>
                <MaterialCommunityIcons name="refresh" size={32} color={'white'} />
            </Pressable>
        </View>
    );
};

export default Home