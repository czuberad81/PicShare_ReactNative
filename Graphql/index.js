const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

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


//cool

const signUp = ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('mydatabase.db');
    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = uuid.v4();
    const values = [id, name, email, hashedPassword];
    db.run('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', values, function (error) {
      if (error) {
        reject(error);
      } else {
        const user = { id, name, email, password: hashedPassword };
        resolve(user);
      }
    });
    db.close();
  });
};

const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database('mydatabase.db');
      db.get('SELECT * FROM users WHERE email = ?', [email], (error, row) => {
        if (error) {
          reject(error);
        } else if (!row) {
          reject(new Error('Invalid email or password'));
        } else {
          bcrypt.compare(password, row.password, (err, isPasswordCorrect) => {
            if (err) {
              reject(err);
            } else if (isPasswordCorrect) {
              resolve(row);
            } else {
              reject(new Error('Invalid email or password'));
            }
          });
        }
        db.close();
      });
    });
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
