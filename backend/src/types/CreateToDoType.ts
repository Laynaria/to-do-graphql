import { Field, InputType } from "type-graphql";

@InputType()
export class createToDoType {
  @Field()
  name: string;

  @Field()
  isDone: boolean;
}
