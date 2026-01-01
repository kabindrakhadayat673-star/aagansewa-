const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-3 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;