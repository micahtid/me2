import React from "react";

function ClockIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="152"
      height="158"
      fill="none"
      viewBox="0 0 152 158"
      {...props}
    >
      <circle
        cx="55.5"
        cy="90.88"
        r="41.5"
        fill="url(#paint0_radial_20_21)"
        transform="rotate(-65 55.5 90.88)"
      ></circle>
      <path
        fill="#FFC163"
        d="M73.039 53.268a41.502 41.502 0 00-55.15 20.073L55.5 90.88l17.539-37.612z"
      ></path>
      <rect
        width="40"
        height="7"
        x="50.849"
        y="92.573"
        fill="#000"
        rx="3.5"
        transform="rotate(-65 50.849 92.573)"
      ></rect>
      <rect
        width="7"
        height="28"
        x="31.816"
        y="83.698"
        fill="#000"
        rx="3.5"
        transform="rotate(-65 31.816 83.698)"
      ></rect>
      <g fill="#FFF09E" filter="url(#filter0_d_20_21)">
        <path
          d="M0 0H8.537V18.506H0z"
          transform="matrix(.84803 .52995 -.55754 .83015 103.318 37.38)"
        ></path>
        <path
          d="M0 0H10.063V25.686H0z"
          transform="matrix(.4728 .88117 -.8947 .44667 127.491 52.038)"
        ></path>
        <path
          d="M0 0H8.326V13.793H0z"
          transform="matrix(-.13826 .9904 -.99167 -.1288 122.581 80.479)"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_20_21"
          width="47.249"
          height="59.345"
          x="89"
          y="37.38"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0.739667 0 0 0 0 0.53256 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_20_21"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_20_21"
            result="shape"
          ></feBlend>
        </filter>
        <radialGradient
          id="paint0_radial_20_21"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(132.891 12.514 54.967) scale(51.8097 57.6291)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="0.717" stopColor="#fff" stopOpacity="0.5"></stop>
          <stop offset="1" stopColor="#999" stopOpacity="0.25"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}

export default ClockIcon;