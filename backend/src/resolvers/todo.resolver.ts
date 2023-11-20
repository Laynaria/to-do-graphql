import { Arg, Query, Resolver } from "type-graphql";
import { ToDo } from "../entities/todo";
import * as ToDoService from "../services/todo.service";

@Resolver(ToDo)
export class ToDoResolver {
  @Query(() => [ToDo])
  async getAllToDo(): Promise<ToDo[]> {
    return ToDoService.findAllToDo();
  }
}
