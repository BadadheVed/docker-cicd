import { dbClient } from "db/client";
import express from "express"



const app = express();
app.use(express.json())

app.get('/users' , async (req , res) =>{
    dbClient.user.findMany()
    .then(users =>{
        res.json(users)
    }).catch(err =>{
        res.status(500).json({error:err.message})
    })
})

app.post('/add' , async (req , res) =>{
    const {username , password } = req.body;
    try {
        const user = await dbClient.user.create({
        data:{
            username:username,
            password:password
        }
    })

    res.json({
        message:`the added user id is ${ user.id}`,
        user:user
    })
    return
    } catch (error) {
        res.status(500).json({
            message:"The error is ",
             error:error
        })
    }
})

app.listen(8080 , ()=>{
    console.log('Listening on the port 8080')
})  