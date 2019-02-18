import '@babel/polyfill';
import * as shell from 'shelljs';
import { CronJob } from 'cron';
import { DateFnsTz, configEnv } from '@kuro-kuroite/prelude';

configEnv();

const { APP_PATH } = process.env;

const dateFnsTZ = new DateFnsTz('JP');

export default function setCron(date, delta = 10) {
  const zonedDateTime = dateFnsTZ.toDate(date.valueOf() - delta * 60 * 1000);
  const cronTime = zonedDateTime;

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
}
