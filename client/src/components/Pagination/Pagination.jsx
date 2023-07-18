import style from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      localStorage.setItem("currentPage", page.toString());
    }
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) handlePageChange(1);
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) handlePageChange(totalPages);
  };

  return (
    <div className={style.pagination}>
      <button
        className={style.paginationButton}
        onClick={handleFirstPage}
        disabled={currentPage === 1}
      >
        First Page
      </button>
      <button
        className={style.paginationButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className={style.pageNumber}>
        {currentPage} of {totalPages}
      </span>
      <button
        className={style.paginationButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className={style.paginationButton}
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
      >
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
