import express from 'express'
import mongoose from 'mongoose';
import { shortUrl, getOriginalUrl } from "./Controllers/url.js";
import path from 'path';

const app = express();

app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://vedantdarokar7:ZrIvpUyaSJpKNKZu@cluster0.cav07ut.mongodb.net/", {
  dbName: 'NodeJs'
})
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));


  // rendering the ejs file
  app.get('/',(req,res)=>{
    res.render("index.ejs", {shortUrl :null})
  })

  //serve static files
  app.use(express.static(path.join(path.resolve(), 'public')));

  // shorting url logic
  app.post('/short',shortUrl)

  // redirect to original url using short code :- dynamic routing
  app.get("/:shortCode", getOriginalUrl);

const port = 3000;
app.listen(port,()=>console.log(`Server is running on http://localhost:${port}`))
