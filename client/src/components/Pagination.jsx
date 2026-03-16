import React, { useEffect } from "react";

const Pagination = ({
  page,
  setPage,
  limit,
  setLimit,
  total,
  limitOpen,
  setLimitOpen,
  limitRef
}) => {

  const totalPages = Math.ceil(total / limit);

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (limitRef.current && !limitRef.current.contains(event.target)) {
        setLimitOpen(false);
      }

    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, [limitRef, setLimitOpen]);

  return (

    <div className="flex items-center justify-between flex-wrap gap-3 mt-6 text-xs sm:text-sm text-base-content/70">

      {/* LEFT */}

      <div className="flex items-center flex-wrap gap-2 sm:gap-4">

        <span className="whitespace-nowrap">
          {start}–{end} of {total}
        </span>

        <div className="flex items-center gap-2">

          <span className="hidden sm:block whitespace-nowrap">
            Results per page
          </span>

          <div ref={limitRef} className="relative">

            <button
              onClick={() => setLimitOpen(!limitOpen)}
              className="border border-secondary rounded-md px-2 sm:px-3 py-1 text-base-content text-xs sm:text-sm"
            >
              {limit}
            </button>

            {limitOpen && (

              <div className="absolute left-0 mt-2 w-16 rounded-lg shadow-lg z-50
              bg-white text-black
              dark:bg-zinc-900 dark:text-white
              max-h-32 overflow-y-auto">

                {[5, 10, 15, 20].map((l) => (
                  <div
                    key={l}
                    onClick={() => {
                      setLimit(l);
                      setPage(1);
                      setLimitOpen(false);
                    }}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-center"
                  >
                    {l}
                  </div>
                ))}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* RIGHT */}

      <div className="flex items-center gap-1 sm:gap-2">

        <button
          disabled={page === 1}
          onClick={() => setPage(1)}
          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-secondary
          ${page === 1
              ? "text-secondary cursor-not-allowed"
              : "bg-transparent text-secondary"}`}
        >
          ⟪
        </button>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-secondary
          ${page === 1
              ? "text-secondary cursor-not-allowed"
              : "bg-transparent text-secondary"}`}
        >
          ‹
        </button>

        <span className="px-1 sm:px-2 whitespace-nowrap">
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-secondary
          ${page >= totalPages
              ? "text-secondary cursor-not-allowed"
              : "bg-transparent text-secondary"}`}
        >
          ›
        </button>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(totalPages)}
          className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-secondary
          ${page >= totalPages
              ? "text-secondary cursor-not-allowed"
              : "bg-transparent text-secondary"}`}
        >
          ⟫
        </button>

      </div>

    </div>

  );
};

export default Pagination;