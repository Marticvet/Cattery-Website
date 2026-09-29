import type { SVGProps } from 'react';
export function Icon({
  name = 'arrow',
  ...props
}: SVGProps<SVGSVGElement> & {
  name?:
    'arrow' | 'close' | 'menu' | 'chevron' | 'mail' | 'phone' | 'message' | 'external' | 'plus';
}) {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 8h16M4 16h16" />,
    chevron: <path d="m8 5 7 7-7 7" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    phone: <path d="m7 3 3 5-3 2c1.5 3.5 3.5 5.5 7 7l2-3 5 3c-1 6-6 4-10 1S1 8 7 3Z" />,
    message: (
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4.5-1L3 21l1.5-5A9 9 0 0 1 3 11.5 9 9 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
    ),
    external: (
      <>
        <path d="M14 3h7v7M21 3 10 14M10 3H3v18h18v-7" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
