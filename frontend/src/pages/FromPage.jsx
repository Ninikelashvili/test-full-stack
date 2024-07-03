import { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createTable, getTables } from "../features/table/tableSlice";
import { MdClose, MdAdd } from "react-icons/md";
import Checkbox from "../components/Checkbox";

const FromPage = () => {
  const [tableName, setTableName] = useState("");
  const [isError, setIsError] = useState(false);
  const [columns, setColumns] = useState([
    { name: "", datatype: "", nullable: false },
  ]);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = useCallback((index, e) => {
    setColumns((prevColumns) => {
      const values = [...prevColumns];
      if (e.target.name === "name") {
        values[index].name = e.target.value;
      } else if (e.target.name === "datatype") {
        values[index].datatype = e.target.value;
      } else if (e.target.name === "nullable") {
        values[index].nullable = e.target.checked;
      }
      return values;
    });
    setMessage(false);
  }, []);

  const handleTableNameChange = useCallback((e) => {
    setTableName(e.target.value);
    setMessage("");
  }, []);

  const handleAddColumn = useCallback(() => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { name: "", datatype: "", nullable: false },
    ]);
  }, []);

  const handleRemoveColumn = useCallback((index) => {
    setColumns((prevColumns) => {
      if (prevColumns.length === 1) {
        setMessage("You cannot delete the last line.");
        setIsError(true);
        return prevColumns;
      }
      const values = [...prevColumns];
      values.splice(index, 1);
      return values;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const dataToSend = new FormData();
      dataToSend.append("name", tableName);
      dataToSend.append("columns", JSON.stringify(columns));

      try {
        const response = await dispatch(createTable(dataToSend));
        if (response && response.payload.success === true) {
          setTableName("");
          setColumns([{ name: "", datatype: "", nullable: false }]);
          setMessage(response.payload.message || "Table Created Successfully");
          dispatch(getTables());
          setIsError(false);
        } else {
          setMessage(response.payload.message || "Error creating table.");
          setIsError(true);
        }
      } catch (error) {
        console.error("Error creating table:", error);
        setIsError(true);
      }
    },
    [tableName, columns, dispatch]
  );

  const formContent = useMemo(
    () => (
      <>
        <label className="max-w-full w-full flex flex-col items-start gap-2 md:max-w-72">
          <span className="text-sm text-color-4 font-montserrat font-semibold">
            Table Name:
          </span>
          <input
            className="py-2.5 px-4 border bg-transparent border-color-3 w-full rounded-xl focus:border-color-6 placeholder:text-color-2 placeholder:text-sm"
            type="text"
            placeholder="Table Name"
            value={tableName}
            onChange={handleTableNameChange}
            required
          />
        </label>
        {columns.map((column, index) => (
          <div
            key={index}
            className="relative w-full flex justify-start gap-4 flex-col items-start md:items-center md:flex-row md:gap-10"
          >
            <label className="relative max-w-full w-full flex flex-col items-start gap-2 md:max-w-72">
              <span className="-top-7 text-sm text-color-4 font-montserrat font-semibold md:absolute">
                Name:
              </span>
              <input
                className="py-2.5 px-4 border bg-transparent border-color-3 w-full rounded-xl focus:border-color-6 placeholder:text-color-2 placeholder:text-sm"
                type="text"
                name="name"
                placeholder="Name"
                value={column.name}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </label>
            <label className="relative max-w-full w-full flex flex-col items-start gap-2 md:max-w-72">
              <span className="-top-7 text-sm text-color-4 font-montserrat font-semibold md:absolute">
                Data Type:
              </span>
              <input
                className="py-2.5 px-4 border bg-transparent border-color-3 w-full rounded-xl focus:border-color-6 placeholder:text-color-2 placeholder:text-sm"
                type="text"
                name="datatype"
                placeholder="Data Type"
                value={column.datatype}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </label>
            <label className="h-full relative flex items-start justify-center gap-4 md:gap-2 md:flex-col">
              <span className="-top-7 text-sm text-color-4 font-montserrat font-semibold md:absolute">
                Nullable:
              </span>
              <Checkbox
                name="nullable"
                checked={column.nullable}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>

            <button
              className="h-8 min-h-8 min-w-8 w-8 rounded-full bg-red-500 text-white flex justify-center items-center transition-all duration-300 hover:bg-red-400 absolute -bottom-2 right-0 md:ml-10 md:static"
              type="button"
              onClick={() => handleRemoveColumn(index)}
            >
              <MdClose />
            </button>
          </div>
        ))}
        <button
          className="h-10 w-10 bg-transparent text-color-6 rounded-full flex justify-center items-center text-2xl transition-all duration-300 hover:bg-color-6 hover:text-white md:h-12 md:w-12 md:text-3xl "
          type="button"
          onClick={handleAddColumn}
        >
          <MdAdd />
        </button>
        <button
          className="py-2.5 px-6 bg-color-6 text-white text-base font-montserrat font-medium rounded-xl transition-all duration-300 hover:opacity-80"
          type="submit"
        >
          Create Table
        </button>
        <p
          className={`${
            isError ? "text-red-600" : "text-green-600"
          } text-sm font-montserrat font-semibold `}
        >
          {message}
        </p>
      </>
    ),
    [
      tableName,
      columns,
      handleInputChange,
      handleRemoveColumn,
      handleTableNameChange,
      handleAddColumn,
      message,
      isError,
    ]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-start py-10 px-5 gap-4 md:gap-12"
    >
      {formContent}
    </form>
  );
};

export default FromPage;
