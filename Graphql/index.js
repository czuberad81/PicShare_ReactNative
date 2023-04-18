// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');
// const sqlite3 = require('sqlite3').verbose();
// const uuid = require('uuid');
// const bcrypt = require('bcryptjs');

// const schema = buildSchema(`
//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     password: String!
//   }
  
//   type Query {
//     users: [User]
//   }
  
//   type Mutation {
//     signUp(name: String!, email: String!, password: String!): User
//     login(email: String!, password: String!): User!
//   }
// `);


// //cool

// const signUp = ({ name, email, password }) => {
//   // return new Promise((resolve, reject) => {
//   //   const db = new sqlite3.Database('mydatabase.db');
//   //   const hashedPassword = bcrypt.hashSync(password, 10);
//   //   const id = uuid.v4();
//   //   const values = [id, name, email, hashedPassword];
//   //   db.run('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', values, function (error) {
//   //     if (error) {
//   //       reject(error);
//   //     } else {
//   //       const user = { id, name, email, password: hashedPassword };
//   //       resolve(user);
//   //     }
//   //   });
//   //   db.close();
//   // });

//   return new Promise((resolve, reject) => {
//     const db = new sqlite3.Database('mydatabase.db');
//     db.get('SELECT * FROM users WHERE email = ?', [email], (error, row) => {
//       if (error) {
//         reject(error);
//       } else if (row) {
//         reject(new Error('Email already exists'));
//       } else {
//         const hashedPassword = bcrypt.hashSync(password, 10);
//         const id = uuid.v4();
//         const values = [id, name, email, hashedPassword];
//         db.run('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', values, function (error) {
//           if (error) {
//             reject(error);
//           } else {
//             const user = { id, name, email, password: hashedPassword };
//             resolve(user);
//           }
//         });
//       }
//       db.close();
//     });
//   });
// };

// const login = ({ email, password }) => {
//     return new Promise((resolve, reject) => {
//       const db = new sqlite3.Database('mydatabase.db');
//       db.get('SELECT * FROM users WHERE email = ?', [email], (error, row) => {
//         if (error) {
//           reject(error);
//         } else if (!row) {
//           reject(new Error('Invalid email or password'));
//         } else {
//           bcrypt.compare(password, row.password, (err, isPasswordCorrect) => {
//             if (err) {
//               reject(err);
//             } else if (isPasswordCorrect) {
//               resolve(row);
//             } else {
//               reject(new Error('Invalid email or password'));
//             }
//           });
//         }
//         db.close();
//       });
//     });
//   };

// const rootValue = {
//   login: ({email, password}) => login({email, password}),
//   signUp: ({ name, email, password }) => signUp({ name, email, password }),
// };


// const app = express();


// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: rootValue,
//   graphiql: true,
// }));


// const port = 4000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://czuberad:@cluster0.7jgcqpp.mongodb.net/test';
const DB_NAME = 'PicshareDatabase';

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  
  type Query {
    users: [User]
  }
  
  type Mutation {
    signUp(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User!
  }
`);

const signUp = async ({ name, email, password }) => {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection('Users');
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = uuid.v4();
    const newUser = { id, name, email, password: hashedPassword };
    const result = await collection.insertOne(newUser);
    return newUser;
  } finally {
    await client.close();
  }
};

const login = async ({ email, password }) => {
  console.log("Email: "+ email + " Password: "+password);
  const client = new MongoClient(MONGODB_URI);
  try {
    console.log("Made 1");
    await client.connect();
    console.log("Made 2");
    const db = client.db(DB_NAME);
    console.log("Made 3");
    const collection = db.collection('Users');
    console.log("Made 4");
    const user = await collection.findOne({ email });
    console.log("Made 5");
    if (!user) {
      throw new Error('Invalid email or password');
    }
    console.log("User Password: "+ user.password);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  } finally {
    await client.close();
  }
};

const rootValue = {
  login: ({email, password}) => login({email, password}),
  signUp: ({ name, email, password }) => signUp({ name, email, password }),
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}));

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});