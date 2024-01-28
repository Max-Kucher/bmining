import {createContext} from "react";

export const MinerContext = createContext({
    profit: {
        day: 0,
        month: 0,
        year: 0,
    },
});
