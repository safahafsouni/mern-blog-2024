import AsyncSelect from 'react-select/async';

const MultiSelectTagDropdown = ({
  defaultValue = [],
  loadOptions,
  onChange,
}) => {
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      loadOptions={loadOptions}
      className="relative z-20"
      onChange={onChange}
      additional={{
        page: 1, // Start pagination from page 1
      }}
    />
  );
};

export default MultiSelectTagDropdown;
