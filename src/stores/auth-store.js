import { flow, types } from "mobx-state-tree";
import AuthApi from "../services/api/auth";
import UserApi from "../services/api/user";

const AuthStoreModel = types
  .model("Auth", {
    isChecking: types.optional(types.boolean, false),
    isLoadingUsernameId: types.optional(types.boolean, true),
    needsToConfirm: types.optional(types.boolean, false),
    isLoggedIn: types.optional(types.boolean, false),
    isCheckingLoggedIn: types.optional(types.boolean, true),
    currentAuthUserId: types.optional(types.string, "")
  })
  .actions(self => {
    return {
      afterCreate() {
        // self.checkIfLoggedIn();
      },
      register: flow(function*(
        username = "default@default.com",
        password = "Test"
      ) {
        try {
          self.isChecking = true;
          const response = yield AuthApi.register(username, password);
          self.isChecking = false;
          return response && true;
        } catch (error) {
          return error;
        }
      }),
      confirm: flow(function*(username, code) {
        try {
          const response = yield AuthApi.confirmSignUp(username, code);
          return response && true;
        } catch (error) {
          return error;
        }
      }),
      signIn: flow(function*(email, password) {
        try {
          const user = yield AuthApi.signIn(email, password);
          // console.warn("USER", JSON.stringify(user));
          self.setLoggedIn();
          const userInDb = yield UserApi.getUser(user.username);
          // console.warn("return: ", userInDb);
          if (userInDb === false) {
            UserApi.createUser(user.username, email);
          }
          // }

          return user;
        } catch (error) {
          console.warn("ERROR in SIGNIN: ", error);
          return error;
        }
      }),
      // signOut just resolves a promise if success. instead of returning an error, we return true if success and false if failure
      signOut: flow(function*() {
        try {
          self.setLoggedOut();
          yield AuthApi.signOut();
          // self.checkIfLoggedIn();
          return true;
        } catch {
          return false;
        }
      }),
      checkIfLoggedIn: flow(function*() {
        try {
          self.isCheckingLoggedIn = true;
          yield AuthApi.currentAuthenticatedUser();

          self.setLoggedIn();
          self.isCheckingLoggedin = false;
          return true;
        } catch (err) {
          // console.warn("error: ", err);
          return false;
        }
      }),
      setLoggedIn() {
        self.isLoggedIn = true;
      },
      setCurrentUserId: flow(function*() {
        try {
          self.isLoadingUsernameId = true;
          const currentUser = yield AuthApi.currentAuthenticatedUser();
          self.currentAuthUserId = currentUser.username;
          self.isLoadingUsernameId = false;
        } catch (err) {
          console.warn("CurrentUser Error: ", err);
        }
      }),
      setLoggedOut() {
        self.isLoggedIn = false;
      },
      setConfirmationRequired() {
        self.needsToConfirm = true;
      },
      resetConfirmationRequired() {
        self.needsToConfirm = false;
      }
    };
  });
export default AuthStoreModel;
