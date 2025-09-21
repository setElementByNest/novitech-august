import { TasksVaccine } from '@/components/tasks/TasksTodo';
import TextStyles from "@/constants/Texts";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import demo_vaccine_tasks from '../../../data/json/tasksVaccine.json';

interface VaccineTask {
    name: string;
    list: VaccineTaskItem[];
}

interface VaccineTaskItem {
    name: string;
    done: boolean;
}

export const VaccineTask = () => {

    const [tasks, setTasks] = useState<VaccineTask[]>([]);
    const [tasks_change, setTasks_change] = useState<VaccineTask[]>([]);
    const [allTasks, setAllTasks] = useState<VaccineTask[]>([]);

    useEffect(() => {
        setTasks(demo_vaccine_tasks);
        setTasks_change(demo_vaccine_tasks);
        setAllTasks(demo_vaccine_tasks);
    }, []);


    const toggleTask = (name: string, listName: string) => {
        setAllTasks(prev => {
            const updatedTasks = prev.map(task => {
                if (task.name === name) {
                    return {
                        ...task,
                        list: task.list.map(item =>
                            item.name === listName
                                ? { ...item, done: !item.done }
                                : item
                        )
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


    return (
        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={TextStyles.text_head2}>บันทึกการให้วัคซีน</Text>
            <Text style={TextStyles.text_head5}>รอบเดือน กันยายน 2568</Text>
            {
                tasks.map((task, i) => {
                    const check_change = JSON.stringify(tasks_change[i]) === JSON.stringify(task)
                    return (
                        <TasksVaccine
                            key={i}
                            textHeader={task.name}
                            tasks_change={tasks_change[i]?.list ?? []}
                            check_change={check_change}
                            toggleTask={(listName: string) => toggleTask(task.name, listName)}
                            toggleTask_confirm={toggleTask_confirm}
                            toggleTask_cancel={toggleTask_cancel}
                            tasks={task.list}
                        />
                    )
                })
            }
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