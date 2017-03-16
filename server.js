const { graphql, buildSchema } = require('graphql');

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

async function run() {
  const res = await graphql(schema, '{ hello }', root);
  console.log(res);
}

run();
