import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalResults, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalResults / 10);

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onPageChange(i)}
          className="w-10 h-10 p-0"
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </Button>

      <div className="pagination-pages">
        {renderPageNumbers()}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </Button>
      
      <p className="pagination-info text-slate-500 dark:text-slate-400">
        Página {currentPage} de {totalPages} ({totalResults} resultados)
      </p>
    </div>
  );
};
