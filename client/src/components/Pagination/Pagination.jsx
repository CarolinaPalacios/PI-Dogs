import style from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <div className={style.pagination}>
      <button
        className={style.paginationButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className={style.pageNumber}>{currentPage}</span>
      <button
        className={style.paginationButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
