import React from "react";
import { UserListResult } from "../../types";
import { ListCard } from "./ListCard";

type UserListGrid = {
  userListResults: UserListResult[];
};

export const UserListGrid: React.FC<UserListGrid> = ({ userListResults }) => {
  return (
    <>
      {userListResults.map((userListResult: any, index: number) => (
        <ListCard index={index} isContent={false} mode={""} id={userListResult.id} title={""} url={""} updated={""} username={userListResult.name} />
      ))}
    </>
  );
};
