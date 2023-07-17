"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-8 lg:px-4 md:px-4 px-4">
      {children}
    </div>
  );
};

export default Container;
