export interface ThemeProps {
  name: string;

  background: string;

  primary: string;
  secondary: string;
  danger: string;

  text: string;
  contrastText: string;
  mutedText: string;

  rgb?: {
    background?: string;

    primary?: string;
    secondary?: string;
    danger?: string;

    text?: string;
    contrastText?: string;
    mutedText?: string;
  };
}

const theme: ThemeProps = {
  name: "dark",

  background: "#1c1c1c",

  primary: "#ffbd59",
  secondary: "#69657c",
  danger: "#c42936",

  text: "#ffffff",
  contrastText: "#333333",
  mutedText: "#6c757d",

  rgb: {
    primary: "255,189,89",
    secondary: "105,101,124",
  },
};

export default theme;
