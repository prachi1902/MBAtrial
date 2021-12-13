export const Button = {
  baseStyle: {
    borderRadius: "8px",
    boxShadow: "none !important",
    color: "buttonText",
    border: "none",
    height: "2.25rem",
    width: "auto",
  },
  size: {
    md: {
      height: "2.25rem",
      width: "auto",
    },
    lg: {
      height: "2.375rem",
      width: "auto",
    },
  },
  variants: {
    primary: {
      background: "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)",
      fontSize: "0.875rem",
      border: "solid 1px #F9AA4A",
      height: "2.25rem",
    },
    primaryIconButton: {
      background: "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)",
      border: "solid 1px #F9AA4A",
    },
    secondary: {
      background: "mediumGray",
      fontSize: "0.875rem",
      border: "none",
    },
    whiteTab: {
      bg: "white",
      fontSize: "0.875rem",
      fontWeight: "400",
      color: "primaryRed",
      boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
    },
    // modal: {
    //   height: "1.8rem",
    //   width: "1.8rem",
    //   bg: "#e8e8e8",
    //   mt: "-0.05rem",
    // },
    vehicle: {
      bg: "#fafafa",
      fontSize: "0.9rem",
      textAlign: "left",
      border: "1.5px solid #eeeeee",
      borderRadius: "none",
      fontWeight: "normal",
      justifyContent: "flex-start",
      minHeight: "3rem",
    },
    gray: {
      background: "#dddddd",
      fontSize: "0.9rem",
      border: "none",
      fontWeight: "500",
      maxHeight: "2.25rem",
    },
    iconbuttonGray: {
      background: "#dddddd",
      border: "none",
    },
    basic: {
      background: "none",
      boxShadow: "none",
      fontWeight: "500",
      height: "1.8rem",
    },
  },
  defaultProps: {
    size: "md",
    variant: "primary",
  },
};
