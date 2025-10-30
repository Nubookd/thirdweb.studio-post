import React from "react";

export default function HeaderMenu() {
  return (
    <div className="flex items-center gap-[12]">
      <span>Menu</span>
      <svg
        width="21"
        height="13"
        viewBox="0 0 21 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_27_6208)">
          <path d="M0.500001 0L0.5 13" stroke="white" />
          <path d="M10.5 0V13" stroke="white" />
          <path d="M20.5 0V13" stroke="white" />
        </g>
        <defs>
          <clipPath id="clip0_27_6208">
            <rect width="21" height="13" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
