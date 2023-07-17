interface OverviewpointProps {
  name: string;
  rangeTitle: string;
  keyword?: string;
  value: number;
}

const OverviewPoint: React.FC<OverviewpointProps> = ({
  name,
  rangeTitle,
  value,
  keyword,
}) => {
  const title = () => {
    if (name === "total") return "Laporan ";
    if (name === "esamsat") return "E-Samsat ";
    if (name === "canceled") return "Batal ";
    if (value === 0) return "Laporan ";
    return "";
  };
  const subTitle = () => {
    if (name === "total") return "Laporan ";
    if (name === "esamsat") return "e-Samsat ";
    if (name === "canceled") return "Batal ";
    if (value === 0) return "Laporan ";
    return "";
  };
  return (
    <div className="bg-white p-4 border-[1px] rounded-md col-span-3 md:col-span-1">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">{title() + rangeTitle}</h1>
          <p className="text-xs font-light">
            {subTitle() + rangeTitle}
            {keyword ? " dengan kata kunci '" + keyword + "'" : ""}
          </p>
        </div>
        <p className="flex font-semibold text-2xl px-2 pl-2">+{value}</p>
      </div>
    </div>
  );
};

export default OverviewPoint;
