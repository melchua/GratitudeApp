import { flow, types } from "mobx-state-tree";
import UserApi from "../services/api/user";

export const Gratitude = types.model({
  id: types.string,
  description: types.string,
  createdOn: types.string
});

const GratitudeStoreModel = types
  .model("GratitudeModel", {
    isGratitudesLoading: types.optional(types.boolean, true),
    gratitudes: types.array(Gratitude, [])
  })
  .actions(self => {
    return {
      afterCreate() {
        // self.loadGratitudes();
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
      }),
      saveGratitude(id, description, createdOn) {
        const gratitudeExists = self.gratitudes.filter(item => item.id === id);
        const gratitude = { id, description, createdOn };

        if (gratitudeExists.length > 0) {
          self.gratitudes[id] = gratitude;
        } else {
          self.gratitudes.push(gratitude);
        }
      },
      // load gratitudes into state saving them one by one
      loadGratitudes: flow(function*(ownerId) {
        // console.warn("ownerid: ", ownerId);
        try {
          self.isGratitudesLoading = true;

          const response = yield UserApi.listGratitudes(ownerId);
          const gratitudes = response.data.getUser.gratitudes.items;

          gratitudes.forEach(gratitude => {
            const { id, description, createdOn } = gratitude;
            self.saveGratitude(id, description, createdOn);
          });
          self.isGratitudesLoading = false;
          return true;
        } catch (err) {
          console.warn("error:", err);
        }
      })
    };
  });
export default GratitudeStoreModel;
