const numberToWords = (number) => {
  const units = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const tens = [
    "",
    "mười",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];
  const scales = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

  if (isNaN(number)) return "";
  if (number === 0) return "không";
  if (number < 0) return "sai định dạng";
  if (number >= 1000000000000) return "số quá lớn";

  let word = "";
  const parts = [];
  while (number > 0) {
    parts.push(number % 1000);
    number = Math.floor(number / 1000);
  }

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    if (part === 0) continue;

    let hundreds = Math.floor(part / 100);
    let rest = part % 100;
    let str = "";

    if (hundreds) {
      str += units[hundreds] + " trăm ";
    }

    let tensPart = Math.floor(rest / 10);
    let unitsPart = rest % 10;

    if (tensPart >= 2) {
      str += tens[tensPart] + " ";
      if (unitsPart > 0) {
        if (unitsPart === 1) {
          str += "mốt ";
        } else if (unitsPart === 5) {
          str += "lăm ";
        } else {
          str += units[unitsPart] + " ";
        }
      }
    } else if (rest != 0) {
      if (tensPart === 1) {
        str += "mười ";
        if (unitsPart > 0) {
          if (unitsPart === 5) {
            str += "lăm ";
          } else {
            str += units[unitsPart] + " ";
          }
        }
      } else if (unitsPart > 0) {
        str += units[unitsPart] + " ";
      }
    }

    if (str.trim() !== "") {
      word = str.trim() + " " + scales[i] + " " + word;
    }
  }

  return word.trim() + " đồng";
};

angular.module("productApp").factory("NumberService", () => {
  return {
    numberToWords,
  };
});
