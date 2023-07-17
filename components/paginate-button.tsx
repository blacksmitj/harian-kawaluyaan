"use client";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

interface PaginateButtonProps {
  pages: number;
  changePage: (selectedItem: { selected: number }) => void;
  page: number;
}

const PaginateButton: React.FC<PaginateButtonProps> = ({
  pages,
  changePage,
  page,
}) => {
  return (
    <>
      <div className="flex-1">
        <nav
          key={page}
          className="flex items-center justify-end py-2 gap-4 sm:flex-row md:items-center md:space-y-0 text-xs"
          aria-label="Table Navigation"
        >
          <ReactPaginate
            initialPage={page}
            previousLabel={
              <p className="flex items-center gap-x-2">
                <BsChevronLeft size={14} />
                Prev
              </p>
            }
            nextLabel={
              <p className="flex items-center gap-x-2">
                Next
                <BsChevronRight size={14} />
              </p>
            }
            pageCount={Math.min(3, pages)}
            onPageChange={changePage}
            containerClassName="inline-flex items-stretch space-x-2"
            pageLinkClassName={
              "flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 hover:bg-emerald-600 hover:text-white duration-300 rounded-lg border-[1px]"
            }
            previousLinkClassName={
              "flex items-center justify-center h-full py-1.5 px-3 ml-0 text-neutral-500  rounded-lg hover:bg-emerald-600 hover:text-white border-[1px]"
            }
            nextLinkClassName={
              "flex items-center justify-center h-full py-1.5 px-3 text-neutral-500 rounded-lg hover:bg-emerald-600 hover:text-white border-[1px]"
            }
            activeLinkClassName={"text-white bg-emerald-800"}
            disabledLinkClassName={
              "text-neutral-200 bg-neutral-100 cursor-default"
            }
          />
        </nav>
      </div>
    </>
  );
};

export default PaginateButton;
