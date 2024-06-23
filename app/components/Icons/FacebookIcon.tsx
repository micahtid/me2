import React from "react";

function FacebookIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      fill="none"
      viewBox="0 0 38 38"
      {...props}
    >
      <path
        fill="#000"
        d="M34.833 19c0-8.74-7.093-15.833-15.833-15.833S3.167 10.26 3.167 19c0 7.663 5.446 14.044 12.666 15.517V23.75h-3.166V19h3.166v-3.958A5.548 5.548 0 0121.375 9.5h3.958v4.75h-3.166c-.871 0-1.584.713-1.584 1.583V19h4.75v4.75h-4.75v11.004c7.996-.791 14.25-7.536 14.25-15.754z"
      ></path>
    </svg>
  );
}

export default FacebookIcon;