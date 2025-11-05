import { Metadata } from "next";
import Carousel from "@/components/Carousel";

export const metadata: Metadata = {
  title: 'Dashboard | TPlus',
}

export default function Dashboard() {

  return (
    <>
      <Carousel slideNum={2} />
    </>
  );
}
