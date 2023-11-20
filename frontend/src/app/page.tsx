"use client";
import styles from "./page.module.css";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useState } from "react";

const GET_ALL_TODO = gql`
  query Query {
    getAllToDo {
      name
      isDone
      id
    }
  }
`;

export type toDoType = {
  id: number;
  name: string;
  isDone: boolean;
};

export default function Home() {
  const [toDo, setToDo] = useState<toDoType[]>([]);

  const { loading, error } = useQuery(GET_ALL_TODO, {
    onCompleted: (data: any) => {
      setToDo(
        data.getAllToDo.map((todo: toDoType) => {
          return { ...todo, isEdit: false };
        })
      );
    },
  });

  const handleChange = (e: any, id: string) => {
    const { value } = e.target;

    const newToDo: toDoType[] = toDo.map((currentToDo: toDoType, index) => {
      if (index === parseInt(id, 10) - 1) {
        return { ...currentToDo, name: value };
      }
      return currentToDo;
    });

    setToDo(newToDo);
  };

  const handleClick = (id: string) => {
    const newToDo: toDoType[] = toDo.map((currentToDo: toDoType, index) => {
      if (index === parseInt(id, 10) - 1) {
        return { ...currentToDo, isDone: !currentToDo.isDone };
      }
      return currentToDo;
    });

    setToDo(newToDo);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!!</p>;

  return (
    <>
      <div className={styles.description}>
        <form className={styles.grid}>
          {toDo?.map((todo: any) =>
            todo.isEdit ? (
              <input
                type="text"
                key={todo.id}
                value={todo.name}
                className={
                  todo.isDone ? `${styles.checked} ${styles.card}` : styles.card
                }
                onChange={(e) => handleChange(e, todo.id)}
              />
            ) : (
              <label
                key={todo.id}
                className={
                  todo.isDone ? `${styles.checked} ${styles.card}` : styles.card
                }
              >
                {todo.name}
                <input type="checkbox" onClick={() => handleClick(todo.id)} />
              </label>
            )
          )}
        </form>
      </div>
    </>
  );
}
