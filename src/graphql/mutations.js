// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createGratitude = `mutation CreateGratitude($input: CreateGratitudeInput!) {
  createGratitude(input: $input) {
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
export const updateGratitude = `mutation UpdateGratitude($input: UpdateGratitudeInput!) {
  updateGratitude(input: $input) {
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
export const deleteGratitude = `mutation DeleteGratitude($input: DeleteGratitudeInput!) {
  deleteGratitude(input: $input) {
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
