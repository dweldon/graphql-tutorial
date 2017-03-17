const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const schema = require('./data/schema');
const resolvers = require('./data/resolvers');

const PORT = 5000;

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
  graphiql: true,
}));
app.listen(PORT);

console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
