import {wsURL} from "../../apiURL";

export const connectChat = token => {
    return new WebSocket(`${wsURL}/chat?token=${token}`);
};

