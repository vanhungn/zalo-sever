const Joi=require('joi')
const validateSchema=(data)=>{
   const schema = Joi.object({
        phone: Joi.string().pattern(new RegExp(/^\+84\d{9,10}$/)).required()
      });
      const {error,value}= schema.validate(data)
      if (error) {
       return false
      }else{
        return true
      }
}
   

module.exports={validateSchema}