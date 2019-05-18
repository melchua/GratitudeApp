import { flow, types } from "mobx-state-tree";
import UserApi from "../services/api/user";

const GratitudeStoreModel = types
  .model("Todo", {
    isCreeatingGratitude: types.optional(types.boolean, true)
  })
  .actions(self => {
    return {
      afterCreate() {
        // self.checkIfLoggedIn();
      },
      createGratitude: flow(function*(id = null, description = "Placeholder") {
        try {
          const response = yield UserApi.createGratitude(id, description);
          return response && true;
        } catch (error) {
          return error;
        }
      })
    };
  });
export default GratitudeStoreModel;
