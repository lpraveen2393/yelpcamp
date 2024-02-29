const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const Campground = require('../models/campground');
const { places, descriptors } = require('./seedhelpers');
const path = require('path');
const cities = require('./cities');

const sample = array => array[Math.floor(Math.random() * array.length)];

const seeddb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'lorem quasi saepe quaerat, sed dolores laudantium deleniti soluta? Eaque eos illo, nostrum nemo corrupti modi repellat',
            price: price



        });
        await camp.save();
    }
}

seeddb();

// Rest of your code...
