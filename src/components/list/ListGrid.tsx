import React from "react";
import { ListResult } from "../../types";
import { ListCard } from "./ListCard";

type ListGrid = {
  ListResults: ListResult[];
  mode: string;
};

export const ListGrid: React.FC<ListGrid> = ({ ListResults, mode }) => {
  return (
    <>
      {ListResults.map((ListResult: any, index: number) => (
        <ListCard index={index} isContent={true} mode={mode} id={ListResult.id} title={ListResult.title} url={ListResult.url} updated={ListResult.updated} username={""} />
      ))}
    </>
  );
};
