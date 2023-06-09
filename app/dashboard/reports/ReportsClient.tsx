"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";

const ReportsClient = () => {
  return (
    <Container>
      <div className="flex flex-col text-darker pt-20">
        <Heading title="Report" subtitle="Seluruh data hari ini!" />
      </div>
    </Container>
  );
};

export default ReportsClient;
