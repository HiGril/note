const {Router} = require("express")

const user = require("../database/model/user")
const isEmail = require("validator/lib/isEmail")  //系统模块

const router = Router()
router.post("/user",(req,res)=>{ //注册逻辑

    let { username,email,password} = req.body

    // console.log(username,password,email)
    user.findOne({email}).then(data=>{
        if(data){
            res.json({
                code:200,
                msg:"该邮箱已注册"
            })
        }else{
            if (isEmail(email)) {
                user.create({ username,email,password}).then(data=>{
                    res.json({
                        code:200,
                        msg:"注册成功"
                    })
                })
                
            }else{
                res.json({
                    code:401,
                    msg:"邮箱格式不正确"
                })


            }

        }

    })






})