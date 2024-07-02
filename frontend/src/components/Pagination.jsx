const Pagination = ({ onPageChange, currentPage, totalPages }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="w-full flex justify-between mt-5">
      <button
        className={`px-5 py-1.5 text-sm text-white bg-color-6 rounded ${
          isFirstPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        Previous
      </button>
      <div className="text-base font-normal">
        Page {currentPage} of {totalPages}
      </div>
      <button
        className={`px-5 py-1.5 text-sm text-white bg-color-6 rounded ${
          isLastPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
