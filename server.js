const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = 5000;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello() {
    return 'Hello world!';
  },
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT);

console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
