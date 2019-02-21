import '@babel/polyfill';
import path from 'path';
import { configEnv, fsAsync } from '@kuro-kuroite/prelude';
import { CalendarEventList } from '@kuro-kuroite/mini-googlecalendar-event';

configEnv();

const { CIRCLE_NAVI_PATH } = process.env;

export default async function filterEvents(
  fileName = 'events.json',
  filterConditionCallback,
) {
  const events = JSON.parse(
    await fsAsync.readFile(
      path.resolve(__dirname, '../../../../', CIRCLE_NAVI_PATH, fileName),
      'utf-8',
    ),
  );

  // TODO: process.env.LANGUAGE = JP では動かない
  //       @kuro-kuroite/mini-googlecalendar-event の修正が必要
  const eventList = new CalendarEventList(events, { language: 'ja' });

  return eventList.filterEventList(events, filterConditionCallback);
}
