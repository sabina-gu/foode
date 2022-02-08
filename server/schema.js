const { buildSchema } = require("graphql");

const schema = buildSchema(`

      type User {
        token: String
        user: String}
        
        type Data {
        email: String
        password: String
        }
      `);

module.exports = schema;
