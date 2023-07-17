"use client";

interface NomoraturProps {
  title: string;
  value: number | undefined;
  icon: React.ReactElement;
}

const Nomoratur: React.FC<NomoraturProps> = ({ title, value, icon }) => {
  return (
    <>
      <div className="flex flex-col w-full border-[1px] border-accent/20 rounded-md p-2 gap-y-2">
        <div className="flex flex-row items-center gap-2 text-darker/60 text-xs">
          {icon}
          <p>{title}</p>
        </div>
        <p className="font-medium leading-none">{"0" + value}</p>
      </div>
    </>
  );
};

export default Nomoratur;
