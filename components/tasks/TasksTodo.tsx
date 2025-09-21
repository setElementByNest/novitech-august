import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../button/Button";

interface Props {
    tasks_change: TaskProps[];
    check_change: boolean;
    toggleTask: (id: number) => void;
    toggleTask_confirm: () => void;
    toggleTask_cancel: () => void;
    tasks: TaskProps[];
    textHeader: string;
}

type TaskProps = {
    name: string;
    status: string;
    timestamp: number;
    _id: number;
};

interface PropsVaccine {
    tasks_change: VaccineTask[];
    check_change: boolean;
    toggleTask: (listName: string) => void;
    toggleTask_confirm: () => void;
    toggleTask_cancel: () => void;
    tasks: VaccineTask[];
    textHeader: string;
}

interface HealthProps {
    date: string;
    topic: string;
    done: boolean;
}
interface PropsHealth {
    tasks_change: HealthProps[];
    check_change: boolean;
    toggleTask: (listName: string) => void;
    toggleTask_confirm: () => void;
    toggleTask_cancel: () => void;
    tasks: HealthProps[];
    textHeader: string;
}

interface VaccineTask {
    name: string;
    done: boolean;
}

export function TasksTodo({ textHeader, tasks_change, check_change, toggleTask, toggleTask_confirm, toggleTask_cancel, tasks }: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.card_header}>
                <Text style={styles.card_header_text}>{textHeader}</Text>
                {/* <MaterialCommunityIcons style={styles.card_header_icon} name="dots-horizontal" /> */}
            </View>
            {tasks_change.length > 0 ? (
                tasks_change.map((task, i) => {
                    return (
                        <Pressable
                            key={i}
                            style={[
                                styles.taskRow,
                                (task.status == 'completed' && check_change) && styles.taskRow_completed,
                                (tasks[i]?.status !== tasks_change[i].status) && styles.taskRow_change
                            ]}
                            onPress={() => toggleTask(task._id)}
                        >
                            <Text style={[
                                styles.taskText,
                                (task.status == 'completed') && styles.completed
                            ]}>
                                {task.name}
                            </Text>
                            <Text style={styles.taskText_completed}>
                                {task.status == 'completed' ? 'เสร็จสิ้น' : ''}
                            </Text>
                        </Pressable>
                    )
                })
            ) : (
                <View>
                    <Text style={[styles.taskText, { opacity: 0.5, textAlign: 'center', fontSize: 24 }]}>ว่าง</Text>
                    <Text style={[styles.taskText, { opacity: 0.5, textAlign: 'center' }]}>ไม่มีรายการที่ต้องทำ</Text>
                </View>
            )}
            <View style={{ width: '100%', alignItems: 'center', marginTop: 18, display: !check_change ? 'flex' : 'none' }}>
                <Button text="บันทึกการแก้ไข" theme="green" fn={toggleTask_confirm} />
                <Button text="ยกเลิก" theme="gray" fn={toggleTask_cancel} />
            </View>
        </View>
    )
}

export function TasksVaccine({ textHeader, tasks_change, check_change, toggleTask, toggleTask_confirm, toggleTask_cancel, tasks }: PropsVaccine) {
    return (
        <View style={styles.card}>
            <View style={styles.card_header}>
                <Text style={styles.card_header_text}>{textHeader}</Text>
            </View>
            {tasks_change.length > 0 ? (
                tasks_change.map((task, i) => {
                    return (
                        <Pressable
                            key={i}
                            style={[
                                styles.taskRow,
                                (task.done && check_change) && styles.taskRow_completed,
                                (tasks[i]?.done !== tasks_change[i].done) && styles.taskRow_change
                            ]}
                            onPress={() => {toggleTask(task.name); console.log(tasks[i], tasks_change[i], check_change)}}
                        >
                            <Text style={[
                                styles.taskText,
                                (task.done) && styles.completed
                            ]}>
                                {task.name}
                            </Text>
                            <Text style={styles.taskText_completed}>
                                {task.done ? 'ฉีดแล้ว' : ''}
                            </Text>
                        </Pressable>
                    )
                })
            ) : (
                <View>
                    <Text style={[styles.taskText, { opacity: 0.5, textAlign: 'center', fontSize: 24 }]}>ว่าง</Text>
                    <Text style={[styles.taskText, { opacity: 0.5, textAlign: 'center' }]}>ไม่มีรายการที่ต้องทำ</Text>
                </View>
            )}
            <View style={{ width: '100%', alignItems: 'center', marginTop: 18, display: !check_change ? 'flex' : 'none' }}>
                <Button text="บันทึกการแก้ไข" theme="green" fn={toggleTask_confirm} />
                <Button text="ยกเลิก" theme="gray" fn={toggleTask_cancel} />
            </View>
        </View>
    )
}
export function TasksHealth({ textHeader, tasks_change, check_change, toggleTask, toggleTask_confirm, toggleTask_cancel, tasks }: PropsHealth) {
    return (
        <View style={styles.card}>
            <View style={styles.card_header}>
                <Text style={styles.card_header_text}>{textHeader}</Text>
            </View>
            {tasks_change.length > 0 ? (
                tasks_change.map((task, i) => {
                    return (
                        <Pressable
                            key={i}
                            style={[
                                styles.taskRow,
                                (task.done && check_change) && styles.taskRow_completed,
                                (tasks[i]?.done !== tasks_change[i].done) && styles.taskRow_change
                            ]}
                            onPress={() => {toggleTask(task.topic); console.log(tasks[i], tasks_change[i], check_change)}}
                        >
                            <Text style={[
                                styles.taskText,
                                (task.done) && styles.completed
                            ]}>
                                {task.date} - {task.topic}
                            </Text>
                            <Text style={styles.taskText_completed}>
                                {task.done ? 'ปกติแล้ว' : ''}
                            </Text>
                        </Pressable>
                    )
                })
            ) : (
                <View>
                    <Text style={[styles.taskText, { opacity: 0.5, textAlign: 'center', fontSize: 24 }]}>ว่าง</Text>
                    <Text style={[styles.taskText, { opacity: 0.5, textAlign: 'center' }]}>ไม่มีรายการที่ต้องทำ</Text>
                </View>
            )}
            <View style={{ width: '100%', alignItems: 'center', marginTop: 18, display: !check_change ? 'flex' : 'none' }}>
                <Button text="บันทึกการแก้ไข" theme="green" fn={toggleTask_confirm} />
                <Button text="ยกเลิก" theme="gray" fn={toggleTask_cancel} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 6,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#eaeaea',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        width: '100%',
    },
    card_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    card_header_text: {
        fontSize: 16,
        fontFamily: 'Kanit400',
        color: '#000000ff',
        margin: 0,
        padding: 0,
    },
    card_header_icon: {
        fontSize: 18,
        fontFamily: 'Kanit300',
        color: '#000000ff',
        margin: 0,
        padding: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f5132',
        marginBottom: 10,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
        backgroundColor: '#eaeaea',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 50,
        marginVertical: 1,
    },
    taskRow_completed: {
        textDecorationLine: 'line-through',
        backgroundColor: '#4CB59144',
        color: '#555',
    },
    taskRow_change: {
        textDecorationLine: 'line-through',
        backgroundColor: Colors.light.bg_warning,
        color: '#555',
    },
    taskText: {
        fontSize: 16,
        fontFamily: 'Kanit300',
    },
    taskText_completed: {
        fontSize: 16,
        fontFamily: 'Kanit300',
        color: '#4CB591',
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#4CB591',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    bottomRightIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.light.main,
        padding: 10,
        borderRadius: 50,
    },
});