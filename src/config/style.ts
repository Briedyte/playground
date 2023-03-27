export const ColorPalette = {
    backgroundSolidDarker: "#f6e9c6",
    backgroundSolidLighter: "#fff8e5",
    lightText: "#fff8e6",
    primary: "#048181",
    primaryLighter: "#28a0a0",
    primaryDarker: "#045a5a",
    secondary: "#e67500",
    secondaryLighter: "#e99a48",
    secondaryDarker: "#b15d06",
    tertiary: "#ffc422",
    balloonGameBackground: "#e8faff",
    black: "#282828",
  } as const;
  
  export const zIndex = {
    negative: -1,
    positive: 1,
    clouds: 1,
    aboveClouds: 2
  } as const;
  
  export const baseFontSize = "16px";
  
  export const FontSize = {
    12: "0.75rem",
    13: "0.8125rem",
    14: "0.875rem",
    15: "0.9375rem",
    16: "1rem",
    18: "1.125rem",
    20: "1.25rem",
    24: "1.5rem",
    28: "1.75rem",
    30: "1.875rem",
    34: "2.125rem",
    40: "2.5rem",
    46: "2.875rem",
    48: "3rem",
    72: "4.5rem",
    80: "5rem",
  } as const;
  
  export const Spacing = {
    0: "0px",
    2: "2px",
    4: "4px",
    6: "6px",
    8: "8px",
    11: "11px",
    12: "12px",
    14: "14px",
    16: "16px",
    18: "18px",
    20: "20px",
    24: "24px",
    28: "28px",
    32: "32px",
    40: "40px",
    48: "48px",
    50: "50px",
    56: "56px",
    60: "60px",
    64: "64px",
    68: "68px",
    76: "76px",
    80: "80px",
    100: "100px",
    105: "105px",
    120: "120px",
    160: "160px",
    192: "192px",
    200: "200px",
  };
  
  export const FontWeight = {
    regular: 400,
    medium: 500,
    bold: 700,
  } as const;
  
  export const BorderRadius = {
    4: "4px",
    5: "5px",
    8: "8px",
    10: "10px",
    12: "12px",
    24: "24px",
    30: "30px",
    40: "40px",
    50: "50px",
    circle: "50%",
  } as const;
  
  export const FontFamily = {
    nunito: "'Nunito', sans-serif",
    teko: "'Teko', sans-serif",
  } as const;
  
  export const Breakpoint = {
    xs: 480,
    s: 768,
    m: 992,
    l: 1280,
  };
  
  export const MediaQuery = {
    xs: `@media(max-width: ${Breakpoint.xs}px)`,
    s: `@media(max-width: ${Breakpoint.s}px)`,
    m: `@media(max-width: ${Breakpoint.m - 1}px)`,
    l: `@media(max-width: ${Breakpoint.l - 1}px)`,
    xl: `@media(min-width: ${Breakpoint.l}px)`,
  };
  
  export const headerHeight = "140px";
  export const sidenavWidth = "300px";
  
  export const formBaseStyle = `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${Spacing[11]};
    align-items: center;
  `;

  export const balloonBaseStyle = `
    cursor: pointer;
    height: 150px;
  `;