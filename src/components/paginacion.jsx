import React, { useState } from "react";

const Paginacion = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{
          padding: "8px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          style={{
            padding: "8px",
            backgroundColor: page === currentPage ? "#007BFF" : "transparent",
            color: page === currentPage ? "#FFF" : "#000",
            border: "1px solid #CCC",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginacion;
