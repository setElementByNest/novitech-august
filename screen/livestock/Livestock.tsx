import { AnimalAdd } from '@/components/modal/modalLivestock/AnimalAdd';
import { ShowDetail } from '@/components/modal/modalLivestock/ShowDetail';
import ShowModal from '@/components/modal/ShowModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import AnimalCardList from '../../components/petCard/Petcard';
import TextStyles from '../../constants/Texts';
import { FocusAnimalContext } from '../../contexts/FocusAnimalContext';
import { AnimalContext, AnimalProps } from '../../contexts/ListAnimalContext';
import { demo_animal, demo_animal_detail } from '../../data/FetchData';
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

const Livestock = () => {
    const { animals, setAnimal, setAnimalAll } = useContext(AnimalContext);
    const { setFocusAnimal } = useContext(FocusAnimalContext);

    const [filter, setFilter] = useState<filterListProps[]>([]);
    const [dataPet, setDataPet] = useState<AnimalProps[]>([]);
    const [dataPetFilter, setDataPetFilter] = useState<AnimalProps[]>([]);
    const [nowFilter, setNowFilter] = useState<number>(1);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [gridView, setGridView] = useState<boolean>(true);
    const [showAdd, setShowAdd] = useState(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [nowPage, setPage] = useState<number>(0);

    const closeModal = () => {
        setShowAdd(false);
        setShowModal(false);
    }

    const openAnimalModal = (report: string) => {
        setShowModal(true);
        setFocusAnimal(report);
        setPage(0);
    }

    const openAddAnimalModal = () => {
        setShowModal(true);
        setPage(1);
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
            setDataPetFilter(sortedAnimals);
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

    const onAddAnimal = (addId: string, addName: string, addSex: string, addDate: Date, addMass: string) => {
        const dataToSave = JSON.stringify({
            id: addId,
            name: addName,
            code: addId,
            gender: addSex === 'm' ? 'ผู้' : 'เมีย',
            age: addDate ? Math.floor((new Date().getTime() - addDate.getTime()) / (1000 * 60 * 60 * 24 * 365)) : 0,
            weight: addMass ? Number(addMass) : 0,
            status: 'ปกติ'
        });
        const dirUri = FileSystem.documentDirectory + 'data/';
        const fileUri = dirUri + `${addId}.txt`; // Ensure `addId` is defined and consistent
        (async () => {
            try {
                // Create directory if needed
                const dirInfo = await FileSystem.getInfoAsync(dirUri);
                if (!dirInfo.exists) {
                    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
                }

                // Write the file
                await FileSystem.writeAsStringAsync(fileUri, dataToSave);
                console.log("File written:", fileUri);

                // Confirm file exists
                const fileInfo = await FileSystem.getInfoAsync(fileUri);
                console.log("File exists after write:", fileInfo.exists);
                // Read all file names in the directory
                const dirFiles = await FileSystem.readDirectoryAsync(dirUri);
                console.log("Files in directory:", dirFiles);
                if (fileInfo.exists) {
                    const content = await FileSystem.readAsStringAsync(fileUri);
                    console.log("Read content:", content);
                } else {
                    console.warn("File not found when trying to read.");
                }

            } catch (error) {
                console.error("Error during file write/read:", error);
            }
        })();
        dataExpo_showlist();
    }
    useEffect(() => {
        loadAnimalData();
    }, []);
    // useEffect(() => {
    //     setFilter(filterList);
    //     const sortedAnimals_name = demo_animal.sort((a, b) => a.code.localeCompare(b.code));
    //     const sortedAnimals = sortedAnimals_name.sort((a, b) => {
    //         const indexA = statusOrder.findIndex(status => a.status.includes(status));
    //         const indexB = statusOrder.findIndex(status => b.status.includes(status));
    //         return indexA - indexB;
    //     });
    //     setDataPet(sortedAnimals);
    //     console.log(demo_animal)
    // }, [demo_animal]);

    useEffect(() => {
        const selectedFilter = filter.find(item => Number(item.id) === nowFilter);
        const sortedAnimals_name = dataPet.sort((a, b) => a.code.localeCompare(b.code));
        const sortedAnimals = sortedAnimals_name.sort((a, b) => {
            const indexA = statusOrder.findIndex(status => a.status.includes(status));
            const indexB = statusOrder.findIndex(status => b.status.includes(status));
            return indexA - indexB;
        });
        const filteredPets = nowFilter !== 1 && selectedFilter
            ? sortedAnimals.filter(animal => animal.status === selectedFilter.title)
            : sortedAnimals;
        setDataPetFilter(filteredPets);
        console.log(filter)
        console.log(sortedAnimals_name)
    }, [nowFilter]);

    const modalContent = [ShowDetail({ closeModal, demo_animal_detail }), AnimalAdd({ closeModal, onAddAnimal })];

    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', justifyContent: 'flex-start', alignItems: 'center' }}>
            <ScrollView style={{ width: '100%', height: '100%', position: 'relative' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.livestock_styles.container}>
                    <Text style={TextStyles.text_head1}>ข้อมูลปศุสัตว์</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 6, marginVertical: 20 }}>
                        {
                            filter.map((item) => (
                                <Pressable key={item.id} onPress={() => setNowFilter(Number(item.id))} >
                                    <View style={{ display: 'flex', alignItems: 'center', borderRadius: 10, backgroundColor: nowFilter == Number(item.id) ? '#fff' : '#eee', borderColor: nowFilter == Number(item.id) ? '#2F8668' : '#2F866800', borderWidth: 1, padding: 10 }}>
                                        <Text style={styles.livestock_styles.text_head3}>{item.title}</Text>
                                    </View>
                                </Pressable>
                            ))
                        }
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap' }}>
                        {
                            dataPetFilter.map((animal, i) => (
                                <AnimalCardList animals={animal} gridView={gridView} key={i} fn={() => { openAnimalModal(animal.code); }} />
                            ))
                        }
                    </View>
                </View>
            </ScrollView >
            <Pressable onPress={openAddAnimalModal} style={styles.livestock_styles.plusIcon}>
                <MaterialCommunityIcons name="plus" size={32} color={'white'} />
            </Pressable>
            <Pressable onPress={dataExpo_showlist} style={[styles.livestock_styles.plusIcon, { right: 80, backgroundColor: '#444', borderRadius: 0 }]}>
                <MaterialCommunityIcons name="view-list" size={32} color={'white'} />
            </Pressable>
            <Pressable onPress={dataExpo_deletelist} style={[styles.livestock_styles.plusIcon, { right: 140, backgroundColor: '#444', borderRadius: 0 }]}>
                <MaterialCommunityIcons name="delete" size={32} color={'white'} />
            </Pressable>
            <Pressable onPress={dataExpo_demosavelist} style={[styles.livestock_styles.plusIcon, { right: 200, backgroundColor: '#444', borderRadius: 0 }]}>
                <MaterialCommunityIcons name="auto-upload" size={32} color={'white'} />
            </Pressable>
            {/* <AddModal isVisible={showAdd} onClose={closeModal} /> */}
            <ShowModal
                isVisible={showModal}
                onClose={closeModal}
                content={modalContent[nowPage]}
            />
        </View >
    )
}

export default Livestock