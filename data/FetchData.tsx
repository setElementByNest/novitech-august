import dataAnimal from '@/data/json/exampleAnimal.json';
import dataVaccineList from '@/data/json/infoVaccine.json';
import dataCategoryAnimals from '@/data/json/listCategoryAnimals.json';
import dataHealth from '@/data/json/listHealth.json';
import dataListVaccine from '@/data/json/listVaccine.json';
import dataSummary from '@/data/json/summary.json';
import dataTasks from '@/data/json/task.json';
import dataVaccineTasks from '@/data/json/tasksVaccine.json';


import axios from 'axios';

const url_fb = "https://farmboost-c9a0hnf6f7gzcdcy.southeastasia-01.azurewebsites.net/api/"

export const fetchGet = async (endpoint: string) => {
    try {
        const response = await axios.get(`${url_fb}${endpoint}`, {
            headers: {
                'Authorization': 'Token cebb91d7da9dec19dc02ca52d3826038e4966bbf',
                'User-Agent': 'Nest'
            }
        });
        console.log("response", response.status);
        return response.data;
    } catch (error) {
        return error;
    }
};

type TaskProps = {
    "name": string;
    "status": string;
    "timestamp": number;
    "_id": number;
};

type Animal = {
    id: string;
    name: string;
    code: string;
    gender: 'ผู้' | 'เมีย';
    birth: number;
    weight: number;
    status: AnimalStatus;
    pen: string;
};

type AnimalStatus = 'ปกติ' | 'ติดสัด' | 'ผิดปกติ' | 'ส่งออก' | 'ตาย';

type Crop = {
    id: string;
    name: string;
    status: "normal" | "critical" | "warning";
    countall: number;
    countabnormal: number;
    food: number;
}

export const demo_task: TaskProps[] = Array.isArray(dataTasks)
    ? (dataTasks as TaskProps[])
    : [];


export const demo_animal: Animal[] = [
    { id: 'M241129', name: 'บื้อ', code: 'M241129', gender: 'ผู้', birth: 1621822762, weight: 612, status: 'ปกติ', pen: 'คอกวัยรุ่นชาย' },
    { id: 'BF005', name: 'Bella', code: 'BF005', gender: 'เมีย', birth: 1521822762, weight: 672, status: 'ติดสัด', pen: 'คอกให้นม' },
    { id: 'M14596', name: 'ตะโกร๋', code: 'M14596', gender: 'เมีย', birth: 1681822762, weight: 318.5, status: 'ผิดปกติ', pen: 'คอกแก่' },
    { id: 'BF004', name: 'Max', code: 'BF004', gender: 'ผู้', birth: 1611822762, weight: 524, status: 'ปกติ', pen: 'คอกวัยรุ่นชาย' },
    { id: 'BF003', name: 'Luna', code: 'BF003', gender: 'เมีย', birth: 1691822762, weight: 624, status: 'ส่งออก', pen: '' },
    { id: 'BF006', name: 'Max', code: 'BF006', gender: 'ผู้', birth: 1655822762, weight: 598, status: 'ตาย', pen: '' },
    { id: 'BF009', name: 'Min', code: 'BF009', gender: 'ผู้', birth: 1666822762, weight: 534, status: 'ตาย', pen: '' },
];

export const demo_crop: Crop[] = [
    { id: 'crop01', name: 'คอกเด็กเล็ก', status: 'normal', countall: 42, countabnormal: 0, food: 512 },
    { id: 'crop02', name: 'คอกวัยรุ่นชาย', status: 'normal', countall: 22, countabnormal: 0, food: 412 },
    { id: 'crop03', name: 'คอกวัยรุ่นสาว', status: 'critical', countall: 32, countabnormal: 2, food: 951 },
    { id: 'crop04', name: 'คอกให้นม', status: 'normal', countall: 25, countabnormal: 0, food: 732 },
    { id: 'crop05', name: 'คอกแก่', status: 'normal', countall: 11, countabnormal: 0, food: 241 },
];

export interface DemoDetailProps {
    id: string;
    detail: {
        status: string;
        gene: string;
        dad: string;
        mom: string;
    };
    health: HealthTask[];
    vaccination: VaccinationRecord[];
    heat: {
        daylist: number[];
        problist: number[];
    };
}

export interface HealthTask {
    name: string;
    date: number;
    safe: boolean; // add more if other statuses exist
}

export interface VaccinationRecord {
    name: string;
    date: number;
    done: boolean; // same here
}

export const demo_detail: DemoDetailProps = {
    "id": "M241129",
    "detail": {
        "status": "ปกติ",
        "gene": "Golden Retriever",
        "dad": "BF005",
        "mom": "BF004",
    },
    "health": [
        {
            "name": "ข้อเท้า ขาหลังซ้าย บวม",
            "date": 1748786064,
            "safe": false
        },
        {
            "name": "ไข้เลือดออก",
            "date": 1748307196,
            "safe": true
        },
        {
            "name": "ไข้เลือดออก",
            "date": 1747307196,
            "safe": true
        },
        {
            "name": "ไข้เลือดออก",
            "date": 1746307196,
            "safe": true
        },
        {
            "name": "ไข้เลือดออก",
            "date": 1745307196,
            "safe": true
        }
    ],
    "vaccination": [
        {
            "name": "MorrhaTic Ticaegia",
            "date": 1748786064,
            "done": false
        },
        {
            "name": "Haemorrhagic Septicaemia",
            "date": 1750678055,
            "done": true
        }
    ],
    "heat": {
        "daylist": [2, 3, 4, 5, 6, 7, 8],
        "problist": [0.2, 0.4, 0.8, 0.9, 0.7, 0.2, 0.1],
    }
};
export interface summaryProps {
    title: string;
    textsummary: string;
    textlist1: string;
    textvalue1: number;
    textlist2: string;
    textvalue2: number;
    textunit1: string;
    textunit2: string;
    status: "normal" | "critical" | "warning";
    lock: boolean;
    dot?: boolean;
}

export const demo_summary: summaryProps[] = (dataSummary as any[]).map(item => ({
    ...item,
    status: (["normal", "critical", "warning"].includes(item.status) ? item.status : "normal") as "normal" | "critical" | "warning"
}));

export const fetchSummary = async (): Promise<summaryProps[]> => {
    const data = await fetchGet('farms/0001/overview_cards/');
    return data;
};

export const demo_animal_detail = dataAnimal;

interface CategoryAnimal {
    topic: string;
    value: number;
}

export const demo_category_animals: CategoryAnimal[] = dataCategoryAnimals;

interface VaccineList {
    name: string;
    type: string;
    use: boolean;
    original: boolean;
    list: VaccineListItem[];
}

interface VaccineListItem {
    name: string;
    dose: number;
    period: number;
    doseUnit: string;
}

export const demo_vaccine_list: VaccineList[] = dataVaccineList;

interface VaccineTask {
    name: string;
    list: VaccineTaskItem[];
}

interface VaccineTaskItem {
    name: string;
    done: boolean;
}

export const demo_vaccine_tasks: VaccineTask[] = dataVaccineTasks;

interface listVaccine {
    id: string;
    name: string;
    manufacturer: string;
}

export const dataListVaccines: listVaccine[] = dataListVaccine;

export default fetchGet

interface HealthProps {
    date: string;
    topic: string;
    done: boolean;
}
export const demo_health: HealthProps[] = dataHealth;