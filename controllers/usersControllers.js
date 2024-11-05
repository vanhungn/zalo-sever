
const modelUsers= require('../models/usersModel')
const bcrypt = require('bcrypt')
const asignToken=require('../help/authorToken')
const parsePhone=require('../help/parsePhone')
const RegisterUser=async(req,res)=>{
    try {
        const {name,phone,password}=req.body;
      
        if(!name||!phone || !password){
            return res.status(300).json({
                message:'Phone number or password not filled in'
            })
        }
       
       
        
         const localNumber =await parsePhone(phone)
         if(!localNumber){
            return res.status(300).json({
                message:'The phone number transferred is not in the correct format'
            })
        }
         const checkPhone= await modelUsers.findOne({phone:localNumber})
         if(checkPhone!==null){
            return res.status(301).json({
                message:'Phone number already exists'
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
                message:'Please enter your phone number and password'
            })
        }
        const localNumber =await parsePhone(phone)
        if(!localNumber){
            return res.status(300).json({
                message:'The phone number transferred is not in the correct format'
            })
        }
        const hashPassword= await modelUsers.findOne({phone:localNumber})
        const comparePassword= await bcrypt.compare(password,hashPassword.password)
        const token = await asignToken({name:hashPassword.name,phone:hashPassword.phone,_id:hashPassword._id},"5h")
        if(hashPassword===null)
        {
            return res.status(300).json({
                message:'Phone number does not exist'
            })
        }
        if(!comparePassword){
            return res.status(300).json({
                message:'Incorrect password'
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