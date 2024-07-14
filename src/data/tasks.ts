import { TaskPreset } from "@/models/task";
// สายกิน
export const TaskTasteLimestone: TaskPreset = {
  name: "รสชาติของหินปูน",
  desc: "เลียหินหรืออาคารที่อยู่ใกล้ที่สุดและอธิบายรสชาติ",
  type: "eat",
};
export const TaskAIFood: TaskPreset = {
    name: "AI โภชนา",
    desc: "Generate รูป AI ในโทรศัพท์ของคุณ โดยบอก AI ว่า 'อาหาร'+ชื่อเล่นพ่อของคุณ+ชื่อสีที่คุณใส่ และสั่งอาหารจากรูปที่ Gen มาในร้านที่ใกล้ที่สุด",
    type: "eat",
}
export const TaskPretendTaste: TaskPreset = {
  name: "กินลมชมวิว",
  desc: "อ้าปาก ทำเหมือนกินสิ่งที่ผ่านไปมา และถ่ายรูปลงโซเชียล",
  type: "eat",
};
export const TaskSoHungry: TaskPreset = {
  name: "หิวจนตาลาย",
  desc: "ถ่ายของที่กินไม่ได้ จินตนาการว่ามันคือของกิน แล้วบอกว่่ามันคือของกินอะไร เช่น ถ่ายรูปหญ้าแล้วบอกว่านี่คือ สลัดออร์แกนิค",
  type: "eat",
};
export const TaskWhatToHaveForDinner: TaskPreset = {
  name: "เย็นนี้อยากกินอะไร",
  desc: "ถามหาของกินฟรีจากคนที่เดินผ่านไปผ่านมา (ถ้าทำแล้วยังไม่ได้ของกิน ก็สามารหาที่ชิมอาหารฟรีแทนได้",
  type: "eat",
};

// เพิ่มปฏิสัมพันธ์
export const TaskSayHi: TaskPreset = {
  name: "Say Hi!",
  desc: "ทักทายและเริ่มคุยกับคนแปลกหน้าเป็นภาษาอังกฤษ",
  type: "relationship",
};

export const TaskPudThaiMaiDai: TaskPreset = {
  name: "Pud Thai Mai Dai",
  desc: "ทักมายรูปปั้นหรือรูปคน(เช่น ป้ายหาเสียง) ด้วยภาษาอะไรก็ได้ (อาจเป็นภาษา Code หรือ Sign Language ก็ได้) ",
  type: "relationship",
};

export const TaskTalkNewFriend: TaskPreset = {
  name: "Talking with your new friends",
  desc: "เขียน Code เป็นภาษาอะไรก็ได้",
  type: "relationship",
};
export const TaskFriendWithBenefit: TaskPreset = {
  name: "Friend with Benefit",
  desc: "พูดคุยกับแม่ค้าในตลาด พูดคุยอะไรกับเค้าก็ได้ คนเค้าให้ส่วนลด หรือ ของกินฟรี",
  type: "relationship",
};
export const TaskCompliment: TaskPreset = {
  name: "โหยหาความรักความเมตตา",
  desc: "ไปขอให้คนแปลกหน้าช่วยชมอะไรตัวเอง 10 คน",
  type: "relationship",
};

// สายรักโลก
export const TaskType1: TaskPreset = {
  name: "กราบพื้นดินสามครั้ง",
  desc: "กราบพื้นดินสามครั้ง",
  type: "environment",
};

export const TaskHugTree: TaskPreset = {
  name: "Hug the tree",
  desc: "กอดต้นไม้ให้แน่นประหนึ่งคุณกอดแฟน มันจะดีมากถ้าคุณบอกรักด้วยรหัสมอร์ส",
  type: "environment",
};
export const TaskCarFree: TaskPreset = {
  name: "Car Free",
  desc: "วิ่งตามรถเมล์ที่ใกล้ที่สุดไปอีกหนึ่งป้าย",
  type: "environment",
};
export const TaskTrash: TaskPreset = {
  name: "Fly to the trash",
  desc: "เก็บกระดาษหรืออะไรที่พับได้ พับให้เป็นจรวดและปาจนกว่าจะลงถัง",
  type: "environment",
};
export const TaskFiveStar: TaskPreset = {
  name: "โรงแรมห้าดาว",
  desc: "นอนบนหญ้าและใช้ชีวิตประหนึ่งคุณนอนโรงแรม 5 ดาว",
  type: "environment",
};
// สายลักโลก

export const TaskMoveIt: TaskPreset = {
  name: "Move it",
  desc: "ทำให้ของที่อยู่ปกติไม่ปกติ เช่น เอารังนกมาไว้ที่พื้น",
  type: "thief",
};
export const TaskMyStoneFriend: TaskPreset = {
  name: "ก้อนหินเพื่อนลัก",
  desc: "เก็บก้อนหินใกล้ตัวคุณมา และทำมันเป็นสัตว์เลี้ยง",
  type: "thief",
};
export const Task5Thb: TaskPreset = {
  name: "5 บาท",
  desc: "เก็บขยะหรือของที่คนทิ้งแล้ว เอาไปขายให้ได้เงินอย่างน้อย 5 บาท",
  type: "thief",
};
export const TaskDigItUp: TaskPreset = {
  name: "Dig it up",
  desc: "ในน้ำมีปลา ในนามีข้าว ไปขุดดินและเก็บของที่เจอกลับบ้าน ไม่ว่าจะเป็นทองหรือไส้เดือน",
  type: "thief",
};
export const TaskFreeStaff: TaskPreset = {
  name: "ของฟรีมีในโลก",
  desc: "ทุกคนต้องเคยทิ้งปากกาหรือดินสอไว้ หาให้เจอและเขียนจดหมายว่าคุณพบสิ่งนี้ที่ไหน ถ้าเขียนไม่ได้ ก็กดให้เห็นรอย",
  type: "thief",
};

// สายวัด

export const TaskHolyLand: TaskPreset = {
  name: "ดินแดนแห่งสิ่งศักดิ์สิทธิ์",
  desc: "หาสิ่งที่ศักดิ์สิทธิ์ที่สุดในบริเวณนั้นมา และคุณต้องเดินนับก้าวอีกกี่ก้าวจนกว่าคุณจะพบสิ่งศักดิ์สิทธิ์",
  type: "religion",
};
export const TaskHelpMe: TaskPreset = {
  name: "ช่วยลูกช้างวัดด้วย",
  desc: "วัดรอบต้นไม้ที่คิดว่าศักดิ์สิทธิ์ที่สุด วัดความยาวหลอดถ้ามีขวดน้ำแดงและวัดความยาวธูปที่ปักด้วยถ้ามี",
  type: "religion",
};
export const Task: TaskPreset = {
  name: "ท่ า น ผู้ เ จ ริ ญ",
  desc: "สวดมนต์ในพื้นที่ ที่มีคำพ้องเสียงกับคำว่าวัดแต่ไม่ใช่วัด เช่น สวดมนต์ในร้าน Watson",
  type: "religion",
};
export const TaskMario: TaskPreset = {
  name: "Mario",
  desc: "กระโดดเป็นเส้นตรงไปข้างหน้าเรื่อยๆ จนกว่าจะกระโดดไม่ได้ วัดว่าคุณกระโดดไปได้กี่เมตร",
  type: "religion",
};
export const TaskRockAndRoll: TaskPreset = {
  name: "Rock and Roll",
  desc: "หาของใกล้ตัวที่เป็นวงกลม และวัดว่ากลิ้งไปได้ไกลกี่เมตร ถ้าหาไม่เจอ คุณก็ม้วนหน้าแล้ววัดเอานะ",
  type: "religion",
};

// สายเกินแก้

export const TaskGuard: TaskPreset = {
  name: "ลุงยาม ลุงยามอยู่ไหน",
  desc: "แทนที่คุณจะไปทำธุระกับหน่วยงานไหน คุณก็ทำธุระกับลุงยามเลยสิ เช่น ถอนเงินกับยามเฝ้าธนาคาร ให้ยามที่ตึกวิศวะสอนแคล 1",
  type: "outstanding",
};

export const TaskMerci: TaskPreset = {
  name: "เมตตาธรรมค้ำจุนโลก",
  desc: "ขอของกินฟรีจากคนในร้านอาหาร",
  type: "outstanding",
};

export const TaskDisrupter: TaskPreset = {
  name: "กว้างขวางคอ",
  desc: "นั่งแทรกคู่รัก หรือกลุ่มคน ในรถไฟฟ้า",
  type: "outstanding",
};

export const TaskGhost: TaskPreset = {
  name: "Ghost radio",
  desc: "เล่าเรื่องผีให้คนที่ผ่านไปมาฟัง",
  type: "outstanding",
};

export const TaskTaxi: TaskPreset = {
  name: "โกงแท็กซี่กลับซะ",
  desc: "เคยโดนแท็กซี่โกงมั้ย ขอต่อราคาแท็กซี่ให้ถูกที่สุดเพื่อนั่งไประยะ 1 ป้ายรถเมล์",
  type: "outstanding",
};

export const TaskPresets: TaskPreset[] = [
  TaskTasteLimestone,
  TaskAIFood,
  TaskPretendTaste,
  TaskSoHungry,
  TaskWhatToHaveForDinner,
  TaskSayHi,
  TaskPudThaiMaiDai,
  TaskTalkNewFriend,
  TaskFriendWithBenefit,
  TaskCompliment,
  TaskType1,
  TaskHugTree,
  TaskCarFree,
  TaskTrash,
  TaskFiveStar,
  TaskMoveIt,
  TaskMyStoneFriend,
  Task5Thb,
  TaskDigItUp,
  TaskFreeStaff,
  TaskHolyLand,
  TaskHelpMe,
  Task,
  TaskMario,
  TaskRockAndRoll,
  TaskGuard,
  TaskMerci,
  TaskDisrupter,
  TaskGhost,
  TaskTaxi,
];
