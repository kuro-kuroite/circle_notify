import path from 'path';
import { parallel, configEnv, DateFnsTz } from '@kuro-kuroite/prelude';
import {
  generateNotifyMessage,
  setDateCron,
  filterNotifyEvents,
} from './index';

configEnv();

const { CIRCLE_NAVI_PATH, REGION } = process.env;
const notifierPath = path.resolve(
  __dirname,
  '../../',
  CIRCLE_NAVI_PATH,
  './dist/notifier.js',
);

const dateFnsTz = new DateFnsTz(REGION);

export default async function cronNotifyEvents(fileName = 'events.json') {
  const notifyEvents = await filterNotifyEvents(fileName);

  // HACK: pararell が関数の配列を要求するため
  const tmp = notifyEvents.map(event => async () => {
    const utcDate = dateFnsTz.zonedTimeToUtc(event.start.dateTime);
    const name = event.summary.replace('#', '');
    // TODO: 今後，イベント名を #(20)ミーティング のように設定すると，
    //       20の部分をdelda に代入できるようにするため
    const delta = 12;
    console.log(`${notifierPath}`);
    const message = generateNotifyMessage(name, delta, REGION);
    const exec = `node ${notifierPath} --message ${message}`;
    console.log(`${delta} minites from ${utcDate}(utc): notify ${name}`);
    setDateCron(exec, utcDate, delta);
  });
  await parallel(...tmp);
}
