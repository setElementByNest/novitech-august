import SummaryCard, { AddCardList } from '@/components/summaryCard/SummaryCard';
import * as FileSystem from 'expo-file-system';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import TextStyles from '../../constants/Texts';
import { FocusAnimalContext } from '../../contexts/FocusAnimalContext';
import { AnimalContext, AnimalProps } from '../../contexts/ListAnimalContext';
import { demo_animal, demo_crop } from '../../data/FetchData';
import styles from './Styles';

type TaskProps = {
    id: string;
    title: string;
    completed: boolean;
};

type filterListProps = {
    id: string;
    title: string;
};

const filterList = [
    { id: '1', title: 'ทั้งหมด' },
    { id: '2', title: 'ติดสัด', },
    { id: '3', title: 'ผิดปกติ' },
    { id: '4', title: 'ปกติ', },
]

const statusOrder = ['ติดสัด', 'ผิดปกติ', 'ปกติ', 'ส่งออก', 'ตาย'];

const Crop = () => {
    const { animals, setAnimal, setAnimalAll } = useContext(AnimalContext);
    const { setFocusAnimal } = useContext(FocusAnimalContext);

    const [filter, setFilter] = useState<filterListProps[]>([]);
    const [dataPet, setDataPet] = useState<AnimalProps[]>([]);
    const [nowFilter, setNowFilter] = useState<number>(1);
    const [showAdd, setShowAdd] = useState(false);

    const closeModal = () => {
        setShowAdd(false);
    }

    const loadAnimalData = async () => {
        const dirUri = FileSystem.documentDirectory + 'data/';
        try {
            const dirInfo = await FileSystem.getInfoAsync(dirUri);
            if (!dirInfo.exists) {
                console.warn("Data directory not found:", dirUri);
                return;
            }

            const fileNames = await FileSystem.readDirectoryAsync(dirUri);
            const animalData: AnimalProps[] = [];

            for (const fileName of fileNames) {
                const fileUri = dirUri + fileName;
                const content = await FileSystem.readAsStringAsync(fileUri);
                const parsed = JSON.parse(content);
                animalData.push(parsed);
            }

            // Sort based on custom statusOrder
            const sortedAnimals = animalData.sort((a, b) => {
                const indexA = statusOrder.findIndex(status => a.status.includes(status));
                const indexB = statusOrder.findIndex(status => b.status.includes(status));
                return indexA - indexB;
            });

            setFilter(filterList);
            setDataPet(sortedAnimals);
            setAnimalAll(sortedAnimals);
            console.log("Loaded animals:", sortedAnimals);

        } catch (error) {
            console.error("Error loading animals from filesystem:", error);
        }
    };

    const dataExpo_showlist = async () => {
        const dirUri = FileSystem.documentDirectory + 'data/';
        try {
            // Create directory if needed
            const dirInfo = await FileSystem.getInfoAsync(dirUri);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
            }
            // Read all file names in the directory
            const dirFiles = await FileSystem.readDirectoryAsync(dirUri);
            console.log("Files in directory:", dirFiles);
            loadAnimalData();
        } catch (error) {
            console.error("Error during file write/read:", error);
        }
    }

    const dataExpo_deletelist = async () => {
        const dirUri = FileSystem.documentDirectory + 'data/';
        try {
            // Show all file names in dirUri
            const filesBefore = await FileSystem.readDirectoryAsync(dirUri);
            console.log('Files before deletion:', filesBefore);

            // Delete all files
            await Promise.all(
                filesBefore.map(async (file) => {
                    await FileSystem.deleteAsync(dirUri + file, { idempotent: true });
                })
            );

            // Show all file names after deletion
            const filesAfter = await FileSystem.readDirectoryAsync(dirUri);
            console.log('Files after deletion:', filesAfter);
            loadAnimalData();

        } catch (error) {
            console.error("Error during file write/read:", error);
        }
    }

    const dataExpo_demosavelist = async () => {
        const dirUri = FileSystem.documentDirectory + 'data/';
        try {
            // Check and create directory
            const dirInfo = await FileSystem.getInfoAsync(dirUri);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
            }

            // Loop through animals and write each to its own file
            for (const animal of demo_animal) {
                const fileUri = `${dirUri}${animal.code}.txt`;
                const dataToSave = JSON.stringify(animal); // Save as JSON string
                await FileSystem.writeAsStringAsync(fileUri, dataToSave);
                console.log(`Saved: ${fileUri}`);
            }

            // Verify saved files
            const dirFiles = await FileSystem.readDirectoryAsync(dirUri);
            console.log("Files in directory:", dirFiles);
            loadAnimalData();

        } catch (error) {
            console.error("Error saving animal data:", error);
        }
    };
    useEffect(() => {
        loadAnimalData();
    }, []);
    useEffect(() => {
        setFilter(filterList);
        const sortedAnimals_name = animals.sort((a, b) => a.code.localeCompare(b.code));
        const sortedAnimals = sortedAnimals_name.sort((a, b) => {
            const indexA = statusOrder.findIndex(status => a.status.includes(status));
            const indexB = statusOrder.findIndex(status => b.status.includes(status));
            return indexA - indexB;
        });
        setDataPet(sortedAnimals);
        console.log(animals)
    }, [animals]);

    useEffect(() => {
        const selectedFilter = filter.find(item => Number(item.id) === nowFilter);
        const sortedAnimals_name = animals.sort((a, b) => a.code.localeCompare(b.code));
        const sortedAnimals = sortedAnimals_name.sort((a, b) => {
            const indexA = statusOrder.findIndex(status => a.status.includes(status));
            const indexB = statusOrder.findIndex(status => b.status.includes(status));
            return indexA - indexB;
        });
        const filteredPets = nowFilter !== 1 && selectedFilter
            ? sortedAnimals.filter(animal => animal.status === selectedFilter.title)
            : sortedAnimals;
        setDataPet(filteredPets);
    }, [nowFilter]);
    const menuItems: string[] = ["เพิ่มรายการ", "แก้ไข", "ลบ"];
    const menuActions: Array<() => void> = [
        () => alert("เพิ่มรายการ clicked"),
        () => alert("แก้ไข clicked"),
        () => alert("ลบ clicked"),
    ];

    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', justifyContent: 'flex-start', alignItems: 'center' }}>
            <ScrollView style={{ width: '100%', height: '100%', position: 'relative' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.livestock_styles.container}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'visible' }}>
                        <Text style={TextStyles.text_head1}>ข้อมูลคอกสัตว์</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap', marginTop: 26 }}>
                        {
                            demo_crop.map((item, index) => (
                                <SummaryCard
                                    key={index}
                                    title={item.name}
                                    textHead={item.status}
                                    textSub1={"จำนวนสัตว์"}
                                    textValue1={(item.countall).toString()}
                                    textSub2={"ปริมาณอาหาร"}
                                    textValue2={(item.food).toString()}
                                    textUnit={""}
                                    status={item.status}
                                    dot={true}
                                    lock={false}
                                />
                            ))
                        }
                        <AddCardList />
                    </View>
                </View>
            </ScrollView >
        </View >
    )
}

export default Crop