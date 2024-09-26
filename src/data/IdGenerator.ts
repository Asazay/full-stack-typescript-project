import {randomBytes} from "node:crypto";

export function generateRandomId(){
    return randomBytes(10).toString('hex');
}