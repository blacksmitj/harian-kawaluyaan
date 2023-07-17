import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

const Breadcumb = () => {
  return (
    <div className="hidden sm:block bg-white py-2" aria-label="Breadcrumb">
      <div className="flex flex-row justify-between items-center">
        <ol className="flex items-center whitespace-nowrap min-w-0">
          <li className="text-xs flex">
            <Link href={"/beranda"} className="text-accent">
              Beranda
            </Link>
            <BiChevronRight size={20} />
          </li>
          <li className="text-xs flex">
            <div>Laporan</div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Breadcumb;
