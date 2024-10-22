import React, { useEffect, useState } from 'react';

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  const handleToggle = () => {
    if (activeNavName === name) {
      setActiveNavName(null); // Close if active
    } else {
      setActiveNavName(name); // Set as active
    }
    setIsChecked(!isChecked); // Toggle checked state
  };

  return (
    <div className="d-collapse d-collapse-arrow  bg-base-200 min-h-0 rounded-none py-2">
      {/* Hidden checkbox for functionality */}
      <input
        type="checkbox"
        className="hidden" // Hide the checkbox itself
        checked={name === activeNavName} // Sync with active nav
        onChange={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />
      <div
        className={`pl-0 py-0  d-collapse-title font-medium flex items-center gap-x-2 text-lg ${
          name === activeNavName
            ? 'font-bold text-primary' // Active state styles
            : 'font-semibold text-[#A5A5A5]' // Inactive state styles
        }`}
        onClick={handleToggle} // Handle click directly on title
      >
        {/* Icon and title should be inline */}
        {icon}
        {title}
      </div>
      {/* Render collapse content only when active */}
      {isChecked && (
        <div className="d-collapse-content">
          <div className="mt-2 flex flex-col gap-y-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
