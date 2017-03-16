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

  input MessageInput {
    author: String
    content: String
  }

  type Message {
    id: ID!
    author: String
    content: String
  }

  type Query {
    ip: String,
    getDie(numSides: Int): RandomDie
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class Message {
  constructor(id, { author, content }) {
    _.assign(this, { id, author, content });
  }
}

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

const DB = {};

const findOrThrow = (id) => {
  if (!DB[id]) throw new Error(`message not found for id: ${id}`);
};

const root = {
  ip(args, req) {
    return req.ip;
  },
  getDie({ numSides = 6 }) {
    return new RandomDie(numSides);
  },
  getMessage({ id }) {
    findOrThrow(id);
    return new Message(id, DB[id]);
  },
  createMessage({ input }) {
    const id = _.uniqueId();
    DB[id] = input;
    return new Message(id, input);
  },
  updateMessage({ id, input }) {
    findOrThrow(id);
    DB[id] = input;
    return new Message(id, input);
  },
};

const app = express();

const logIpAddress = (req, res, next) => {
  console.log(`ip: ${req.ip}`);
  next();
};

app.use(logIpAddress);
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT);

console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
