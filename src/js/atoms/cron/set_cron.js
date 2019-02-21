import '@babel/polyfill';
import * as shell from 'shelljs';
import { CronJob } from 'cron';

export default function setCron(
  exec = `echo \`date\` && echo willspeaking`,
  cronUtcTime,
) {
  const cronTime = cronUtcTime;
  console.log(cronUtcTime);
  console.log(cronUtcTime);
  console.log(cronUtcTime);
  console.log(cronUtcTime);
  console.log(cronUtcTime);
  const start = false;
  const timeZone = 'Asia/Tokyo';
  const job = new CronJob(
    ...[
      // 実行したい日時 or crontab書式
      cronTime,

      // 指定時に実行したい関数
      function onTick() {
        // shell.exec('echo testtest!');
        // shell.exec('echo `date` && node ./test.js');

        // shell.exec(`echo \`date\` && echo willspeaking && node ${APP_PATH}`);
        console.log(exec);
        shell.exec(exec);
      },

      // ジョブの完了または停止時に実行する関数
      function onComplete() {
        // eslint-disable-next-line no-console
        console.log('onComplete!');
      },

      // コンストラクタを終する前にジョブを開始するかどうか
      start,
      timeZone,
    ],
  );

  // ジョブ開始
  job.start();

  return job;
}
