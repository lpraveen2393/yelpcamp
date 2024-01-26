const express=require('express');
const app=express();
const path= require('path');
const mongoose=require('mongoose');
const Campground = require('./models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
//db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>
{
    console.log("database connected");

});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended :true}));

app.get('/',(req,res)=>
{
    res.render("campground/index1");
})

app.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campground/index1', { campgrounds });
        //res.send(campgrounds)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campground/new1');
});

app.post('/campgrounds',async(req,res) =>{
    const newcampground=new Campground(req.body.Campground);
    await newcampground.save();
    res.redirect(`/campgrounds/${newcampground._id}`)
})


app.get('/campgrounds/:id',async(req,res)=>{
   const campground=await Campground.findById(req.params.id)
    res.render('campground/show',{campground})
})
app.listen(3000,()=>{
  console.log('serving on port 3000');
});