angular.module("productApp").factory("NumberService",  () => {
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

   // Kiểm tra giới hạn số nhập vào
   if (number >= 1000000000000) {
     return "số quá lớn";
   }

   const isNegative = number < 0;
   let word = "";
   let part;

   number = Math.abs(number);

   // Split the number into three-digit groups
   const parts = [];
   while (number > 0) {
     parts.push(number % 1000);
     number = Math.floor(number / 1000);
   }

   // Convert each three-digit group to words
   for (let i = 0; i < parts.length; i++) {
     part = parts[i];

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
         str += units[unitsPart] + " ";
       }
     } else if (rest != 0) {
       if (tensPart === 1) {
         str += tens[tensPart] + " ";
         if (unitsPart > 0) {
           str += units[unitsPart] + " ";
         }
       } else {
         str += units[unitsPart] + " ";
       }
     }

     if (str.trim() !== "") {
       word = str.trim() + " " + scales[i] + " " + word;
     }
   }

   return (isNegative ? "âm " : "") + word.trim() + " đồng";
 };


  return {
    numberToWords,
  };
});
