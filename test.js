let express = require('express'); 
let cookieParser = require('cookie-parser'); 
//setup express app 
let app = express()
let cors = require('cors');
let config = require('./models/Config')
  
app.use(cookieParser(config.cookiesKey)); 

app.use(cors({credentials: true, origin: true}))
  
  
//basic route for homepage 
app.get('/', (req, res)=>{ 
res.send('welcome to express app'); 
}); 
  
//JSON object to be added to cookie 
let users = { 
name : "Ritik", 
Age : "18"
} 
  
//Route for adding cookie 
app.get('/setuser', (req, res)=>{ 
res.cookie("userData", users, {signed: true}); 
res.send({message: 'user data added to cookie'}); 
}); 
  
//Iterate users data from cookie 
app.get('/getuser', (req, res)=>{ 
//shows all the cookies 
res.send(req.cookies);
});

app.get('/deluser', (req, res)=>{
    res.clearCookie("userData")
    res.send({message: 'cookie deleted'})
})
  
//server listens to port 3000 
app.listen(3001, (err)=>{ 
if(err) 
throw err; 
console.log('listening on port 3001'); 
}); 