import millify from "millify";
import NumberFormat from "react-number-format";

const currencyFormatter = (num = 0) => {
  if (num > 9007199254740991) {
    return num;
  }
  if (num || num === 0) {
    return `$${millify(num, {
      precision: 2,
      lowercase: false,
      units: ["", "K", "MM", "B"],
    })}`;
  }
};
const capitalize = (word = "") => {
  return word[0]?.toUpperCase() + word?.slice(1);
};

const arrayToOptions = (array) => {
  return array.map((item) => {
    return { label: item, value: item };
  });
};

const toTitleCase = (str) => {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt?.charAt(0)?.toUpperCase() + txt?.substr(1)?.toLowerCase();
  });
};

const numberFormatter = (num, prefix = "", suffix = "") => {
  return (
    <NumberFormat
      value={num}
      prefix={prefix}
      suffix={suffix}
      displayType={"text"}
      thousandSeparator={true}
    />
  );
};

export const slugify = (string) =>
  string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\_]+/g, "")
    .replace(/\_\_+/g, "_")
    .replace(/^_+/, "")
    .replace(/_+$/, "");

export default {
  arrayToOptions,
  currencyFormatter,
  toTitleCase,
  numberFormatter,
  capitalize,
  slugify,
};
