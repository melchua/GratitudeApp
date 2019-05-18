import * as queries from "../../../src/graphql/queries";
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

const createTodo = async (id, description) => {
  const todoDetails = {
    id,
    description
  };
  try {
    const newTodo = await API.graphql(
      graphqlOperation(mutations.createTodo, { input: todoDetails })
    );
    console.warn("newTodo", newTodo);
    // return newTodo;
  } catch (error) {
    console.warn("Error createTodo: ", error);
  }
};

const UserActions = {
  createUser,
  getUser,
  createTodo
};

export default UserActions;
