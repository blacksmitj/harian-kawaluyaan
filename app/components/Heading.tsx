"use client";

interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} mt-2`}>
      <div className="md:text-2xl text-xl font-bold app-title">{title}</div>
      <div className="font-light text-neutral-500 mt-1 md:text-sm text-xs">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
