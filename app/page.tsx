import Link from "next/link";
import Container from "./components/Container";
import Heading from "./components/Heading";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex h-screen items-center bg-white-prime">
      <Container>
        <div className="absolute right-0 circle rounded-full mr-32 md:mr-64 -mt-24 animate-pulse delay-200"></div>
        <div className="absolute right-0 circle rounded-full mr-32 md:mr-64 -mt-24"></div>
        <div className="flex flex-col p-8 -mt-12 bg-white/70 rounded-2xl gap-24 shadow-2xl shadow-darker/20 border-[1px] border-white z-10 backdrop-blur-[140px]">
          <div className="flex flex-col gap-6">
            <Image
              alt="Logo"
              className="cursor-pointer aspect-auto"
              height={150}
              width={150}
              src="/images/p3dw-kawaluyaan-black.png"
            />
            <Heading
              title="Aplikasi Laporan harian"
              subtitle="laporkan kegiatan harian anda sekarang."
            />
          </div>
          <div className="flex">
            <Link
              href={"/dashboard"}
              className="px-4 py-2 bg-gradient-to-br from-primary to-accent hover:opacity-70 duration-300 text-white font-bold rounded-md"
            >
              Mulai Sekarang!
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
