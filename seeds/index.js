const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seeddb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '67640c09cfce6a5681dedeaf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, expedita porro quas sequi reprehenderit animi. Aliquam saepe officia itaque, labore debitis dolores ut esse omnis!',
            price,
            geometry: {type: 'Point',
            coordinates: [ cities[random1000].longitude,cities[random1000].latitude]},
            images :  [
                {
                  url: 'https://res.cloudinary.com/dupzidxzl/image/upload/v1734866984/Yelcamp/mahfrcljyflvbsgtevcf.jpg',
                  filename: 'Yelcamp/mahfrcljyflvbsgtevcf',
                
                },
                {
                  url: 'https://res.cloudinary.com/dupzidxzl/image/upload/v1734866986/Yelcamp/ojy5vol8f7rjnvtwwgfz.jpg',
                  filename: 'Yelcamp/ojy5vol8f7rjnvtwwgfz',
                
                },
                {
                  url: 'https://res.cloudinary.com/dupzidxzl/image/upload/v1734866985/Yelcamp/b8apnjhqjmhaatwemgi3.jpg',
                  filename: 'Yelcamp/b8apnjhqjmhaatwemgi3',
               
                }
              ],
        });
        await camp.save();
    }
};

seeddb().then(() => {
    mongoose.connection.close();
});
