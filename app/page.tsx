import Container from "./components/Container";
import Heading from "./components/Heading";
import ReportCard from "./components/card/ReportCard";

export default function Home() {
  const items = {
    id: 12312,
    name: "andri Andreas Panjaitan",
    position: "Motion Graphic",
    report: {
      tanggal: "25 Mei 2023",
      total: 69,
      esamsat: 3,
      batal: 1,
    },
    location: "Samling 1 Supratman",
  };

  return (
    <Container>
      <div className="flex flex-col text-darker">
        <Heading title="Beranda" subtitle="Seluruh data hari ini!" />
        {/* List Laporan */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mt-6 pb-20">
          {/* Card */}
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
          <ReportCard />
        </div>
      </div>
    </Container>
  );
}
