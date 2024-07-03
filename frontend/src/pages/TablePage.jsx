import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Spinner from "../components/Spinner";

const TablePage = () => {
  const [openedTable, setOpenedTable] = useState({});
  const { tables, isLoading } = useSelector((state) => state.table);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    name: "",
    dataType: "",
    nullable: "",
  });

  useEffect(() => {
    const table = tables?.find((item) => String(item._id) === String(id));
    setOpenedTable(table);
  }, [id, tables]);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  const applyFilters = useCallback(
    (columns) => {
      return columns?.filter((column) => {
        const matchesName = column.name
          .toLowerCase()
          .includes(filters.name.toLowerCase());
        const matchesDataType = column.datatype
          .toLowerCase()
          .includes(filters.dataType.toLowerCase());
        const matchesNullable =
          filters.nullable === ""
            ? true
            : column.nullable === (filters.nullable === "true");

        return matchesName && matchesDataType && matchesNullable;
      });
    },
    [filters]
  );

  const filteredColumns = useMemo(
    () => applyFilters(openedTable?.columns || []),
    [applyFilters, openedTable?.columns]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentColumns = useMemo(
    () => filteredColumns.slice(indexOfFirstItem, indexOfLastItem),
    [filteredColumns, indexOfFirstItem, indexOfLastItem]
  );

  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="relative w-full py-6 px-5 md:py-10">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="w-full">
            <h1 className="text-2xl text-color-4 font-montserrat font-semibold mb-5">
              {openedTable?.name}
            </h1>
            <Filters
              filters={filters}
              setFilters={setFilters}
              setCurrentPage={setCurrentPage}
            />
            <div className="border border-color-3 mt-5 rounded-xl overflow-hidden">
              <table className="min-w-full w-full">
                <thead>
                  <tr className="border-b border-color-3 bg-color-5">
                    <th className="py-4 px-4 text-left text-sm font-montserrat font-semibold text-color-4">
                      Name
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-montserrat font-semibold text-color-4">
                      Data Type
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-montserrat font-semibold text-color-4">
                      Nullable
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentColumns.map((column, index) => (
                    <tr key={index} className="border-t border-color-3">
                      <td className="py-3.5 px-4 text-sm text-color-2">
                        {column.name}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-color-2">
                        {column.datatype}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-color-2">
                        {column.nullable ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {filteredColumns.length > itemsPerPage && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TablePage;
