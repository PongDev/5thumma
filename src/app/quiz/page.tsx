"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

import { quizContent } from "../../constants/quiz";
import { TaskType } from "@/models/task";
import { CreateUserRequestDTO } from "@/dtos/user";
import Navbar from "@/components/Navbar";

const Quiz = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<boolean[]>([false, false, false]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
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
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[step - 1] = isYes;
      return newAnswers;
    });

    if (step === 3) setIsSubmit(true);
    else setStep((prevStep) => (prevStep + 1) as 1 | 2 | 3);
  };

  useEffect(() => {
    const postUserData = async (allowTaskTypes: TaskType[]) => {
      const userData: CreateUserRequestDTO = {
        allowTaskTypes,
      };

      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      return response;
    };

    if (isSubmit) {
      const allowTaskTypes = calculatePreferences(answers);
      console.log(answers, allowTaskTypes);

      postUserData(allowTaskTypes).then(async (res: any) => {
        const response = await res.json();
        localStorage.setItem("user_token", response.token);
        router.push("/quest");
      });
    }
  }, [isSubmit]);

  return (
    <main className="min-h-screen text-center p-24">
      <Navbar />

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
