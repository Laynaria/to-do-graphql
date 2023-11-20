"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect, useState } from "react";

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
      setToDo(data.getAllToDo);
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
        console.log(currentToDo);
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
          {toDo?.map((todo: any) => (
            <input
              key={todo.id}
              value={todo.name}
              className={
                todo.isDone ? `${styles.checked} ${styles.card}` : styles.card
              }
              onChange={(e) => handleChange(e, todo.id)}
              onClick={() => handleClick(todo.id)}
            />
          ))}
        </form>
      </div>
    </>
  );
}
