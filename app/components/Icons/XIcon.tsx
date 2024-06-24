import React from "react";

function XIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      {...props}
    >
      <path
        fill="#000"
        d="M23.625 1.406h4.601l-10.05 11.516L30 28.595h-9.257l-7.25-9.507-8.297 9.507H.593l10.749-12.319L0 1.406h9.493l6.553 8.687 7.579-8.687zm-1.613 24.428h2.55L8.107 4.022H5.372l16.64 21.812z"
      ></path>
    </svg>
  );
}

export default XIcon;