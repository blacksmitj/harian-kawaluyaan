export const rangeTitle = (range : string) => {
  const rangeTitle = () => {
    if (range === "day") return "harian";
    if (range === "week") return "mingguan";
    if (range === "month") return "bulanan";
    if (range === "year") return "tahunan";
    return "keseluruhan";
  };
}