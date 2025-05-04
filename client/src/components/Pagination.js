// src/components/Pagination.js
import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2); // = 2
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // 调整起始位置
    if (currentPage <= halfVisible + 1) {
      endPage = Math.min(maxVisiblePages, totalPages);
    }
    
    if (currentPage >= totalPages - halfVisible) {
      startPage = Math.max(totalPages - (maxVisiblePages - 1), 1);
    }

    // 生成页码
    for (let i = startPage; i <= endPage; i++) pages.push(i);

    // 添加省略号
    if (startPage > 1) pages.unshift('...');
    if (endPage < totalPages) pages.push('...');

    return pages;
  };

  return (
    <div className="pagination-container">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        «
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ‹
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={page === currentPage ? 'active' : ''}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        ›
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        »
      </button>
    </div>
  );
};

export default Pagination;