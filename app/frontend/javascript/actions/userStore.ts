import produce from "immer";

const UserStore = {
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
            sessionStorage.setItem("admin", `${user.admin}`);
            sessionStorage.setItem("id", user.id);
        } else {
           sessionStorage.removeItem("authentication_token");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("id");
        }
        return produce(state, draftState => {
            draftState.isLoggingOut = (user == null) ? true : false;
            draftState.user = user;
        });
    },
};

export default UserStore;