module.exports = {
    REGEX_EMAIL: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
    REGEX_URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    REGEX_MONGO_ID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
};
