const mongoose = require('mongoose');
const Plant = require('../models/plant.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const connectDB = require('../db/db');

const users = [
  {
    username: 'Sharky354',
    password: '$2a$10$81GOlxKGkNVD3gKMLJ51AelzCyhOBPndTF6b.LOdaE/H6X35DfXCW', // Franz
    description: "Hi, I'm scared of sharks but I love plants!",
    favPlant: 'Cow Plant',
    birthday: new Date('1990/01/01'),
    firstName: 'Julia',
  },
  {
    username: 'Sunny7612',
    password: '$2a$10$81GOlxKGkNVD3gKMLJ51AelzCyhOBPndTF6b.LOdaE/H6X35DfXCW', // Franz
    description: 'Plants are my best friends!',
    favPlant: 'Sunflower',
    birthday: new Date('1990/01/01'),
    firstName: 'Franzi',
  },
];

const comments = [
  {
    title: 'The best plant ever',
    textField: 'You definitely have to visit this plant!',
  },
  {
    title: 'Plants 4 ever',
    textField: 'Greatest plant ever.',
  },
  {
    title: 'Quick Question',
    textField: 'Can you eat this plant?',
  },
  {
    title: 'Have you seen...',
    textField: 'this plant already in winter?',
  },
  {
    title: 'Do you know this plant even?',
    textField: "I don't want to spam you, but is this a real plant?",
  },
  {
    title: 'Hellooo?!??',
    textField: "Why can't my comment be deleted...",
  },
  {
    title: 'Happy Place',
    textField:
      "Going to this plant was making me feel like I'm at my happy place.",
  },
  {
    title: 'Happy Bannanannaaas',
    textField: 'Happy Bananaaaa',
  },
];

const plants = [
  {
    name: 'Cow Plant',
    description: 'Is your one and only source for oatmilk!',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1629969257/plant-nerd/caleb-george-5sF6NrB1MEg-unsplash_tczhqr.jpg',
    location: 'Kreuzberg, Berlin, Germany',
    foundOnDate: new Date('1990/07/25'),
    season: 'Summer',
  },
  {
    name: 'Hot Wine Stem',
    description: 'Is your one and only source for Hot Wine!',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1629969257/plant-nerd/jose-alfonso-sierra-XIYTOBTHeaQ-unsplash_dehujl.jpg',
    location: 'Friedrichshain, Berlin, Germany',
    foundOnDate: new Date('1991/12/05'),
    season: 'Winter',
  },
  {
    name: 'Aloe Vera',
    description:
      'Not only nice to your skin but also to your missing ability to keep plants alive.',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1629969256/plant-nerd/severin-candrian-dgvFsLfIX9E-unsplash_ht5utn.jpg',
    location: 'Schöneberg, Berlin, Germany',
    foundOnDate: new Date('1998/03/10'),
    season: 'Spring',
  },
  {
    name: 'Sunflower',
    description: 'Find your true flower power with this plant!',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1629969257/plant-nerd/matthias-oberholzer-gM5msl7rP2k-unsplash_rhnfgw.jpg',
    location: 'Tempelhof, Berlin, Germany',
    foundOnDate: new Date('1994/10/07'),
    season: 'Fall',
  },
];

connectDB()
  .then(() => {
    return User.deleteMany();
  })
  .then(() => {
    return Plant.deleteMany();
  })
  .then(() => {
    return Comment.deleteMany();
  })
  .then(() => {
    return User.create(users);
  })
  .then((users) => {
    console.log(`Created ${users.length} Users.`);
    User.find().then((users) => {
      let user1 = users[0]._id;
      let user2 = users[1]._id;
      for (let i = 0; i < 5; i++) {
        comments[i].author = user1;
      }
      for (let i = 4; i < 8; i++) {
        comments[i].author = user2;
      }
      plants[0].author = user1;
      plants[1].author = user1;
      plants[2].author = user2;
      plants[3].author = user2;

      Comment.create(comments).then((comments) => {
        console.log(`Created ${comments.length} Comments.`);
        Comment.find().then((comments) => {
          let comments1 = [comments[0], comments[1]];
          let comments2 = [comments[2], comments[3]];
          let comments3 = [comments[4], comments[5]];
          let comments4 = [comments[6], comments[7]];
          plants[0].comments = comments1;
          plants[1].comments = comments2;
          plants[2].comments = comments3;
          plants[3].comments = comments4;
          Plant.create(plants).then((plants) => {
            console.log(`Created ${plants.length} Plants.`);
            mongoose.connection.close();
          });
        });
      });
    });
  });

// run $node bin/seed.js to get the seed into the database!
