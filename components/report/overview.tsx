"use client";

import OverviewPoint from "./overview-point";
import { Report } from "@prisma/client";

interface OverviewProps {
  range: string;
  reports: Report[];
  keyword: string;
}

const Overview: React.FC<OverviewProps> = ({ range, reports, keyword }) => {
  let total = 0;
  let eSamsat = 0;
  let canceled = 0;

  if (reports !== undefined) {
    total = reports.reduce((total, report) => {
      return total + (report.ended - report.started + 1);
    }, 0);

    eSamsat = reports.reduce((total, report) => {
      return total + report.eSamsat;
    }, 0);

    canceled = reports.reduce((total, report) => {
      return total + report.canceled;
    }, 0);
  }

  const rangeTitle = () => {
    if (range === "day") return "hari ini";
    if (range === "week") return "minggu ini";
    if (range === "month") return "bulan ini";
    if (range === "year") return "tahun ini";
    return "keseluruhan";
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <OverviewPoint
        name="total"
        rangeTitle={rangeTitle()}
        value={total}
        keyword={keyword}
      />
      <OverviewPoint
        name="esamsat"
        rangeTitle={rangeTitle()}
        value={eSamsat}
        keyword={keyword}
      />
      <OverviewPoint
        name="canceled"
        rangeTitle={rangeTitle()}
        value={canceled}
        keyword={keyword}
      />
    </div>
  );
};

export default Overview;
