var request = require("request");

var gcmRequest = {
    url: "https://android.googleapis.com/gcm/send",
    headers: {
        "Authorization": "key=<INSERT_API_KEY>",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        registration_ids: ["<INSERT_PUSH_TOKEN>"],
        data: {
            message: "Test"
        }
    })
};

request.post(gcmRequest, function (error, response, body) {
    if (error) {
        console.log(JSON.stringify(error));
    } else {
        console.log(body);
    }
});