"use strict";

require("@babel/polyfill");

var shell = _interopRequireWildcard(require("shelljs"));

var _cron = require("cron");

var _prelude = require("@kuro-kuroite/prelude");

require("./atoms/dotenv");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var APP_PATH = process.env.APP_PATH; // 毎秒実行
// const cronTime = '20 55 22 * * 1-5';
// const cronTime = '*/5 * * * * 1-5';
// 一度だけ実行したい場合、Dateオブジェクトで指定も可能

var dateFnsTZ = new _prelude.DateFnsTz('JP'); // after 10 sec from now

var zonedDateTime = dateFnsTZ.toDate(new Date().valueOf() + 1000 * 10);
var cronTime = zonedDateTime; // eslint-disable-next-line no-console

console.log(cronTime);
var job = new _cron.CronJob({
  // 実行したい日時 or crontab書式
  cronTime: cronTime,
  // 指定時に実行したい関数
  onTick: function onTick() {
    // shell.exec('echo testtest!');
    // shell.exec('echo `date` && node ./test.js');
    shell.exec("echo `date` && echo willspeaking && node ".concat(APP_PATH));
  },
  // ジョブの完了または停止時に実行する関数
  onComplete: function onComplete() {
    // eslint-disable-next-line no-console
    console.log('onComplete!');
  },
  // コンストラクタを終する前にジョブを開始するかどうか
  start: false,
  timeZone: 'Asia/Tokyo'
}); // ジョブ開始

job.start(); // ジョブ停止
// job.stop();