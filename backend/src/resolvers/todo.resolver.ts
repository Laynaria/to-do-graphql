import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ToDo } from "../entities/todo";
import * as ToDoService from "../services/todo.service";
import { createToDoType } from "../types/CreateToDoType";

@Resolver(ToDo)
export class ToDoResolver {
  // Get All Todo
  @Query(() => [ToDo])
  async getAllToDo(): Promise<ToDo[]> {
    return ToDoService.findAllToDo();
  }

  // Create ToDo
  @Mutation(() => ToDo)
  createToDo(@Arg("todo") todo: createToDoType): Promise<ToDo> {
    return ToDoService.create({ ...todo });
  }
}
