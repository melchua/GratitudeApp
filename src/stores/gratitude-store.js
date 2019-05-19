import { flow, types } from "mobx-state-tree";
import UserApi from "../services/api/user";

const GratitudeStoreModel = types
  .model("Gratitude", {
    isCreeatingGratitude: types.optional(types.boolean, true)
  })
  .actions(self => {
    return {
      afterCreate() {
        // self.checkIfLoggedIn();
      },
      addGratitude: flow(function*(
        ownerId = null,
        description = "Placeholder"
      ) {
        try {
          const response = yield UserApi.addGratitude(ownerId, description);
          return response && true;
        } catch (error) {
          console.warn("ERROR:", error);
          return error;
        }
      })
    };
  });
export default GratitudeStoreModel;
