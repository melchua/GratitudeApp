export const getGratitudes = `query GetGratitudes($id: ID!) {
    getUser(id: $id) {
      gratitudes {
        items {
          id
          description
          createdOn
        }
        nextToken
      }
    }
  }
  `;

export const addGratitude = `mutation AddGratitude($input: CreateGratitudeInput!) {
    createGratitude(input: $input) {
      id
      description
      createdOn   
    }
  }
  `;
