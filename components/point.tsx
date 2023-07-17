import React from "react";

interface PointProps {
  ended?: number;
  started?: number;
  canceled?: number;
  eSamsat?: number;
  title: string;
  point: string;
  icon: React.ReactElement;
}

const Point: React.FC<PointProps> = ({
  ended,
  started,
  canceled,
  eSamsat,
  title,
  point,
  icon,
}) => {
  const valuePoint = () => {
    if (point === "total" && ended && started) {
      return ended - started + 1;
    }

    if (point === "canceled" && canceled) {
      return canceled;
    }

    if (point === "esamsat" && eSamsat) {
      return eSamsat;
    }
  };

  return (
    <div className="flex flex-col bg-white justify-between w-full rounded-md p-2 border-[1px] border-accent/20">
      <div className="text-xs flex gap-1 mb-2 justify-between items-center text-darker/60">
        <p>{title}</p>
        <div>{icon}</div>
      </div>
      <p className="font-medium leading-none">{valuePoint() || 0}</p>
    </div>
  );
};

export default Point;
