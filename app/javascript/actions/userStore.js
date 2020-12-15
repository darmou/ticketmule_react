import produce from "immer";


const UserStore = {
    add: function ({state, user}) {
        return {...state, users: [...state.users, user]};
    },
    update: function ({state, aUser}) {
        if (state && state.users) {
            const index = state.users.findIndex(user => user.id === aUser.id);
            return produce(state, draftState => {
                draftState.users[index] = {...draftState.users[index], ...aUser};
            });
        }
        return state;
    },
    setUserPage: function ({state, page}) {
        return produce(state, draftState => {
            draftState.userPageInfo.currentPage = page;
        });
    },
    setUserLetterSelected: function ({state, letter}) {
      return produce(state, draftState => {
          draftState.userPageInfo.letterSelected = letter;
        });
    },
    setPerPage: function ({state, perPage}) {
        return produce(state, draftState => {
            draftState.userPageInfo.perPage = perPage;
        });
    },
    setUsersData: function ({state, usersData}) {
        return produce(state, draftState => {
            draftState.userPageInfo.currentPage = usersData['pagy']['page'];
            draftState.userPageInfo.resourceCount = usersData['pagy']['count'];
            draftState.userPageInfo.lastPage = usersData['pagy']['last'];
            draftState.users = usersData['data'];
        });
    },
    resetIsLoggingOut: function ({state}) {
        return produce(state, draftState => {
            draftState.isLoggingOut = false;
        });
    },
    setUser: function ({state, user}) {
        if (user) {
            sessionStorage.setItem("authentication_token", user.authentication_token);
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("id", user.id);
        } else {
           sessionStorage.removeItem("authentication_token");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("id");
        }
        return produce(state, draftState => {
            draftState.isLoggingOut = (user == null) ? true : false;
            draftState.user = user;
        });
    },
    setAUser: function ({state, user}) {
        return produce(state, draftState => {
            draftState.aUser = user;
        });
    },
    deleteUser: function ({state, id}) {
        const index = state.users.findIndex(user => user.id === id);
        return produce(state, draftState => {
            draftState.users.splice(index, 1);
        });
    },
};

export default UserStore;