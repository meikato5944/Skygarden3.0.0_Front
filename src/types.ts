export type ListResult = {
  id: string;
  created: string;
  updated: string;
  created_by: string;
  updated_by: string;
  schedule_published: string;
  schedule_unpublished: string;
  title: string;
  content: string;
  head: string;
  url: string;
  type: string;
  elementcolor: string;
  template: string;
};

export type UserListResult = {
  id: string;
  name: string;
  password: string;
  admin: string;
  type: string;
};

export type ListData = {
  loginName: string;
  screenName: string;
  registerMessage: string;
  sortOutput: string;
  pagerOutput: string;
  results: ListResult[];
};
export const initialListData: ListData = {
  loginName: "",
  screenName: "",
  registerMessage: "",
  sortOutput: "",
  pagerOutput: "",
  results: [
    {
      id: "",
      created: "",
      updated: "",
      created_by: "",
      updated_by: "",
      schedule_published: "",
      schedule_unpublished: "",
      title: "",
      content: "",
      head: "",
      url: "",
      type: "",
      elementcolor: "",
      template: "",
    },
  ],
};

export type UserListData = {
  loginName: string;
  screenName: string;
  registerMessage: string;
  sortOutput: string;
  pagerOutput: string;
  results: UserListResult[];
};
export const initialUserListData: UserListData = {
  loginName: "",
  screenName: "",
  registerMessage: "",
  sortOutput: "",
  pagerOutput: "",
  results: [
    {
      id: "",
      name: "",
      password: "",
      admin: "",
      type: "",
    },
  ],
};

export type EleResultData = {
  id: string;
  title: string;
  code: string;
};
