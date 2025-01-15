'use strict';

const crypto = require('crypto');

function genSign(params, appSecret) {
    const paramsStr = Object.keys(params)
        .sort()
        .map(key => `${key}${params[key]}`)
        .join('') + appSecret;

    return crypto
        .createHash('sha1')
        .update(paramsStr)
        .digest('hex');
}

exports.signParams = function(params, date, appKey, appSecret) {
    return {
        ...params,
        date,
        appKey,
        signature: genSign({ ...params, date, appKey }, appSecret)
    };
};
