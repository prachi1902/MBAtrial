export const Tooltip = {
  baseStyle: {
    placement: "bottom-end",
    bg: "#FCF3E8",
    color: "black",
    padding: "15px",
    border: "1px solid #C7A67F",
    borderRadius: "8px",
    opacity: "0.5",
    backdropFilter: "blur(100px)",
  },

  variants: {
    transparent: {
      background:
        "linear-gradient(rgba( 198, 148, 134, 0.85 ), rgba(228, 194, 154, 0.85))",
      lineHeight: "1.5rem",
      fontSize: "0.84rem",
      color: "#3B3A39",
      textAlign: "center",
      backdropFilter: "blur(4px)",
    },
  },
};
