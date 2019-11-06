'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Axios = function () {
    function Axios() {
        _classCallCheck(this, Axios);
    }

    _createClass(Axios, null, [{
        key: 'jsonp',

        //通过jsonp请求天气等
        value: function jsonp(options) {
            return new Promise(function (resolve, reject) {
                (0, _jsonp2.default)(options.url, {
                    param: 'callback'
                }, function (err, response) {
                    //to-do
                    if (response.info === 'OK') {
                        resolve(response);
                    } else {
                        reject(response.message);
                    }
                });
            });
        }
    }]);

    return Axios;
}();

exports.default = Axios;