import React from "react";
import "../assets/styles/hotel/paginacion.css";

const Paginacion = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="paginacion-container">
      <button
        className="paginacion-btn"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`paginacion-btn${page === currentPage ? " active" : ""}`}
            onClick={() => handlePageClick(page)}
            disabled={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}
      <button
        className="paginacion-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginacion;
