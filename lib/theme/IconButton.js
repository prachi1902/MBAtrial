export const IconButton = {
  baseStyle: {
    boxShadow: "none",
    color: "buttonText",
    borderRadius: "50%",
  },
  sizes: {
    md: {
      width: "2.5rem",
      height: "2.5rem",
    },
    lg: {
      width: "2.375rem",
      height: "2.375rem",
    },
  },
  variants: {
    gray: {
      bg: "lightGray",
    },
    primary: {
      background: "linear-gradient(180deg, #FCD5A5 0%, #F9AA4A 100%)",
    },
    reset: {
      boxShadow: "none",
    },
  },
  defaultProps: {
    variant: "gray",
    size: "md",
  },
};
