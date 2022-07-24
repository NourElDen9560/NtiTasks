const { demandOption } = require('yargs');
const yargs = require('yargs');
const dealWithJson = require ('../session3/node-s1/authorApp/modules/dealWithJson');

const searchUser = (id, data)=>{
    const authorId = data.findIndex(author=> author.id == id)
    return authorId
}

yargs.command({
    command: 'test',
    builder:{
        data: {type: 'string' ,demandOption:true}
    } ,
    handler: (args)=>{
//console.log(JSON.parse(args.data));
    }
})

yargs.command({
    command: 'hello',
    handler:()=>{
        console.log("Hello World!");
    }
})

yargs.command({
    command: 'add',
    description: 'Add a person to the session',
    builder:{
name :{type: 'string' ,demandOption:true} , 
status: {type: 'string' ,demandOption:true} ,
age: {type: 'number' ,demandOption:true} , 
    } ,
    handler:(args)=>{
        const User = {
            name:args.name,
            age:args.age ,
            status:args.status , 
            id:Date.now() ,
        }
        const AllUsers = dealWithJson.readDataFromJson("users.json")
        AllUsers.push(User);
        console.log(AllUsers)
        dealWithJson.writeDataToJson("users.json" , AllUsers)
    }
})

yargs.command({
command: 'show',
handler:()=>{
    const AllUsers = dealWithJson.readDataFromJson("users.json")
    console.log(AllUsers)
}
})

yargs.command({
    command: 'edit',
    description: 'Edit a person',
    builder:{
id:{type: 'number' ,demandOption:true} ,
status:{type:'string' , demandOption:true}
    } ,
    handler:(args)=>{
        
let AllUsers = dealWithJson.readDataFromJson("users.json")
const id = searchUser(args.id, AllUsers)
if(id==-1) return console.log("no users with this id")
if(args.status) AllUsers[id].status = args.status
dealWithJson.writeDataToJson("users.json", AllUsers)
    }
})



yargs.argv