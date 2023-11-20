import { ToDo } from "../entities/todo";

export const findAllToDo = (): Promise<ToDo[]> => {
  return ToDo.find({});
};
