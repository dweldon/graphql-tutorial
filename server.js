const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const PORT = 5000;

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(PORT);

console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
