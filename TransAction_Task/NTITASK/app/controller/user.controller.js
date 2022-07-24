const { boolean } = require('webidl-conversions')
const userModel = require('../../db/mymodel/model')

class User{
    static home = async(req, res)=>{
        try{        
            const allUsers = await userModel.find()
                res.render("home", {
                    pageTitle:"All Users",
                    allUsers,
                    isEmpty: !allUsers.length
            })
        }
        catch(e){
            res.send(e.message)
        }
    }

    static addUser = (req, res)=>{
        res.render("addUser")
    }
    static AddLogicUser =  async(req, res)=>{
        try{
            const userData = new userModel(req.body)
            await userData.save()
            res.redirect("/")
        }
        catch(err){
            console.log(err.message)
        }
    }
    static AddTransaction = async(req, res)=>{
        try{
      res.render("AddTransaction")}
      catch(err){
        res.send(err.message)
      }
    }
    static AddTransactionLogic = async(req, res)=>{
        try{
            const UserData =await userModel.findById(req.params.id)
            let statuscheck = false; 
            
             //res.send(req.body);
             if(req.body.Balance < UserData.accountIntialBalance){
                statuscheck = true;
                UserData.currentBalnce =  UserData.accountIntialBalance- Number(req.body.Balance)
             }
             else 
             UserData.currentBalnce =  UserData.accountIntialBalance

             const TranObj = {
                date:Date.now() , 
                typeOfTransaction:req.body.typeOfTransaction , 
                status :statuscheck
             }
            UserData.transaction.push(TranObj);
await UserData.save();
res.redirect("/")
        }
        catch(err){
            console.log(err.message)
        }
    }

}

module.exports = User