/*
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.get("serverPort");
const corsMiddleware = require("./middleware/cors.middleware");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
*/

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const { buildSchema } = require("graphql");
const config = require("config");

const PORT = config.get("serverPort");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const corsMiddleware = require("./middleware/cors.middleware");
const isAuth = require("./middleware/is-auth");

const app = express();
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    
    schema{
    query: RootQuery
    mutation: RootMutation
    }
    
    
    
    type RootMutation {
    register (UserInput: UserInput): User

    }
    
              type User {
        _id: ID!
        email: String!
        password: String
     
        }
        
      input UserInput {
      email: String!
       password: String!
    }
    
    
    type RootQuery{
    login(email: String!, password: String!): AuthLogin
    }
    
       
      
        type AuthLogin {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        } 

        
  `),
    rootValue: {
      register: args => {
        return User.findOne({ email: args.UserInput.email })
          .then(user => {
            if (user) {
              throw new Error("User exists already");
            }
            return bcrypt.hash(args.UserInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.UserInput.email,
              password: hashedPassword
            });

            return user.save();
          })
          .then(result => ({ ...result._doc, password: null, _id: result.id }))
          .catch(err => {
            throw err;
          });
      },
      login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("User  doesn't exists");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect");
        }
        const token = jwt.sign(
          { UserId: user.id, email: user.email },
          config.get("secretKey"),
          {
            expiresIn: "1h"
          }
        );

        return { userId: user.id, token: token, tokenExpiration: 1 };
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(config.get("dbUrl"))
  .then(() => {
    app.listen(PORT);
    console.log(PORT);
  })
  .catch(err => {
    console.log(err);
  });
