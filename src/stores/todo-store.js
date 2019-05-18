import { flow, types } from "mobx-state-tree";
import UserApi from "../services/api/user";

const TodoStoreModel = types
  .model("Todo", {
    isCreeatingTodo: types.optional(types.boolean, true)
  })
  .actions(self => {
    return {
      afterCreate() {
        // self.checkIfLoggedIn();
      },
      createTodo: flow(function*(id = null, description = "Placeholder") {
        try {
          const response = yield UserApi.createTodo(id, description);
          return response && true;
        } catch (error) {
          return error;
        }
      })
    };
  });
export default TodoStoreModel;
