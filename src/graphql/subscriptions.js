// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    email
    gratitudes {
      items {
        id
        description
        createdOn
      }
      nextToken
    }
    streaks
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    email
    gratitudes {
      items {
        id
        description
        createdOn
      }
      nextToken
    }
    streaks
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    email
    gratitudes {
      items {
        id
        description
        createdOn
      }
      nextToken
    }
    streaks
  }
}
`;
export const onCreateGratitude = `subscription OnCreateGratitude {
  onCreateGratitude {
    id
    description
    createdOn
    owner {
      id
      email
      gratitudes {
        nextToken
      }
      streaks
    }
  }
}
`;
export const onUpdateGratitude = `subscription OnUpdateGratitude {
  onUpdateGratitude {
    id
    description
    createdOn
    owner {
      id
      email
      gratitudes {
        nextToken
      }
      streaks
    }
  }
}
`;
export const onDeleteGratitude = `subscription OnDeleteGratitude {
  onDeleteGratitude {
    id
    description
    createdOn
    owner {
      id
      email
      gratitudes {
        nextToken
      }
      streaks
    }
  }
}
`;
