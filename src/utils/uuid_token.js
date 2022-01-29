import { v4 as uuidv4 } from 'uuid';
export const GETUUID = function () {
    let uuid = localStorage.getItem("uuid");
    if (uuid == undefined) {
        uuid = uuidv4();
        localStorage.setItem("uuid", uuid)
    }
    return uuid;
}