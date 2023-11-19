// https://op-prod-tr.ozan.com/api/(oauth/token\?grant_type=pre_verification|users/update-mobile-number)
const url = $request.url
var new_hdrs = {}
for (var k in $request.headers) {
    new_hdrs[k.toLowerCase()] = $request.headers[k]
}

function main() {
    if (url == 'https://op-prod-tr.ozan.com/api/oauth/token?grant_type=pre_verification') {
        if (!($request.body.includes('mfa_code') && $request.body.includes('mfa_token'))) {
            $notification.post('Ozan修复工具', '', `修复工具启动，请直接输入123456作为校验码`);
            return $done({ response: {
                status: 403,
                body: `{
      "message": "Identity authentication is required",
      "mfaToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzAyNzIyMDc1NyIsInNjb3BlIjpbInRlc3QiXSwiZGV2aWNlX2NvZGUiOiI2MkM5Q0Y0OC0xREJDLTRGNjgtQjZEOS03REUwQjNBOTQ2NEMiLCJleHAiOjE2OTg3Nzk0ODQsIm1mYUlkIjoiNjg1ZTM0NWEtODFhMi00NWI4LWE1OTgtNGQ4NjQyYWE3YTk3IiwianRpIjoiZDY0YjRlMTgtZWRkMy00YThlLWJlMTAtMTMyZmI5N2JiNTE1IiwiY2xpZW50X2lkIjoib3phbi1pb3MiLCJ1c2VybmFtZSI6IjEzMDI3MjIwNzU3In0.FE7oOyqhacnPVDDgsaU5rGhtteBL3jCIK3hku-yL-fWTWgx-mjpof637V6MryFqt458i3t1KORP_j2LrCRB5tcbCuQPYLxPd9VJbgNbMEC61EO_00bW_XCpTXgJ8FDXJrIWF9fGhCVNRThmwYhqg6TgllGPtEUKp4yCbQ_eksqQQvvN_5BvxObMddwXfxxfGca_VpUGDDPCj5E85Pe5yUFzNaFgtYVJw5PYzA5aOXtTSZDt9Svsqr2QmVHFQjtwi1qkZESX8K4O54_uJC9hc4zRYU7XyFb7qCuRYr5xPJjOp1YpdbaaM1ZNxVn_4ZfzvbVTO7I4V9Wq2oqWWEbudgA",
      "errorCode": "MFA_REQUIRED"
    }`,
                headers: {
                  "content-type": "application/json;charset=UTF-8",
                  "access-control-allow-origin": "*",
                  "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
                  "expires": "0",
                  "pragma": "no-cache",
                  "referrer-policy": "no-referrer-when-downgrade",
                  "strict-transport-security": "max-age=15552000; includeSubDomains",
                  "x-content-type-options": "nosniff",
                  "x-frame-options": "sameorigin",
                  "x-xss-protection": "1; mode=block",
                  "cf-cache-status": "DYNAMIC",
                  "server": "cloudflare",
                  "cf-ray": "81ed5867cc6f07a3-HKG",
                }
    
            }})
        } else {
            console.log(new_hdrs)
            const deviceCode = new_hdrs['x-device-code']
            console.log(deviceCode)
            if (deviceCode === '') {
                return $done()
            }
            return $done({ response: {
                status: 200,
                body: `{
      "device_code": "${deviceCode}",
      "jti": "ad721296-6d59-4a95-b1b3-7a279e0274ac",
      "token_type": "bearer",
      "scope": "test",
      "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzAyNzIyMDc1NyIsInNjb3BlIjpbInRlc3QiXSwiZGV2aWNlX2NvZGUiOiI2MkM5Q0Y0OC0xREJDLTRGNjgtQjZEOS03REUwQjNBOTQ2NEMiLCJhdGkiOiJhZDcyMTI5Ni02ZDU5LTRhOTUtYjFiMy03YTI3OWUwMjc0YWMiLCJleHAiOjE2OTg3ODAzOTcsImF1dGhvcml0aWVzIjpbIlBSRV9WRVJJRklDQVRJT05fVVNFUiJdLCJqdGkiOiJkNmNhY2RjMS1mNjczLTQxNjctOTI2ZC1lNDVjNDM5NWE0MjUiLCJjbGllbnRfaWQiOiJvemFuLWlvcyIsInVzZXJuYW1lIjoiMTMwMjcyMjA3NTcifQ.NM2QslAes1FnDK-XtL0OCGAbBoO7EvHRAQaOmGHpQ1whw3NfM6trF-ZvBPDE0AkX2UafKJXTarHODWYF_4fhhpFXno1dc8qQQylfP8fbwXFTBBIEPEFh6cqZqIy-OUiSU7xJXSVR8EbJzz5py_zhNIDuoICPO3SV_plepWFHchrDwWDBKXBkNuLJs7qp46-ezAwPUiapOoPiilzdCa-QyRr_007e5Q3e22sotkjdFpVc9JYlJnioS5IbmTqyolSTEsCHPbb3tSLugT3pLw9VL3AaC16LhAjkXE73G3SRbkf3LVTkjow19JRXHoWNCqAiAuVRlDM2y2JnaDwf7HRHvQ",
      "username": "13027220757",
      "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzAyNzIyMDc1NyIsInNjb3BlIjpbInRlc3QiXSwiZGV2aWNlX2NvZGUiOiI2MkM5Q0Y0OC0xREJDLTRGNjgtQjZEOS03REUwQjNBOTQ2NEMiLCJleHAiOjE2OTg3Nzk0OTcsImF1dGhvcml0aWVzIjpbIlBSRV9WRVJJRklDQVRJT05fVVNFUiJdLCJqdGkiOiJhZDcyMTI5Ni02ZDU5LTRhOTUtYjFiMy03YTI3OWUwMjc0YWMiLCJjbGllbnRfaWQiOiJvemFuLWlvcyIsInVzZXJuYW1lIjoiMTMwMjcyMjA3NTcifQ.CGyjujEhz1OWiFZu95io1p1BMQdu9K0DTiFN1BkHiuBnpMB6qVHq53gFXoPIsB1SEAfkFwR8v4_KySkLRlPbNcjtVM9mnP3dnNi7ZoO9i6ZwqwV3R4W1K-SzFwNm2yFNt6HlfxE_ColK17OdoUQVaRK_5NoZnZhHh50P54kfvIfJ8I70M4LOwdwFMvj9hqujKLapIG0_KqiSkMrVSH4Ryr9fYuppONLtKr_I_ALdSyzV95O3QWujTP_tzHv1jKrdfVQox0jOOiKEx-urJBrnHsj-nGD73DJccMgOny79tBw_oV1Fw6osYN6Pi36hkKSAnrhSk2zF4GdaPJoalc5itw",
      "expires_in": 8999
    }`,
                headers: {
                  "content-type": "application/json;charset=UTF-8",
                  "access-control-allow-origin": "*",
                  "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
                  "expires": "0",
                  "pragma": "no-cache",
                  "referrer-policy": "no-referrer-when-downgrade",
                  "strict-transport-security": "max-age=15552000; includeSubDomains",
                  "x-content-type-options": "nosniff",
                  "x-frame-options": "sameorigin",
                  "x-xss-protection": "1; mode=block",
                  "cf-cache-status": "DYNAMIC",
                  "server": "cloudflare",
                  "cf-ray": "81ed58b53f8907a3-HKG",
                }
            }})
        }
    }
    else if (url == 'https://op-prod-tr.ozan.com/api/users/update-mobile-number') {
        console.log($request)
        if (!$request.body.includes('1(')) {
            $done({})
        }
        console.log($request.body)
        var newbody = $request.body.replaceAll(/1\((\d\d\d)\)(\d\d\d)-(\d\d\d\d)/g, '1$1$2$3')
        const payload = {
            body: newbody,
        }
        $notification.post('Ozan修复工具', '', `已将手机号格式修复并更新，请重启重新登录：${$request.body} -> ${newbody}`);
        return $done(payload)
    }
    
    return $done({});
}
main()