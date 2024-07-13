import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

import imageData from "../../assets/1_eat.png";

const Quiz = () => {
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
        <p className="text-indigo-500">คำถามข้อที่ 1 จาก 3</p>
        <p className="text-xl mb-5">คุณเป็นสายกินหรือไม่?</p>
        <Image
          src={imageData}
          width={400}
          alt="Picture of boredom"
          className="rounded-md"
        />
        <div className="space-x-5 mt-5">
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-lime-100 hover:text-lime-500 hover:border-lime-300"
          >
            เยส 🙆‍♀️
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-pink-100 hover:text-pink-500 hover:border-pink-300"
          >
            โน 🙅‍♀️
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
