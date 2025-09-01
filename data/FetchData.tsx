import dataAnimal from '@/data/json/exampleAnimal.json';
import dataTasks from '@/data/json/task.json';
import axios from 'axios';

const fetchGet = async () => {
    try {
        const response = await axios.get('https://bfarm-api.noip.in.th/mac"_id"');
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
    age: number;
    weight: number;
    status: AnimalStatus;
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
    { id: 'M241129', name: 'บื้อ', code: 'M241129', gender: 'ผู้', age: 5, weight: 612, status: 'ปกติ' },
    { id: 'BF005', name: 'Bella', code: 'BF005', gender: 'เมีย', age: 6, weight: 672, status: 'ติดสัด' },
    { id: 'M14596', name: 'ตะโกร๋', code: 'M14596', gender: 'เมีย', age: 10, weight: 318.5, status: 'ผิดปกติ' },
    { id: 'BF004', name: 'Max', code: 'BF004', gender: 'ผู้', age: 4, weight: 524, status: 'ปกติ' },
    { id: 'BF003', name: 'Luna', code: 'BF003', gender: 'เมีย', age: 5, weight: 624, status: 'ส่งออก' },
    { id: 'BF006', name: 'Max', code: 'BF006', gender: 'ผู้', age: 4, weight: 598, status: 'ตาย' },
    { id: 'BF009', name: 'Min', code: 'BF009', gender: 'ผู้', age: 4, weight: 534, status: 'ตาย' },
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
    textunit: string;
    status: "normal" | "critical" | "warning";
    lock: boolean;
    dot?: boolean;
}

export const demo_summary: summaryProps[] = [
    {
        "title": "การเติบโต",
        "textsummary": "ปกติ",
        "textlist1": "ปกติ",
        "textvalue1": 412,
        "textlist2": "ผิดปกติ",
        "textvalue2": 0,
        "textunit": "ตัว",
        "status": "normal",
        "dot": true,
        "lock": true
    },
    {
        "title": "สุขภาพ",
        "textsummary": "ป่วย 2 ตัว",
        "textlist1": "ปกติ",
        "textvalue1": 410,
        "textlist2": "ผิดปกติ",
        "textvalue2": 2,
        "textunit": "ตัว",
        "status": "critical",
        "dot": true,
        "lock": true
    },
    {
        "title": "ประสิทธิภาพฟาร์ม",
        "textsummary": "ดี",
        "textlist1": "ค่าประสิทธิภาพ",
        "textvalue1": 74,
        "textlist2": "เกณฑ์มาตรฐาน",
        "textvalue2": 65,
        "textunit": "%",
        "status": "normal",
        "lock": true
    },
    {
        "title": "อาหาร (ฟาง)",
        "textsummary": "เหลือ 3 วัน",
        "textlist1": "ต้องการต่อวัน",
        "textvalue1": 523,
        "textlist2": "อาหารในคลัง",
        "textvalue2": 2632,
        "textunit": "ก้อน",
        "status": "warning",
        "dot": true,
        "lock": true
    },
    {
        "title": "ปริมาณน้ำนม",
        "textsummary": "ต่ำกว่าเกณฑ์",
        "textlist1": "ปริมาณเฉลี่ย",
        "textvalue1": 2.51,
        "textlist2": "เกณฑ์มาตรฐาน",
        "textvalue2": 4.00,
        "textunit": "ลิตร",
        "status": "warning",
        "dot": true,
        "lock": true
    }
]

export const demo_animal_detail = dataAnimal;

export default fetchGet