export const useGetUserID = () => {
    return window.localStorage.getItem("userID");
}

export const useGetUsername = () => {
    return window.localStorage.getItem("username");
}