const _ = require('lodash');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = 5000;

const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }
  rollOnce() {
    return _.random(1, this.numSides);
  }
  roll({ numRolls }) {
    return _.times(numRolls, () => this.rollOnce());
  }
}

const root = {
  getDie({ numSides = 6 }) {
    return new RandomDie(numSides);
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
