import Button from '@/components/button/Button';
import { TasksHealth } from '@/components/tasks/TasksTodo';
import TextStyles from "@/constants/Texts";
import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import demo_health from '../../../data/json/listHealth.json';

interface HealthProps {
    date: string;
    topic: string;
    done: boolean;
}

interface Props {
    closeModal: () => void;
    setHealth: (health: string) => void;
    nowHealth: string;
    croplist_open: boolean;
    croplist_value: string | null;
    data_listCrop: { label: string; value: string }[];
    croplist_setOpen: Dispatch<SetStateAction<boolean>>;
    croplist_setValue: Dispatch<SetStateAction<string | null>>;
    animallist_open: boolean;
    animallist_value: string | null;
    data_listAnimals: { label: string; value: string }[];
    animallist_setOpen: Dispatch<SetStateAction<boolean>>;
    animallist_setValue: Dispatch<SetStateAction<string | null>>;
}

export const HealthUpdate = ({
    closeModal,
    setHealth,
    nowHealth,
    croplist_open,
    croplist_value,
    data_listCrop,
    croplist_setOpen,
    croplist_setValue,
    animallist_open,
    animallist_value,
    data_listAnimals,
    animallist_setOpen,
    animallist_setValue }: Props) => {


    const [tasks, setTasks] = useState<HealthProps[]>([]);
    const [tasks_change, setTasks_change] = useState<HealthProps[]>([]);
    const [allTasks, setAllTasks] = useState<HealthProps[]>([]);

    // useEffect(() => {
    //     setTasks(demo_health);
    //     setTasks_change(demo_health);
    //     setAllTasks(demo_health);
    // }, []);

    const onSearch = () => {
        setTasks(demo_health);
        setTasks_change(demo_health);
        setAllTasks(demo_health);
    }


    const toggleTask = (name: string) => {
        setAllTasks(prev => {
            const updatedTasks = prev.map(task => {
                if (task.topic === name) {
                    return {
                        ...task,
                        done: !task.done
                    };
                }
                return task;
            });
            setTasks_change(updatedTasks);
            return updatedTasks;
        });
    };

    const toggleTask_confirm = () => {
        setTasks(tasks_change);
    }

    const toggleTask_cancel = () => {
        setTasks_change(tasks);
        setAllTasks(tasks);
    };
    const check_change = JSON.stringify(tasks_change) === JSON.stringify(tasks)

    return (
        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>บันทึกสุขภาพ</Text>
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกคอก</Text>
            <DropDownPicker
                open={croplist_open}
                value={croplist_value}
                items={data_listCrop}
                setOpen={croplist_setOpen}
                setValue={croplist_setValue}
                multiple={false}
                listMode="SCROLLVIEW"
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12, zIndex: 0 }}
            />
            <Text style={[TextStyles.text_head5, { textAlign: 'left', width: '100%' }]}>เลือกสัตว์</Text>
            <DropDownPicker
                open={animallist_open}
                value={animallist_value}
                items={data_listAnimals}
                setOpen={animallist_setOpen}
                setValue={animallist_setValue}
                multiple={false}
                listMode="SCROLLVIEW"
                style={{ borderColor: '#ccc', width: '100%', marginVertical: 6, marginBottom: 12, zIndex: 0 }}
            />
            <Button text="ค้นหา" theme="gray" fn={onSearch} />
            <TasksHealth
                textHeader={"รายการสุขภาพ"}
                tasks_change={tasks_change ?? []}
                check_change={check_change}
                toggleTask={(listName: string) => toggleTask(listName)}
                toggleTask_confirm={toggleTask_confirm}
                toggleTask_cancel={toggleTask_cancel}
                tasks={tasks}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    input: {
        padding: 8,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        fontFamily: 'Kanit400',
        width: '100%',
        borderWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 6,
    }
})