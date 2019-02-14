import '@babel/polyfill';
import * as shell from 'shelljs';
import { CronJob } from 'cron';
import { DateFnsTz } from '@kuro-kuroite/prelude';
import './atoms/dotenv';

const { APP_PATH } = process.env;

// 毎秒実行
// const cronTime = '20 55 22 * * 1-5';
// const cronTime = '*/5 * * * * 1-5';

// 一度だけ実行したい場合、Dateオブジェクトで指定も可能
const dateFnsTZ = new DateFnsTz('JP');
// after 10 sec from now
const zonedDateTime = dateFnsTZ.toDate(new Date().valueOf() + 1000 * 10);
const cronTime = zonedDateTime;
// eslint-disable-next-line no-console
console.log(cronTime);

const job = new CronJob({
  // 実行したい日時 or crontab書式
  cronTime,

  // 指定時に実行したい関数
  onTick() {
    // shell.exec('echo testtest!');
    // shell.exec('echo `date` && node ./test.js');

    shell.exec(`echo \`date\` && echo willspeaking && node ${APP_PATH}`);
  },

  // ジョブの完了または停止時に実行する関数
  onComplete() {
    // eslint-disable-next-line no-console
    console.log('onComplete!');
  },

  // コンストラクタを終する前にジョブを開始するかどうか
  start: false,
  timeZone: 'Asia/Tokyo',
});

// ジョブ開始
job.start();
// ジョブ停止
// job.stop();
