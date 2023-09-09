import { AUTH_ID } from "./constant"

const authUser = {
    IsAuth,
    Get,
    Remove
}

function IsAuth() {
    const user = Get();
    const isAuth = user ? true : false;
    return isAuth;
}

function Get() {
    let userData = localStorage.getItem(AUTH_ID);
    const user = JSON.parse(userData);
    return user;
}

function Remove() {
    localStorage.removeItem(AUTH_ID);
}

export default authUser;