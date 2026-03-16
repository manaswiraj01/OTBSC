const Pagination = ({
  page,
  setPage,
  limit,
  setLimit,
  total
}) => {

  const totalPages = Math.ceil(total / limit);

  // start & end range
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  // safe page display
  const displayPage = totalPages === 0 ? 0 : page;

  return (

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 lg:px-6 py-4 text-sm text-zinc-400">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <span>
          {start}–{end} of {total}
        </span>

        <div className="flex items-center gap-2">

          <span>Results per page</span>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="bg-zinc-800 text-white border border-white/10 rounded-md px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {/* FIRST */}
        <button
          disabled={page === 1 || totalPages === 0}
          onClick={() => setPage(1)}
          className={`w-6 p-1 rounded border border-white/10 
          ${page === 1 || totalPages === 0
              ? "text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
        >
          ⟪
        </button>

        {/* PREVIOUS */}
        <button
          disabled={page === 1 || totalPages === 0}
          onClick={() => setPage(page - 1)}
          className={`w-6 p-1 rounded border border-white/10 
          ${page === 1 || totalPages === 0
              ? "text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
        >
          ‹
        </button>

        {/* PAGE NUMBER */}
        <span className="px-2">
          {displayPage} / {totalPages}
        </span>

        {/* NEXT */}
        <button
          disabled={page >= totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className={`w-6 p-1 rounded border border-white/10 
          ${page >= totalPages || totalPages === 0
              ? "text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
        >
          ›
        </button>

        {/* LAST */}
        <button
          disabled={page >= totalPages || totalPages === 0}
          onClick={() => setPage(totalPages)}
          className={`w-6 p-1 rounded border border-white/10 
          ${page >= totalPages || totalPages === 0
              ? "text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
        >
          ⟫
        </button>

      </div>

    </div>

  );
};

export default Pagination;