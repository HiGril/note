const {Router} = require('express');
const router =Router();
const path = require("path")

const login = require("./login")  //登录
const region  =require("./region")  //注册





router.get("/",(req,res)=>{

  res.sendFile(path.resolve(__dirname,"../views/index.html"))
  console.log(path.resolve(__dirname))
})


router.use(login)
router.use(region)


module.exports = router;
