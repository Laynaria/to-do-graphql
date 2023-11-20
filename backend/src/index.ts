import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { dataSource } from "./config/db";
import { ToDoResolver } from "./resolvers/todo.resolver";

const port: number = 5000;

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [ToDoResolver],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({ schema });

  try {
    const { url } = await server.listen({ port });
    console.log(`Server running on ${url}`);
  } catch (err) {
    console.error("Error while starting the server");
  }
};

void start();
