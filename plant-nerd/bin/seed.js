const mongoose = require('mongoose');
const Plant = require('../models/plant.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const connectDB = require('../db/db');

const users = [
  {
    username: 'Sharky354',
    password: '$2a$10$81GOlxKGkNVD3gKMLJ51AelzCyhOBPndTF6b.LOdaE/H6X35DfXCW', // Franz
    profilePic:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630155565/plant-nerd/gerald-schombs-GBDkr3k96DE-unsplash_l5n4ak.jpg',
    description: "Hi, I'm scared of sharks but I love plants!",
    favPlant: 'Cow Plant',
    birthday: new Date('1990/01/01'),
    firstName: 'Julia',
  },
  {
    username: 'Sunny7612',
    password: '$2a$10$81GOlxKGkNVD3gKMLJ51AelzCyhOBPndTF6b.LOdaE/H6X35DfXCW', // Franz
    profilePic:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630155626/plant-nerd/aaron-burden-2IzoIHBgYAo-unsplash_jva1ny.jpg',
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
  {
    title: 'Without words',
    textField: 'This is stunning!',
  },
  {
    title: 'I want to visit it',
    textField: 'Do I get there easily?',
  },
  {
    title: 'Truly magical',
    textField: 'This is great!',
  },
  {
    title: 'No comments needed!',
    textField: 'This definitely has to go onto my bucket list.',
  },
  {
    title: 'Great Place found',
    textField: 'to stay for longer',
  },
  {
    title: 'In Love',
    textField: 'with this!',
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
  {
    name: 'Sakura',
    description: 'The japanese cherry blossom.',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630766202/plant-nerd/masaaki-komori-NoXUQ54pDac-unsplash_tufixn.jpg',
    location: 'Near by Tokio, Japan',
    foundOnDate: new Date('1994/03/27'),
    season: 'Spring',
  },
  {
    name: 'Baobab',
    description: 'The spirit of Africa in a tree.',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630766205/plant-nerd/niko-photos-tGTVxeOr_Rs-unsplash_unvclx.jpg',
    location: 'Masai Mara, Kenia, Africa',
    foundOnDate: new Date('1994/12/07'),
    season: 'Summer',
  },
  {
    name: 'Dry Flowers',
    description:
      'I found this in my living room. Someone must have forgotten it.',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630766205/plant-nerd/chuttersnap-XOPjB-ojFgY-unsplash_cqt8su.jpg',
    location: 'My living room',
    foundOnDate: new Date('1994/09/14'),
    season: 'Fall',
  },
  {
    name: 'Some english flowers',
    description: 'Found in Englands amazing gardens.',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630766197/plant-nerd/mio-ito-B_SLtmXPKNA-unsplash_r1y3rc.jpg',
    location: 'Buckingham Palace, London, England',
    foundOnDate: new Date('1994/08/27'),
    season: 'Summer',
  },
  {
    name: 'Treehouse Tree',
    description: 'Perfect place to build my treehouse here.',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630766207/plant-nerd/johann-siemens-EPy0gBJzzZU-unsplash_hn3vga.jpg',
    location: 'Somewhere in Germany',
    foundOnDate: new Date('1994/09/07'),
    season: 'Fall',
  },
  {
    name: 'Magical Irish Oak',
    description: 'Bewitched tree from Ireland.',
    plantImg:
      'https://res.cloudinary.com/dq66nu4hm/image/upload/v1630766211/plant-nerd/veeterzy-sMQiL_2v4vs-unsplash_wuwfdi.jpg',
    location: 'Dark Hedges, Northern Ireland',
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
      for (let i = 0; i < 7; i++) {
        comments[i].theAuthor = user2;
      }
      for (let i = 4; i < 14; i++) {
        comments[i].theAuthor = user1;
      }

      plants[0].author = user1;
      plants[1].author = user1;
      plants[2].author = user1;
      plants[3].author = user1;
      plants[4].author = user1;

      plants[5].author = user2;
      plants[6].author = user2;
      plants[7].author = user2;
      plants[8].author = user2;
      plants[9].author = user2;

      users[0].friends = [user2];
      users[1].friends = [user1];

      Comment.create(comments).then((comments) => {
        console.log(`Created ${comments.length} Comments.`);
        Comment.find().then((comments) => {
          plants[0].comments = [comments[0], comments[1]];
          plants[1].comments = [comments[2], comments[3]];
          plants[2].comments = [comments[4], comments[5]];
          plants[3].comments = [comments[6], comments[7]];
          plants[4].comments = [comments[8]];
          plants[5].comments = [comments[9]];
          plants[6].comments = [comments[10]];
          plants[7].comments = [comments[11]];
          plants[8].comments = [comments[12]];
          plants[9].comments = [comments[13]];

          Plant.create(plants).then((plants) => {
            console.log(`Created ${plants.length} Plants.`);
            mongoose.connection.close();
          });
        });
      });
    });
  });

// run $node bin/seed.js to get the seed into the database!
