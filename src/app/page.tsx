import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-9">
        <h1 className="font-bold text-3xl text-indigo-500">
          คุณเคยประสบปัญหา เบื่อโลก หรือไม่?
        </h1>
        <p>
          <span className="text-indigo-500 text-2xl">5thumma หาธรรมมะ</span>{" "}
          คือเว็บไซต์ที่จะเสนอเควสต์หาทำให้กับคุณ <br />
          เพียงรับเควสต์จากเรา แล้วชีวิตของคุณจะไม่น่าเบื่ออีกต่อไป
        </p>

        <Button size="lg">
          <Link href="/quiz">เริ่มหาทำ ณ บัดเดี๋ยวนี้เลย</Link>
        </Button>
      </div>
    </main>
  );
}
