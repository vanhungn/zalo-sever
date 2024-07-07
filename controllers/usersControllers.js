
const modelUsers= require('../models/usersModel')
const validateSchema= require('../help/validate')
const bcrypt = require('bcrypt')
const asignToken=require('../help/authorToken')
const parsePhone=require('../help/parsePhone')
const RegisterUser=async(req,res)=>{
    try {
        const {name,phone,password}=req.body;
        const data={
            phone:phone
        }
        if(!name||!phone || !password){
            return res.status(300).json({
                message:'Số điện thoại hoặc mật khẩu chưa điền'
            })
        }
       
        if(validateSchema.validateSchema(data)===false){
            return res.status(300).json({
                message:'Số điện thoại không đúng định dạng'
            })
        }
        
         const localNumber =await parsePhone(phone)
         const checkPhone= await modelUsers.findOne({phone:localNumber})
         if(checkPhone!==null){
            return res.status(301).json({
                message:'Số điện thoại đã tồn tại'
            })
         }
         const salt = bcrypt.genSaltSync(10);
         const hashPassword = bcrypt.hashSync(password, salt);
         const newUser= new modelUsers({
            nameUser:name,
            avatar:"",
            bgrImg:"",
            gender:"",
            birthday:"",
            phone:localNumber,
            password:hashPassword,
            friend:[]
         })
         await newUser.save()
       return res.status(200).json({
        data:newUser,
        message:"successfully"
       })
    } catch (error) {
      return res.status(500).json({
            message:error
        })
    }
}
const LoginUser=async(req,res)=>{
    try {
        const{phone,password}=req.body
        if(!phone ||!password){
            return res.status(300).json({
                message:'Bạn vui lòng điền số điện thoại và mật khẩu'
            })
        }
        const localNumber =await parsePhone(phone)
        const hashPassword= await modelUsers.findOne({phone:localNumber})
        const comparePassword= await bcrypt.compare(password,hashPassword.password)
        const token = await asignToken({name:hashPassword.name,phone:hashPassword.phone,_id:hashPassword._id},"5h")
        if(hashPassword===null)
        {
            return res.status(300).json({
                message:'Số điện thoại chưa tồn tại'
            })
        }
        if(!comparePassword){
            return res.status(300).json({
                message:'Mật khẩu không đúng'
            })
        }
        return res.status(200).json({
            data:hashPassword,
            token:token
        })
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }
}

module.exports={RegisterUser,LoginUser}