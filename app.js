//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://sohanpatharla:sohanpatharla@cluster0.vm3etby.mongodb.net/wikiDB");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
app.route("/articles")
.get((req,res)=>{
    Article.find({}).then((foundArticles)=>{
        res.send(foundArticles);
    });
    
})
.post((req,res)=>{    
    const newArticles=new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticles.save().then(()=>{
        res.send("Successfully saved.")
    });
})
.delete((req,res)=>{
    Article.deleteMany().then(()=>{
        res.send("Deleted all");
    });
})

app.route("/articles/:articleTitle")
.get((req,res)=>{
    Article.findOne({title:req.params.articleTitle}).then((foundArticle)=>{
        res.send(foundArticle);
    }); 
})
.put((req,res)=>{
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content},
        {overwrite:true}
    ).then(()=>{
        res.send("SUCCESS")
    })
})
.patch((req,res)=>{
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {$set:req.body},
    ).then(()=>{
        res.send("SUCCESS IN PATCHING")
    })
})
.delete((req,res)=>{
    Article.deleteOne(
        {title:req.params.articleTitle}
    ).then(()=>{
        res.send("Deleted");
    })
})

const articleSchema={
    title:String,
    content:String
}

const Article=mongoose.model("Article",articleSchema);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});