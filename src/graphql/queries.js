// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      gratitudes {
        nextToken
      }
      streaks
    }
    nextToken
  }
}
`;
export const getGratitude = `query GetGratitude($id: ID!) {
  getGratitude(id: $id) {
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
export const listGratitudes = `query ListGratitudes(
  $filter: ModelGratitudeFilterInput
  $limit: Int
  $nextToken: String
) {
  listGratitudes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      createdOn
      owner {
        id
        email
        streaks
      }
    }
    nextToken
  }
}
`;
