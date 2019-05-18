// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateTodo = `subscription OnCreateTodo {
  onCreateTodo {
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
export const onUpdateTodo = `subscription OnUpdateTodo {
  onUpdateTodo {
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
export const onDeleteTodo = `subscription OnDeleteTodo {
  onDeleteTodo {
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
