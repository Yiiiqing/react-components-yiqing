"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weather = exports.MyComponent = exports.LunarTime = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./styles.css");

var _axios = require("./axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 农历时间,显示当前农历时间
 */
var CalendarData = new Array(100);
var madd = new Array(12);
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xa4b, 0x5164b, 0x6a5, 0x6d4, 0x415b5, 0x2b6, 0x957, 0x2092f, 0x497, 0x60c96, 0xd4a, 0xea5, 0x50da9, 0x5ad, 0x2b6, 0x3126e, 0x92e, 0x7192d, 0xc95, 0xd4a, 0x61b4a, 0xb55, 0x56a, 0x4155b, 0x25d, 0x92d, 0x2192b, 0xa95, 0x71695, 0x6ca, 0xb55, 0x50ab5, 0x4da, 0xa5b, 0x30a57, 0x52b, 0x8152a, 0xe95, 0x6aa, 0x615aa, 0xab5, 0x4b6, 0x414ae, 0xa57, 0x526, 0x31d26, 0xd95, 0x70b55, 0x56a, 0x96d, 0x5095d, 0x4ad, 0xa4d, 0x41a4d, 0xd25, 0x81aa5, 0xb54, 0xb6a, 0x612da, 0x95b, 0x49b, 0x41497, 0xa4b, 0xa164b, 0x6a5, 0x6d4, 0x615b4, 0xab6, 0x957, 0x5092f, 0x497, 0x64b, 0x30d4a, 0xea5, 0x80d65, 0x5ac, 0xab6, 0x5126d, 0x92e, 0xc96, 0x41a95, 0xd4a, 0xda5, 0x20b55, 0x56a, 0x7155b, 0x25d, 0x92d, 0x5192b, 0xa95, 0xb4a, 0x416aa, 0xad5, 0x90ab5, 0x4ba, 0xa5b, 0x60a57, 0x52b, 0xa93, 0x40e95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

var LunarTime = exports.LunarTime = function (_React$Component) {
  _inherits(LunarTime, _React$Component);

  function LunarTime(props) {
    _classCallCheck(this, LunarTime);

    var _this = _possibleConstructorReturn(this, (LunarTime.__proto__ || Object.getPrototypeOf(LunarTime)).call(this, props));

    _this.state = {
      time: {
        date: "2019-01-01",
        time: "00:00:00",
        week: "周日",
        lunar: "腊月初一"
      },
      tem: { temp: "10-15", type: "晴" }
    };
    _this.data = [];
    return _this;
  }

  _createClass(LunarTime, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.log("1");
      this.timer = setInterval(function () {
        _this2.setState({
          time: _this2.showTime()
        });
      }, 1000);
    }
  }, {
    key: "getLuner",
    value: function getLuner(solarYear, solarMonth, solarDay) {
      if (solarYear < 1921 || solarYear > 2020) {
        return "";
      } else {
        solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
        this.e2c(solarYear, solarMonth, solarDay);

        return this.GetcDateString();
      }
    }
  }, {
    key: "e2c",
    value: function e2c() {
      TheDate = arguments.length !== 3 ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      var total, m, n, k;
      var isEnd = false;
      var tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 === 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0;; m++) {
        k = CalendarData[m] < 0xfff ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + this.GetBit(CalendarData[m], n)) {
            isEnd = true;
            break;
          }
          total = total - 29 - this.GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k === 12) {
        if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }
  }, {
    key: "GetBit",
    value: function GetBit(m, n) {
      return m >> n & 1;
    }
  }, {
    key: "GetcDateString",
    value: function GetcDateString() {
      var tmp = "";
      // tmp+=tgString.charAt((cYear-4)%10);
      // tmp+=dzString.charAt((cYear-4)%12);
      // tmp+="(";
      // tmp+=sx.charAt((cYear-4)%12);
      // tmp+=")年 ";
      // var sM = ''
      // var sD = ''
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
      tmp += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
      if (cDay % 10 !== 0 || cDay === 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      //sD = numString.charAt((cDay-1)%10);

      return tmp;
    }
  }, {
    key: "showTime",
    value: function showTime() {
      var list_Week = void 0,
          value_week = void 0;
      list_Week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      //今日周几?
      value_week = date.getDay();
      var lunar = this.getLuner(y, m, d);
      //获得天气,每天凌晨
      // if (h === '00' && minute === '00' && second === '00'){
      //     this.getWeather()
      // }
      //返回
      return {
        date: y + "年" + m + "月" + d + "日",
        time: h + ":" + minute + ":" + second,
        week: list_Week[value_week],
        lunar: lunar
      };
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "lanar-time" },
        this.state.time.date,
        " ",
        this.state.time.time,
        " ",
        this.state.time.week,
        "\u519C\u5386 ",
        this.state.time.lunar
      );
    }
  }]);

  return LunarTime;
}(_react2.default.Component);

/**
 * 测试
 */


var MyComponent = exports.MyComponent = function MyComponent() {
  return _react2.default.createElement(
    "h1",
    null,
    "Hello from My Component"
  );
};

/**
 * 天气,显示传入地方的天气,传入的是城市代号(高德地图城市编码表)
 */

var Weather = exports.Weather = function (_React$Component2) {
  _inherits(Weather, _React$Component2);

  function Weather(props) {
    _classCallCheck(this, Weather);

    var _this3 = _possibleConstructorReturn(this, (Weather.__proto__ || Object.getPrototypeOf(Weather)).call(this, props));

    if (props.city) {
      _this3.state = {
        city: props
      };
    } else {
      _this3.state = {
        city: "310112"
      };
    }
    return _this3;
  }

  _createClass(Weather, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getWeatherAPIData(this.state.city);
    }
  }, {
    key: "getWeatherAPIData",
    value: function getWeatherAPIData(city) {
      var _this4 = this;

      _axios2.default.jsonp({
        url: "https://restapi.amap.com/v3/weather/weatherInfo?city=" + city + "&key=b8b577de4edb39608ec242b13483efbc"
      }).then(function (res) {
        if (res.status === "1") {
          var data = res.lives[0];
          _this4.setState({
            // dayPictureUrl:data.dayPictureUrl,
            //高德无图,更改为地址
            location: data.city,
            weather: data.weather
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "span",
          { className: "weather-loc" },
          this.state.location
        ),
        _react2.default.createElement(
          "span",
          { className: "weather-detail" },
          this.state.weather
        )
      );
    }
  }]);

  return Weather;
}(_react2.default.Component);