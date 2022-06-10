const express = require("express")
const mongooose = require('mongoose')
const dbConnect = "mongodb://localhost:27017/todoapp";
const path = require('path')
const Task = require('./models/Tasks')
const publicPath = path.join(__dirname,'public');
console.log(publicPath);
//connecting to database
mongooose.connect(dbConnect)
.then(()=>console.log("connected to database sucessfully"))
.catch((err)=>console.log(err));

const app = express()
app.use(express.static(publicPath))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set('view engine','ejs');
const PORT = 8000

// to get all todo items
app.get('/',async (req,res)=>{
    try {
        const tasks = await Task.find().sort({ $natural: -1 });
        // console.log(tasks)
        res.status(200).render('index',{tasks});
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

// to post todo items
app.post('/',async (req,res)=>{
    try{
        console.log(req.body.todoitem);
        const todoitem = req.body.todoitem;
        const task = Task({'tasks':todoitem})
        await task.save()
        res.status(200).redirect('/');
    } catch(error){
        res.status(500).send(error);
        console.log(error)
    }
});

app.get('/task/:id',async (req,res)=>{
    console.log("edit page")
    
    const id = req.params.id;
    task = await Task.findById({'_id':id});
    console.log(task)
    console.log(id)
    res.render('edit',{'tasks':task});
});

app.post('/edit/',async (req,res)=>{
    try{
    const id = req.body.id
    const item = req.body.todoitem;
    const task = await Task.findByIdAndUpdate({'_id':id}, {tasks:item}, { new: true });
    res.redirect('/');
    
    }catch(err){
        res.status(500).send(error);
        console.log(err);
    }
});

app.get('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const task = await Task.findByIdAndDelete({'_id':id});
        res.redirect('/')
    }catch(err){
        res.status(500).send(erorr);
        console.log(err)
    }
});

app.listen(PORT,()=>{console.log("server started");});