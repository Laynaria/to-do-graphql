import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
