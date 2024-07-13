import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import boredPic from "../assets/0_bored.png";
import happyPic from "../assets/0_happy.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center p-24">
      <div className="flex flex-col items-center text-center space-y-9">
        <h1 className="font-bold text-3xl text-indigo-500">
          คุณเคยประสบปัญหา เบื่อโลก หรือไม่?
        </h1>

        <div className="flex">
          <div>
            <p className="mb-1">Before:</p>
            <Image
              src={boredPic}
              width={200}
              height={200}
              alt="Picture of boredom"
            />
          </div>
          <div>
            <p className="mb-1">After:</p>
            <Image
              src={happyPic}
              width={112}
              height={200}
              alt="Picture of happiness after doing 5thumma quests"
            />
          </div>
        </div>

        <p>
          <span className="text-indigo-500 text-2xl">5thumma หาธรรมมะ</span>{" "}
          คือเว็บไซต์ที่จะเสนอ
          <span className="text-lime-500"> "เควสต์หาทำ" </span>ให้กับคุณ <br />
          เพียงรับเควสต์จากเรา แล้วชีวิตของคุณจะไม่น่าเบื่ออีกต่อไป
        </p>

        <Button size="lg">
          <Link href="/quiz">เริ่มหาทำ ณ บัดเดี๋ยวนี้เลย</Link>
        </Button>
      </div>
    </main>
  );
}
