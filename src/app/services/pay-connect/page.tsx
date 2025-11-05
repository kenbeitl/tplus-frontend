import { Metadata } from "next";
import Carousel from "@/components/Carousel";

export const metadata: Metadata = {
  title: 'PayConnect | Services | TPlus',
}

export default function PayConnect() {


  return (
  <>
    <Carousel slideNum={2} />
  </>
  );
}
