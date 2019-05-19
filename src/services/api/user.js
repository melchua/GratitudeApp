import * as queries from "../../../src/graphql/queries";
import * as customMutations from "../../../src/graphql/custom-mutations";

import * as mutations from "../../../src/graphql/mutations";
// import * as subscriptions from "../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";

const createUser = async (id, email) => {
  const userDetails = {
    id,
    email
  };

  try {
    const newUser = await API.graphql(
      graphqlOperation(mutations.createUser, { input: userDetails })
    );
    console.warn("newUser", newUser);
    return newUser;
  } catch (error) {
    console.warn("Error: ", error);
  }
};

const getUser = async id => {
  try {
    const user = await API.graphql(graphqlOperation(queries.getUser, { id }));
    // console.warn("the user", user.data.getUser);
    if (user.data.getUser === null) {
      return false;
    } else return true;
  } catch (error) {
    console.warn("Error in getUser: ", error);
  }
};

const addGratitude = async (gratitudeOwnerId, description) => {
  let today = new Date();
  today = String(today);
  const gratitudeDetails = {
    gratitudeOwnerId,
    description,
    createdOn: today
  };

  try {
    const newGratitude = await API.graphql(
      graphqlOperation(customMutations.addGratitude, {
        input: gratitudeDetails
      })
    );
    return newGratitude;
  } catch (error) {
    console.warn("Error createGratitude: ", error);
  }
};

const UserActions = {
  createUser,
  getUser,
  addGratitude
};

export default UserActions;
