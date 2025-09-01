import ShowModal from '@/components/modal/ShowModal';
import { CropAdd } from '@/components/modal/modalCrop/CropAdd';
import { CropAnimalAdd } from '@/components/modal/modalCrop/CropAnimalAdd';
import { CropAnimalDelete } from '@/components/modal/modalCrop/CropAnimalDelete';
import { CropAnimalList } from '@/components/modal/modalCrop/CropAnimalList';
import { CropDelete } from '@/components/modal/modalCrop/CropDelete';
import { SelectCrop } from '@/components/modal/modalCrop/SelectCrop';
import SummaryCard from '@/components/summaryCard/SummaryCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import TextStyles from '../../constants/Texts';
import { FocusAnimalContext } from '../../contexts/FocusAnimalContext';
import { AnimalContext, AnimalProps } from '../../contexts/ListAnimalContext';
import { demo_crop } from '../../data/FetchData';
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


    const [showModal, setShowModal] = useState<boolean>(false);
    const [nowPage, setPage] = useState<number>(0);
    const [selectCrop, setSelectCrop] = useState<string>("");

    const closeModal = () => {
        setShowModal(false);
    }
    const modalContent = [
        CropAdd({ closeModal }),
        SelectCrop({ changePage: setPage, selectCrop }),
        CropAnimalList({ selectCrop }),
        CropAnimalAdd({ closeModal, selectCrop }),
        CropAnimalDelete({ closeModal, changePage: setPage }),
        CropDelete({ closeModal, selectCrop })
    ];

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
                                    textHead={item.status == "normal" ? "ปกติ" : "ผิดปกติ"}
                                    textSub1={"จำนวนสัตว์"}
                                    textValue1={(item.countall).toString()}
                                    textSub2={"ปริมาณอาหาร"}
                                    textValue2={(item.food).toString()}
                                    textUnit={""}
                                    status={item.status}
                                    dot={true}
                                    lock={false}
                                    onClick={() => { setSelectCrop(item.name); setShowModal(true); setPage(1); }}
                                />
                            ))
                        }
                    </View>
                </View>
            </ScrollView >
            <Pressable style={styles.livestock_styles.plusIcon} onPress={() => { setShowModal(true); setPage(0); }}>
                <MaterialCommunityIcons name="plus" size={32} color={'white'} />
            </Pressable>
            <ShowModal
                isVisible={showModal}
                onClose={closeModal}
                content={modalContent[nowPage]}
            />
        </View >
    )
}

export default Crop