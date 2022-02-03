export const GETTOKEN = function () {
    let token = localStorage.getItem("token");
    return token;
}