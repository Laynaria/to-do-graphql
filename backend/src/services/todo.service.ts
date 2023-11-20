import { ToDo } from "../entities/todo";

export const findAllToDo = (): Promise<ToDo[]> => {
  return ToDo.find({});
};

export const create = (body: any): Promise<ToDo> => {
  const toDo = new ToDo();
  toDo.name = body.name;
  toDo.isDone = body.isDone;

  return toDo.save();
};
