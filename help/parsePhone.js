const libphonenumber = require('google-libphonenumber');
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const PNF = libphonenumber.PhoneNumberFormat;
const ParsePhone=(phone)=>{
      // Phân tích số điện thoại từ định dạng quốc tế
      const number = phoneUtil.parse(phone, 'VN');
      // Định dạng số điện thoại theo chuẩn quốc gia
      const nationalNumber = phoneUtil.format(number, PNF.NATIONAL);
      // Loại bỏ khoảng trắng hoặc ký tự không cần thiết
      const localNumber = nationalNumber.replace(/\s+/g, '');
      return localNumber;
}
module.exports=ParsePhone;