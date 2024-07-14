"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

import { quizContent } from "../../constants/quiz";
import { TaskType } from "@/models/task";

const Quiz = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<boolean[]>([false, false, false]);
  const [allowedTaskTypes, setAllowedTaskTypes] = useState<TaskType[]>([]);
  const { question, image } = quizContent[step - 1];

  const calculatePreferences = (answers: boolean[]) => {
    const allowedTaskTypes: TaskType[] = [];
    // TODO reconfirm if task types are correct
    if (answers[0]) {
      allowedTaskTypes.push("eat");
      if (answers[1]) allowedTaskTypes.push("outstanding");
      if (answers[2]) allowedTaskTypes.push("environment");
    }
    if (answers[1]) {
      allowedTaskTypes.push("relationship");
      if (answers[2]) allowedTaskTypes.push("thief");
    }
    if (answers[2]) {
      allowedTaskTypes.push("religion");
    }

    if (!answers[0] && !answers[1] && !answers[2]) {
      allowedTaskTypes.push("outstanding", "environment", "thief");
    }

    return allowedTaskTypes;
  };

  const handleSelect = (isYes: boolean) => {
    console.log(step);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[step - 1] = isYes;
      return newAnswers;
    });

    // FIXME Bug where the last value isn't updated before submit
    if (step === 3) {
      setAllowedTaskTypes(calculatePreferences(answers));
      console.log(answers, allowedTaskTypes);
      // TODO submit prefs to backend
      router.push("/quest");
    } else setStep((prevStep) => (prevStep + 1) as 1 | 2 | 3);
  };

  return (
    <main className="min-h-screen text-center p-24">
      <Button variant="ghost" className="absolute top-4 left-4">
        <ChevronLeftIcon />
        <Link href="/">พ้มไม่เบื่อโลกแล้วว่ะ</Link>
      </Button>
      <h1 className="font-medium text-xl mb-10">
        ไหนดูสิ้ว่าคุณเหมาะกับการหาทำแบบไหน
      </h1>
      <div className="flex flex-col items-center">
        <p className="text-indigo-500">คำถามข้อที่ {step} จาก 3</p>
        <p className="text-xl mb-6">{question}</p>
        <Image src={image} height={300} alt={question} className="rounded-xl" />
        <div className="space-x-5 mt-8">
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-lime-100 hover:text-lime-500 hover:border-lime-300"
            onClick={() => handleSelect(true)}
          >
            เยส 🙆‍♀️
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-pink-100 hover:text-pink-500 hover:border-pink-300"
            onClick={() => handleSelect(false)}
          >
            โน 🙅‍♀️
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
