// http module should be installed:
// npm i http

// Params:
// your anti-captcha.com account key
var anticaptcha = require('./anticaptcha')('12345678901234567890123456789012');

//geetest key from target website
anticaptcha.setWebsiteURL("https://hcaptcha.com/");
anticaptcha.setWebsiteKey("00000000-0000-0000-0000-000000000000");

//proxy access parameters
//not required for createHCaptchaTaskProxyless
anticaptcha.setProxyType("http");
anticaptcha.setProxyAddress("proxyaddress");
anticaptcha.setProxyPort(8080);
anticaptcha.setProxyLogin("proxylogin");
anticaptcha.setProxyPassword("proxypassword");

//browser header parameters
anticaptcha.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36");

anticaptcha.setCookies("anticaptcha=cool; cookies=set");

// check balance first
anticaptcha.getBalance(function (err, balance) {
    if (err) {
        console.error(err);
        return;
    }

    if (balance > 0) {
        anticaptcha.createHCaptchaTask(function (err, taskId) { // or createHCaptchaTaskProxyless
            if (err) {
                console.error(err);
                return;
            }

            console.log(taskId);

            anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(taskSolution);
            });
        });
    }
});