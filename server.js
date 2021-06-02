const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const methodOverride = require('method-override')
require("./models/connection");
const users = require('./models/users');
const Article = require('./models/articles');

// URL Encoded
app.use(express.urlencoded({ extended: false }));

const staticPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./views");
app.use(express.static(staticPath));
app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  res.render('index');
})
app.post('/', async (req, res) => {
    // console.log(req.body.email);
    const user=new users({
        email:req.body.email,
        password:req.body.password
    })
    try {
    
        const Registered = await user.save();
        res.redirect('/login');
      } catch (e) {
        console.log(e);
      }
   
  })
  app.get('/login',(req,res)=>{
      res.render('login');
  })
  app.post('/login', async (req, res) => {
    //console.log(req.body.email);
        const email = req.body.email;
        const password = req.body.password;
const isMatch=await users.findOne({email:email});
if(isMatch.password === password)
        {
          res.status(201).redirect('/main');
         
        } else {
          res.status(400).send("Invalid Login Details");
        }
      
   
  })
  app.get('/new',async(req,res)=>{
     res.render('new',{article:new Article()}); 
  })
  app.get('/main',async(req,res)=>{
    const articles= await Article.find().sort({ createdAt: 'desc' });
    res.render('main',{articles:articles}); 
 })
  app.post('/new', async (req, res) => {
    //console.log(req.body.email);
        const title = req.body.title;
        const description= req.body.description;
        const newarticle = new Article({
            title:title,
            description:description
        })
        try {
    
           await newarticle.save();

            res.redirect('/main');
          } catch (e) {
            console.log(e);
          }
   
  })

  app.delete('/articles/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/main');
  })
  app.get('/articles/edit/:id',async(req,res)=>{
    const article=await Article.findById(req.params.id)
    res.render('edit',{article:article}); 
 })
 app.put('/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
    article.title = req.body.title
    article.description = req.body.description
    try {
     await article.save();
     res.redirect('/main');
    } catch (e) {
      res.send(e)
}})
app.get('/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('show', { article: article })
})


app.listen(port, () =>
  console.log(`Server is listning on http://localhost:${port}`)
);