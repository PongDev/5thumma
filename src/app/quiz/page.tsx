import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const Quiz = () => {
  return (
    <main className="min-h-screen text-center p-24">
      <Button variant="outline" className="absolute top-4 left-4">
        <ChevronLeftIcon />
        <Link href="/">พ้มไม่เบื่อโลกแล้วว่ะ</Link>
      </Button>
      <h1 className="font-medium text-xl mb-10">
        ไหนดูสิ้ว่าคุณเหมาะกับการหาทำแบบไหน
      </h1>
      <div className="flex flex-col items-center">
        <p className="text-indigo-500">คำถามข้อที่ 1 จาก 3</p>
        <p className="text-xl mb-5">คุณเป็นสายกินหรือไม่?</p>
        <div className="space-x-5">
          <Button size="lg" variant="outline">
            เยส 🙆‍♀️
          </Button>
          <Button size="lg" variant="outline">
            โน 🙅‍♀️
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
