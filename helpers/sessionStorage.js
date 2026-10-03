import AsyncStorage from "@react-native-async-storage/async-storage";

const setSessionData = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.error(
            "Failed to save session data:",
            error
        );
        throw error;
    }
};

const getSessionData = async (key) => {
    try {
        const value =
            await AsyncStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : null;
    } catch (error) {
        console.error(
            "Failed to get session data:",
            error
        );

        return null;
    }
};

const removeSessionData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(
            "Failed to remove session data:",
            error
        );
        throw error;
    }
};

export {
    setSessionData,
    getSessionData,
    removeSessionData,
};