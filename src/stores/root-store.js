import { types } from "mobx-state-tree";
import AuthStoreModel from "./auth-store";
import TodoStoreModel from "./todo-store";

// Notes: Need to figure out what props are to MST
// In this case, it seems like you are passing a reference to
//

const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStoreModel, {}),
  todoStore: types.optional(TodoStoreModel, {})
});

export default RootStoreModel;
