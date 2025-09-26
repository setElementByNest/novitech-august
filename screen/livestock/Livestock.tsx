import { AnimalAdd } from '@/components/modal/modalLivestock/AnimalAdd';
import { AnimalEdit } from '@/components/modal/modalLivestock/AnimalEdit';
import { ShowDetail } from '@/components/modal/modalLivestock/ShowDetail';
import ShowModal from '@/components/modal/ShowModal';
import { ReloadPage } from '@/components/reload/ReloadPage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import AnimalCardList from '../../components/petCard/Petcard';
import TextStyles from '../../constants/Texts';
import { FocusAnimalContext } from '../../contexts/FocusAnimalContext';
import { AnimalContext, AnimalProps } from '../../contexts/ListAnimalContext';
import fetchGet, { demo_animal_detail } from '../../data/FetchData';
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

    const [nameEdit, setNameEdit] = useState<string>('');

    const [hiddenButton, setHiddenButton] = useState<boolean>(false);

    const [onLoading, setOnLoading] = useState<boolean>(false);

    const [nowPenList, setNowPenList] = useState<string[]>([]);
    const [nowPen, setNowPen] = useState<string>('ทั้งหมด');

    const closeModal = () => {
        setShowAdd(false);
        setShowModal(false);
    }

    const toggleHiddenButton = () => {
        setHiddenButton(prev => !prev);
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

    const openEditAnimalModal = (name: string) => {
        setShowModal(true);
        setPage(2);
        setNameEdit(name);
    }
    const loadAnimalData = async () => {
        const dirUri = FileSystem.documentDirectory + 'data/';
        setOnLoading(true);
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

            const sortedAnimals = animalData
                .sort((a, b) => Number(a.birth) - Number(b.birth))
                .sort((a, b) => Number(a.pen) - Number(b.pen))
                .sort((a, b) => {
                    const indexA = statusOrder.findIndex(status => a.status.includes(status));
                    const indexB = statusOrder.findIndex(status => b.status.includes(status));
                    return indexA - indexB;
                });

            setNowPenList(Array.from(new Set(["ทั้งหมด", ...sortedAnimals.map(animal => animal.pen)])));
            console.log("Pen list:", nowPenList);
            setFilter(filterList);
            setDataPet(sortedAnimals);
            setDataPetFilter(sortedAnimals);
            setAnimalAll(sortedAnimals);
            // console.log("Loaded animals:", sortedAnimals);
            setTimeout(() => {
                setOnLoading(false);
            }, 100);

        } catch (error) {
            console.error("Error loading animals from filesystem:", error);
        }
    };

    const dataExpo_showlist = async () => {
        setOnLoading(true);
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
        setOnLoading(true);
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
        setOnLoading(true);
        const dirUri = FileSystem.documentDirectory + 'data/';
        try {
            // Check and create directory
            const dirInfo = await FileSystem.getInfoAsync(dirUri);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
            }
            const data = await fetchGet("animals/summary/");
            if (Array.isArray(data)) {
                const data_edit = Array.isArray(data)
                    ? data.map(animal => ({
                        ...animal,
                        code: animal.code.replace(/\//g, '_'),
                        pen: animal.corral,
                        gender: animal.gender === 'nan' ? 'ผู้' : animal.gender
                    }))
                    : [];
                for (const animal of data_edit) {
                    const fileUri = `${dirUri}${animal.code}.txt`;
                    const dataToSave = JSON.stringify(animal); // Save as JSON string
                    await FileSystem.writeAsStringAsync(fileUri, dataToSave);
                    console.log(`Saved: ${fileUri}`);
                }
            } else {
                console.warn("dataSummary is not an array:", data);
            }
            // Loop through animals and write each to its own file
            // for (const animal of demo_animal) {
            //     const fileUri = `${dirUri}${animal.code}.txt`;
            //     const dataToSave = JSON.stringify(animal); // Save as JSON string
            //     await FileSystem.writeAsStringAsync(fileUri, dataToSave);
            //     console.log(`Saved: ${fileUri}`);
            // }

            // Verify saved files
            const dirFiles = await FileSystem.readDirectoryAsync(dirUri);
            console.log("Files in directory:", dirFiles);
            loadAnimalData();

        } catch (error) {
            console.error("Error saving animal data:", error);
        }
    };

    const onAddAnimal = (
        addId: string,
        addName: string,
        addSex: string,
        addDate: number,
        addMass: number,
        addPen: string
    ) => {
        const dataToSave = JSON.stringify({
            id: addId,
            name: addName,
            code: addId,
            gender: addSex === 'm' ? 'ผู้' : 'เมีย',
            birth: addDate ? Number(addDate) : 0,
            weight: addMass ? Number(addMass) : 0,
            status: 'ปกติ',
            pen: addPen
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

    const onEditAnimal = async (
        editId: string,
        editName: string,
        editSex: string,
        editDate: number,
        editMass: number,
        editStatus: string,
        editPen: string
    ) => {
        const dirUri = FileSystem.documentDirectory + 'data/';
        const fileUri = dirUri + `${editId}.txt`;

        try {
            // Check if file exists
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (!fileInfo.exists) {
                console.warn("Animal file not found for edit:", fileUri);
                return;
            }

            // Prepare updated data
            const updatedData = JSON.stringify({
                id: editId,
                name: editName,
                code: editId,
                gender: editSex === 'm' ? 'ผู้' : 'เมีย',
                birth: editDate,
                weight: editMass ? Number(editMass) : 0,
                status: editStatus,
                pen: editPen
            });

            // Write updated data
            await FileSystem.writeAsStringAsync(fileUri, updatedData);
            console.log("Animal updated:", fileUri);

            // Reload animal data
            loadAnimalData();
        } catch (error) {
            console.error("Error editing animal:", error);
        }
    };

    const deleteAnimalByName = async (animalName: string) => {
        const dirUri = FileSystem.documentDirectory + 'data/';
        console.log("Deleting animal with name:", animalName);
        try {
            const fileNames = await FileSystem.readDirectoryAsync(dirUri);
            for (const fileName of fileNames) {
                console.log("Checking file:", fileName);
                const fileUri = dirUri + fileName;
                const content = await FileSystem.readAsStringAsync(fileUri);
                const animal = JSON.parse(content);
                if (animal.id === animalName) {
                    await FileSystem.deleteAsync(fileUri, { idempotent: true });
                    console.log(`Deleted animal file: ${fileUri}`);
                }
            }
            loadAnimalData();
        } catch (error) {
            console.error("Error deleting animal by name:", error);
        }
    };

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
        setOnLoading(true);
        const selectedFilter = filter.find(item => Number(item.id) === nowFilter);
        const sortedAnimals_name = dataPet.sort((a, b) => a.code.localeCompare(b.code));
        const sortedAnimals = sortedAnimals_name
            .sort((a, b) => Number(a.birth) - Number(b.birth))
            .sort((a, b) => Number(a.pen) - Number(b.pen))
            .sort((a, b) => {
                const indexA = statusOrder.findIndex(status => a.status.includes(status));
                const indexB = statusOrder.findIndex(status => b.status.includes(status));
                return indexA - indexB;
            });
        const filteredPets = nowFilter !== 1 && selectedFilter
            ? sortedAnimals.filter(animal => animal.status === selectedFilter.title)
            : sortedAnimals;
        const filteredPets_pen = nowPen !== 'ทั้งหมด'
            ? filteredPets.filter(animal => animal.pen === nowPen)
            : filteredPets;
        setDataPetFilter(filteredPets_pen);
        console.log(filter)
        console.log(sortedAnimals_name)

        setTimeout(() => {
            setOnLoading(false);
        }, 100);
    }, [nowFilter, nowPen]);

    const modalContent = [
        ShowDetail({ closeModal, demo_animal_detail, openEditAnimalModal }),
        AnimalAdd({ closeModal, onAddAnimal }),
        AnimalEdit({ closeModal, onEditAnimal, nameEdit, deleteAnimalByName })
    ];


    const [check_layout_vertical, setCheckLayoutVertical] = useState<boolean>(true);

    useEffect(() => {
        const handleChange = ({ window }: { window: { width: number; height: number } }) => {
            setCheckLayoutVertical(window.width < window.height);
            console.log("screenWidth, screenHeight", window.width, window.height);
        };

        const subscription = Dimensions.addEventListener('change', handleChange);

        // Initial check
        const { width, height } = Dimensions.get('window');
        setCheckLayoutVertical(width < height);

        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', justifyContent: 'flex-start', alignItems: 'center' }}>
            <ScrollView style={{ width: check_layout_vertical ? '100%' : '60%', height: '100%', position: 'relative', padding: check_layout_vertical ? 0 : 16 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.livestock_styles.container}>
                    <Pressable onPress={() => toggleHiddenButton()} >
                        <Text style={TextStyles.text_head1}>ข้อมูลปศุสัตว์</Text>
                    </Pressable>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 6, marginTop: 20 }}>
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
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 6, marginVertical: 12, overflowX: 'scroll', width: '100%', flexWrap: 'wrap' }}>
                        {nowPenList.length > 0 && <Text style={[styles.livestock_styles.text_head4_gray, { paddingVertical: 6 }]}>คอก: </Text>}
                        {
                            nowPenList.map((item) => (
                                <Pressable key={item} onPress={() => setNowPen(item)} >
                                    <View style={{ display: 'flex', alignItems: 'center', borderRadius: 10, backgroundColor: nowPen == item ? '#fff' : '#eee', borderColor: nowPen == item ? '#2F8668' : '#2F866800', borderWidth: 1, padding: 10 }}>
                                        <Text style={styles.livestock_styles.text_head3}>{item}</Text>
                                    </View>
                                </Pressable>
                            ))
                        }
                    </View>
                    {
                        onLoading ?
                            <View style={{ width: '100%', alignItems: 'center', height: 100 }} >
                                <ReloadPage />
                            </View> : null
                    }
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
            <View style={{ display: hiddenButton ? 'flex' : 'none', position: 'absolute', bottom: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <Pressable onPress={dataExpo_showlist} style={[styles.livestock_styles.plusIcon, { right: 80, backgroundColor: '#444', borderRadius: 0 }]}>
                    <MaterialCommunityIcons name="view-list" size={32} color={'white'} />
                </Pressable>
                <Pressable onPress={dataExpo_deletelist} style={[styles.livestock_styles.plusIcon, { right: 140, backgroundColor: '#444', borderRadius: 0 }]}>
                    <MaterialCommunityIcons name="delete" size={32} color={'white'} />
                </Pressable>
                <Pressable onPress={dataExpo_demosavelist} style={[styles.livestock_styles.plusIcon, { right: 200, backgroundColor: '#444', borderRadius: 0 }]}>
                    <MaterialCommunityIcons name="auto-upload" size={32} color={'white'} />
                </Pressable>
            </View>
            {/* <AddModal isVisible={showAdd} onClose={closeModal} /> */}
            <ShowModal
                isVisible={showModal}
                onClose={closeModal}
                content={modalContent[nowPage]}
                gray={nowPage === 0 ? true : false}
            />
        </View >
    )
}

export default Livestock