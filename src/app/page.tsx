import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button size="lg">เริ่มหาทำ</Button>
      <Button size="lg" variant="secondary">
        เริ่มหาทำ
      </Button>
      <Button size="lg" variant="ghost">
        เริ่มหาทำ
      </Button>
    </main>
  );
}
