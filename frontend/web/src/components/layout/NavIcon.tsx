export default function NavIcon({ icon, color }: { icon: string; color: string }) {
  const iconPaths = {
    home: (
      <>
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12H15V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    camera: (
      <>
        <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    library: (
      <>
        <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    heart: (
      <path d="M20.84 4.61C19.85 3.62 18.5 3.06 17.09 3.06C15.68 3.06 14.33 3.62 13.34 4.61L12 5.95L10.66 4.61C8.6 2.55 5.19 2.55 3.13 4.61C1.07 6.67 1.07 10.08 3.13 12.14L12 21L20.84 12.14C22.9 10.08 22.9 6.67 20.84 4.61Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    paw: (
      <>
        <circle cx="7" cy="10" r="2" stroke={color} strokeWidth="2" />
        <circle cx="12" cy="7" r="2" stroke={color} strokeWidth="2" />
        <circle cx="17" cy="10" r="2" stroke={color} strokeWidth="2" />
        <path d="M12 22c-2.5 0-5-1.5-5-4 0-2 1.5-3.5 3-3.5.7 0 1.2.4 2 .4s1.3-.4 2-.4c1.5 0 3 1.5 3 3.5 0 2.5-2.5 4-5 4z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    family: (
      <>
        <circle cx="8" cy="7" r="3" stroke={color} strokeWidth="2" />
        <circle cx="17" cy="8" r="2.5" stroke={color} strokeWidth="2" />
        <path d="M2 21v-1c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5v1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.5 21v-1c0-2-1-4-3.5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 21v-1c0-2.5-1.8-4.5-4.5-4.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    sparkles: (
      <>
        <path d="M12 3L13.5 9L19.5 10.5L13.5 12L12 18L10.5 12L4.5 10.5L10.5 9L12 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    gift: (
      <>
        <rect x="3" y="8" width="18" height="13" rx="1" stroke={color} strokeWidth="2" />
        <path d="M12 8V21" stroke={color} strokeWidth="2" />
        <path d="M2 8H22V12H2V8Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 8C12 8 9 8 8 6.5C7.2 5.3 8 3.5 9.5 3.5C11.5 3.5 12 8 12 8Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 8C12 8 15 8 16 6.5C16.8 5.3 16 3.5 14.5 3.5C12.5 3.5 12 8 12 8Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </>
    ),
    moustache: (
      <path d="M3 12c1.5-2 3-2 4 0 1-1.5 2.5-1.5 3.5.5.8-2.2 2.7-2.2 3.5.5 1-2.7 2.9-2.7 3.7-.5 1-2 2.5-2 4 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    baby: (
      <>
        <circle cx="12" cy="9" r="5" stroke={color} strokeWidth="2" />
        <path d="M9 9c0-1.5 1-2.5 3-2.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 20c0-3 1.8-5 4-5s4 2 4 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    infinity: (
      <path d="M6.5 9C4.6 9 3 10.6 3 12.5S4.6 16 6.5 16c2.5 0 3.9-2 5.5-4 1.6-2 3-4 5.5-4C19.4 8 21 9.6 21 11.5S19.4 15 17.5 15c-2.5 0-3.9-2-5.5-4-1.6-2-3-4-5.5-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    star: (
      <path d="M12 2L14.9 8.3L22 9.3L17 14.1L18.2 21.1L12 17.8L5.8 21.1L7 14.1L2 9.3L9.1 8.3L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    ribbon: (
      <>
        <circle cx="12" cy="8" r="5" stroke={color} strokeWidth="2" />
        <path d="M8.5 12.5L7 21L12 18L17 21L15.5 12.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    sliders: (
      <>
        <line x1="4" y1="21" x2="4" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="10" x2="4" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="21" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="21" x2="20" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="12" x2="20" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="14" x2="7" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="8" x2="15" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="16" x2="23" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      </>
    ),
    list: (
      <>
        <line x1="8" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="6" x2="3.01" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="12" x2="3.01" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="18" x2="3.01" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {iconPaths[icon as keyof typeof iconPaths]}
    </svg>
  );
}
