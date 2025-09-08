import { v4 as uuidv4 } from "uuid";
export const generateId = () => {
    return uuidv4();
};

export const currentDateTime = () => {
    return new Date().toISOString(); // Example: "2025-06-21T17:05:30.000Z"
};