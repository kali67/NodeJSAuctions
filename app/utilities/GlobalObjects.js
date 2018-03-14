const crypto = require('crypto');

exports.UnauthorizedLogin = {
    code: 401,
    message: "Invalid username/email/password supplied"
};

exports.OK = {
    code: 200,
    message: "OK"
};

exports.BadRequest = {
    code: 400,
    message: "Bad request"
};

exports.MalformedRequest = {
  code: 400,
  message: "Malformed request"
};

exports.NotFoundRequest = {
    code: 404,
    message: "Not found"
};

exports.OKCreated = {
    code: 201,
    message: "OK"
};

exports.token = crypto.randomBytes(32 * (3 / 4)).toString("base64");