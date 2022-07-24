const router = require('express').Router();
const user = require("../app/controller/user.controller")


router.get("/", user.home)

router.get("/add", user.addUser);
router.post("/addLogic", user.AddLogicUser);

router.get("/AddTrans/:id" , user.AddTransaction)

router.post("/AddTrans/:id" , user.AddTransactionLogic)

module.exports = router; 