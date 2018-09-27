const {Router} = require("express")

const user = require("../database/model/user") 
const router = Router()


//登录
router.post("/login",(req,res)=>{
    let {email,password} = req.body;
    user.findOne({email}).then((data)=>{
        if(!data){ //如果不存在
            res.json({
                code:401,
                msg:"该用户名不存在"
            })
        }
        else if(data.password !=password){
            res.json({
                code:401,
                msg:"密码不正确"
            })
        }
        else if(data.password == password){
            req.session.user = data;
            let userMsg = {
                username:data.username,
                email:data.email,
                password:data.password
            }
            res.json({
                code:200,
                data:userMsg,
                msg:"登录成功"

            })

        }   
    })
})


//退出

router.delete("/loginOut",(req,res)=>{
    req.session.destroy((err)=>{   //清除session
        if(err){
            console.log(err)
        }else{
            res.clearCookie("sid")
            res.json({
                code:200,
                msg:"退出成功"
            })
        }
    })
})



module.exports = router





