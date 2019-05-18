// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    todos {
      items {
        id
        description
        status
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      todos {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    description
    status
    owner {
      id
      email
      todos {
        nextToken
      }
    }
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      status
      owner {
        id
        email
      }
    }
    nextToken
  }
}
`;
