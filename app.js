const e = require('express');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const data = fs.readFileSync('./datastore/data.json');
let projects = JSON.parse(data);
app.use(express.json());
app.use('/',express.static(__dirname + '/public'))
// app.get('/page',(req,res)=>{
//     try{
//         res.sendFile(path.join(__dirname,'/abc.html'));
//         // res.end();
//         }
//         catch(e){
//           const message = { message: 'error in reading file !' };
//           res.status(400).json(message);
//         }
// })
// app.get(/\/.*\.js/,(req,res)=>{
//     console.log(req.url);
//     res.status(200).send({msg:'received'})
// })

app.get('/api',(req,res)=>{
    console.log(req.query);
    if(req.query.id)
    {
        if(projects[req.query.id])
        {
            res.status(200).json({...projects[req.query.id],id:id})
        }
        else{
            res.status(400).json({message:'No content with the given id'});
        }
    }
    else{
        res.status(200).json(projects)
    }
})

app.put('/api',async(req,res)=>{
    let id= req.query.id;
    console.log(req.body);
    if(id){
        if(projects[id]){
            if(req.body.content)
            {
                projects[id] = {content:req.body.content};
                let sproject = JSON.stringify(projects);
                try{
                    await fs.promises.writeFile('./datastore/data.json',sproject)
                    res.json(projects);
                }
                catch(err){
                    res.status(500).json({message:'Could not persist data'})
                }
            }
            else{
               res.status(400).json({message:'No valid content'}) 
            }
        }
        else{
            res.status(400).json({message:'No content with this id'})
        }
    }
    else{
        res.status(400).json({message:'No valid id'})
    }
})

app.post('/api',async(req,res)=>{
    let {id,content} = req.body;
    if(id && content)
    {
        if(projects[id])
        {
            res.status(400).json({message:'id not unique'})
        }
        else{
            projects = {...projects, [id]:{content:content}};
            let sproject = JSON.stringify(projects);
            try{
                await fs.promises.writeFile('./datastore/data.json',sproject);
                res.status(200).json(projects);
            }
            catch(err)
            {
                res.status(400).json({message:'Could not persist data'});
            }
        }
    }
    else{
        res.status(400).json({message:'No id or content'});
    }

})
app.delete('/api',async(req,res)=>{
    if(req.query.id)
    {
        if(projects[req.query.id])
        {
            delete projects[req.query.id];
            let sproject = JSON.stringify(projects);
            try{
                await fs.promises.writeFile('./datastore/data.json',sproject)
                res.status(200).json({message:'Deleted'});
            }
            catch(err){
                res.status(400).json({message:'Could not persist data'});
            }
        }
        else{
            res.status(400).json({message:'No content with this id'});
        }
    }
    else{
        res.status(400).json({message:'No valid id'});
    }
})


app.listen(port,()=>{
    console.log('server is running');
})
