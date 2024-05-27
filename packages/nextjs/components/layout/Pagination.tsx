import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 my-8">
      <button
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={10} />
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`px-3 py-1 rounded ${currentPage === number ? "bg-[#F6EA94] text-white" : "bg-gray-300"}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={10} />
      </button>
    </div>
  );
};

export default Pagination;
