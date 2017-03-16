const _ = require('lodash');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = 5000;

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String!
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int!]!
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
  rollDice({ numDice, numSides = 6 }) {
    return _.times(numDice, () => _.random(1, numSides));
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
