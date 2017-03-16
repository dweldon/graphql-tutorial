const _ = require('lodash');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = 5000;

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String!
    random: Float!
    rollThreeDice: [Int!]!
  }
`);

const root = {
  quoteOfTheDay() {
    return _.sample([
      'You will be married within a year',
      'Be cautious in your daily affairs.',
      'You will win success in whatever calling you adopt.',
    ]);
  },
  random() {
    return Math.random();
  },
  rollThreeDice() {
    return _.times(3, () => _.random(1, 6));
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
