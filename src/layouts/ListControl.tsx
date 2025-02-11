import React from "react";
import { Sort } from "../components/list/Sort";
import { NewCreateButton } from "../components/common/button/NewCreateButton";

type ListControlData = {
  screenName: string;
  sortOutput: string;
  registerMessage: string;
  href: string;
};

export const ListControl: React.FC<ListControlData> = ({ screenName, sortOutput, registerMessage, href }) => {
  return (
    <>
      <h1 className="ms-1 mb-3">{screenName}一覧</h1>
      {registerMessage ? <div>registerMessage</div> : ""}
      <div className="row">
        <Sort sortOutput={sortOutput} />
        <NewCreateButton href={href} />
      </div>
    </>
  );
};
