export function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const firstPage = 1;
  const lastPage = totalPages.length;
  const perPage = 3;

  const currentElements = totalPages.slice(currentPage - 1, (currentPage + perPage) - 1);
  
  if (currentElements[currentElements.length - 1] === lastPage) currentElements.pop();

  function handleNextPage() {
    if (currentPage === lastPage) return;
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    if (currentPage === firstPage) return
    setCurrentPage(currentPage - 1);
  }

  console.log(lastPage - 1);

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      <button className="px-3 py-1 font-bold bg-blue-700 rounded hover:opacity-75 transition-all" onClick={handlePrevPage}>
        &laquo;
      </button>
      {currentPage !== firstPage && (
        <>
          <button className="px-3 py-1 border rounded text-white hover:opacity-75" onClick={() => setCurrentPage(1)}>
            {firstPage}
          </button>
          <span>...</span>
        </>
      )}
      {currentElements.map(p => (
        <button key={p} className="px-3 py-1 border rounded text-white hover:opacity-75" onClick={() => setCurrentPage(p)}>
          {p}
        </button>
      ))}
      {currentPage < lastPage - 1 - perPage && <span>...</span>}
      <button className="px-3 py-1 border rounded text-white hover:opacity-75" 
        onClick={() => setCurrentPage(lastPage)}>
          {lastPage}
      </button>
      <button className="px-3 py-1 font-bold bg-blue-700 rounded hover:opacity-75 transition-all" onClick={handleNextPage}>
        &raquo;
      </button>
    </div>
  );
}