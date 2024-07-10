import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { tables } = useSelector((state) => state.table);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`${
          isOpen ? "fixed" : "absolute"
        }  top-8 right-5 z-30 flex flex-col justify-between h-4 w-6 md:hidden`}
        onClick={toggleSidebar}
      >
        <span
          className={`block h-0.5 w-full bg-color-4 rounded-full transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-color-4 rounded-full transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-color-4 rounded-full transition-transform duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-1" : ""
          }`}
        />
      </button>
      <div
        className={`fixed pb-8 pr-8 overflow-y-scroll top-0 right-0 h-full z-20 max-w-80 w-full bg-white border-r border-gray-200 flex flex-col items-start transform transition-transform duration-300 md:pr-0 md:static md:max-w-64 lg:max-w-80 md:w-full md:min-h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex w-full px-5 pt-5 pb-5 md:pt-10">
          <Link
            className="w-full py-3 px-6 bg-color-6 text-center text-white text-base rounded-xl transition-all duration-300 hover:opacity-80"
            to="/"
            onClick={closeSidebar}
          >
            Go to the Create Table
          </Link>
        </div>
        {tables?.map((table) => (
          <Link
            className="px-6 py-2.5 w-full transition-all duration-300 text-base font-montserrat font-medium text-color-4 hover:bg-color-5"
            key={table._id}
            to={`/table/${table._id}`}
            onClick={closeSidebar}
          >
            {table.name}
          </Link>
        ))}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-color-4 opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
