"use client";

interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} w-fit`}>
      <h1 className="md:text-2xl text-xl font-bold bg-gradient-to-tr from-darker to-primary bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="font-light text-darker mt-1 md:text-sm text-xs">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
