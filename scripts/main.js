(function ($) {
    $(document).ready(function () {
        var everlive = new Everlive({
            apiKey: "vAq2HD3eUDGAbGDj",
            scheme: "https"
        });
        
        chrome.gcm.register(["521050785891"], function (token) {
            everlive.Users.login("test", "password").then(function (result) {
                var deviceRegistration = {
                    "HardwareId": token,
                    "HardwareModel": "",
                    "PlatformType": 3, // 3 for Android, 4 for iOS
                    "PlatformVersion": "35",
                    "PushToken": token, // the token returned by the provider
                    "Locale": "en-US",
                    "TimeZone": "America/New_York"
                };
                
                $.ajax({
                    url: everlive.buildUrl() + "Push/Devices/HardwareId/" + token,
                    type: "GET",
                    headers: {
                        "Authorization": "bearer " + everlive.setup.token
                    },
                    contentType: "application/json",
                }).fail(function () {
                    $.ajax({
                        url: everlive.buildUrl() + "Push/Devices",
                        type: "POST",
                        headers: {
                            "Authorization": "bearer " + everlive.setup.token
                        },
                        contentType: "application/json",
                        data: JSON.stringify(deviceRegistration)
                    }).done(function () {
                        console.log("Registered");
                    }).fail(function (error) {
                        console.log("Failed registration", error);
                    });
                });
            }, function (error) {
                console.log(error);
            });
        });

        chrome.gcm.onMessage.addListener(function (message) {
            console.log("GOT MESSAGE!!", message);
        });
    });
})(jQuery);