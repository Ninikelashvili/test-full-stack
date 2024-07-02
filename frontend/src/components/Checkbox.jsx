import { MdOutlineDone } from "react-icons/md";

const Checkbox = ({ name, checked, onChange }) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex items-center rounded-xl cursor-pointer"
        htmlFor="checkbox"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-color-2 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-color-6 checked:bg-color-6 checked:before:bg-color-6"
          id="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <MdOutlineDone />
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
