const Filters = ({ filters, setFilters, setCurrentPage }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-start gap-4 flex-col items-start md:items-center md:flex-row">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleFilterChange}
        placeholder="Search by name"
        className="py-2.5 px-4 border bg-transparent border-color-3 max-w-full w-full rounded-xl focus:border-color-6 placeholder:text-color-2 placeholder:text-sm md:max-w-72"
      />
      <input
        type="text"
        name="dataType"
        value={filters.dataType}
        onChange={handleFilterChange}
        placeholder="Search by data type"
        className="py-2.5 px-4 border bg-transparent border-color-3 max-w-full w-full rounded-xl focus:border-color-6 placeholder:text-color-2 placeholder:text-sm md:max-w-72"
      />
      <select
        name="nullable"
        value={filters.nullable}
        onChange={handleFilterChange}
        className="appearance-none py-2.5 px-4 border bg-transparent border-color-3 max-w-full w-full rounded-xl text-color-2 text-sm outline-none cursor-pointer md:max-w-40"
      >
        <option value="">All</option>
        <option value="true">Nullable</option>
        <option value="false">Not Nullable</option>
      </select>
    </div>
  );
};

export default Filters;
