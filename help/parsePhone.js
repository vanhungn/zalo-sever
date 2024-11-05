const {parsePhoneNumber}=require('libphonenumber-js')

const ParsePhone=(phone)=>{
      // Phân tích số điện thoại từ định dạng quốc tế
      const phoneNumber = parsePhoneNumber(phone.trim(), 'VN');

      // Kiểm tra nếu số điện thoại hợp lệ
      if (phoneNumber.isValid()) {
          // Định dạng số điện thoại theo định dạng quốc gia
          const formattedNumber = phoneNumber.formatNational().split(' ').join('');
          return formattedNumber;
      }else{
            return false
      }
      

}
module.exports=ParsePhone;