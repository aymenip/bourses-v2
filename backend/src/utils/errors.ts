export const handleError = (error: (message?: any) => void, message?: any) => {
    if (process.env.ENV === "DEV") {
        error(message);
    }
};