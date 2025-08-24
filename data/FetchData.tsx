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

export const demo_task: (TaskProps)[] = [
    { "_id": 1, "name": "ฉีดวัคซีน MorrhaTic Ticaegia", "status": "completed", "timestamp": 1754131200 },
    { "_id": 2, "name": "ตรวจสุขภาพควาย", "status": "pending", "timestamp": 1754217600 },
    { "_id": 3, "name": "จัดทำบันทึกสุขภาพควาย", "status": "completed", "timestamp": 1754304000 },
    { "_id": 4, "name": "เปลี่ยนฟางในโรงเรือน", "status": "completed", "timestamp": 1754390400 },
    { "_id": 5, "name": "ชั่งน้ำหนักควาย 28 ตัว", "status": "completed", "timestamp": 1754476800 },
    { "_id": 6, "name": "เก็บขี้ควาย", "status": "pending", "timestamp": 1754563200 },
    { "_id": 7, "name": "ซ่อมหลังคาโรงเรือน", "status": "completed", "timestamp": 1754649600 },
    { "_id": 8, "name": "ตัดเล็บเท้าควาย 5 ตัว", "status": "pending", "timestamp": 1754736000 },
    { "_id": 9, "name": "ชั่งน้ำหนักควาย 28 ตัว", "status": "completed", "timestamp": 1754822400 },
    { "_id": 10, "name": "เก็บขี้ควาย", "status": "pending", "timestamp": 1754908800 },
    { "_id": 11, "name": "ตรวจสุขภาพควาย", "status": "pending", "timestamp": 1754995200 },
    { "_id": 12, "name": "ให้อาหารเสริมโปรตีน", "status": "pending", "timestamp": 1755081600 },
    { "_id": 13, "name": "เก็บตัวอย่างมูลส่งแลป", "status": "pending", "timestamp": 1755168000 },
    { "_id": 14, "name": "ชั่งน้ำหนักควาย 28 ตัว", "status": "completed", "timestamp": 1755254400 },
    { "_id": 15, "name": "ให้อาหารเสริมโปรตีน", "status": "pending", "timestamp": 1755340800 },
    { "_id": 16, "name": "ซ่อมแซมรั้วคอกควาย", "status": "completed", "timestamp": 1755427200 },
    { "_id": 17, "name": "ฉีดวัคซีน Haemorrhagic Septicaemia", "status": "pending", "timestamp": 1755513600 },
    { "_id": 19, "name": "ล้างบ่อเก็บน้ำ", "status": "pending", "timestamp": 1755600000 },
    { "_id": 20, "name": "ซ่อมแซมรั้วคอกควาย", "status": "completed", "timestamp": 1755686400 },
    { "_id": 21, "name": "ซ่อมหลังคาโรงเรือน", "status": "pending", "timestamp": 1755772800 },
    { "_id": 22, "name": "ชั่งน้ำหนักควาย 28 ตัว", "status": "completed", "timestamp": 1755859200 },
    { "_id": 23, "name": "เก็บขี้ควาย", "status": "pending", "timestamp": 1755945600 },
    { "_id": 24, "name": "จัดทำบันทึกสุขภาพควาย", "status": "pending", "timestamp": 1756032000 },
    { "_id": 25, "name": "เก็บขี้ควาย", "status": "completed", "timestamp": 1756118400 },
    { "_id": 26, "name": "ตัดเล็บเท้าควาย 5 ตัว", "status": "pending", "timestamp": 1756204800 },
    { "_id": 27, "name": "เก็บขี้ควาย", "status": "completed", "timestamp": 1756291200 },
    { "_id": 28, "name": "เก็บขี้ควาย", "status": "pending", "timestamp": 1756377600 },
    { "_id": 29, "name": "ซ่อมแซมรั้วคอกควาย", "status": "completed", "timestamp": 1756464000 },
    { "_id": 30, "name": "เก็บตัวอย่างเลือดควาย 3 ตัว", "status": "pending", "timestamp": 1756550400 },
    { "_id": 31, "name": "ฉีดวัคซีน MorrhaTic Ticaegia", "status": "pending", "timestamp": 1756636800 },
    { "_id": 32, "name": "ตรวจวัดอุณหภูมิคอก", "status": "completed", "timestamp": 1756723200 },
    { "_id": 33, "name": "จัดทำบันทึกสุขภาพควาย", "status": "completed", "timestamp": 1756809600 },
    { "_id": 34, "name": "ให้อาหารเสริมโปรตีน", "status": "completed", "timestamp": 1756896000 },
    { "_id": 35, "name": "ล้างบ่อเก็บน้ำ", "status": "completed", "timestamp": 1756982400 },
    { "_id": 36, "name": "เก็บตัวอย่างมูลส่งแลป", "status": "completed", "timestamp": 1757068800 },
    { "_id": 37, "name": "อาบน้ำควาย 10 ตัว", "status": "pending", "timestamp": 1757155200 },
    { "_id": 38, "name": "เก็บตัวอย่างมูลส่งแลป", "status": "pending", "timestamp": 1757241600 },
    { "_id": 39, "name": "เก็บขี้ควาย", "status": "completed", "timestamp": 1757328000 },
    { "_id": 40, "name": "เปลี่ยนฟางในโรงเรือน", "status": "pending", "timestamp": 1757414400 },
    { "_id": 41, "name": "ชั่งน้ำหนักควาย 28 ตัว", "status": "pending", "timestamp": 1757500800 },
    { "_id": 42, "name": "ตรวจวัดอุณหภูมิคอก", "status": "pending", "timestamp": 1757587200 },
    { "_id": 43, "name": "อาบน้ำควาย 10 ตัว", "status": "completed", "timestamp": 1757673600 },
    { "_id": 44, "name": "เก็บขี้ควาย", "status": "pending", "timestamp": 1757760000 },
    { "_id": 45, "name": "ซ่อมหลังคาโรงเรือน", "status": "pending", "timestamp": 1757846400 },
    { "_id": 46, "name": "เก็บตัวอย่างมูลส่งแลป", "status": "pending", "timestamp": 1757932800 },
    { "_id": 47, "name": "ให้อาหารหยาบ", "status": "pending", "timestamp": 1758019200 },
    { "_id": 48, "name": "ฉีดวัคซีน Haemorrhagic Septicaemia", "status": "completed", "timestamp": 1758105600 },
    { "_id": 49, "name": "เปลี่ยนฟางในโรงเรือน", "status": "completed", "timestamp": 1758192000 },
    { "_id": 50, "name": "เก็บขี้ควาย", "status": "pending", "timestamp": 1758278400 }
];



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


export default fetchGet