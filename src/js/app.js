import '@babel/polyfill';
import { configCommandLineArgs } from '@kuro-kuroite/prelude';
import cronConfigEvents from './cron_config_events';
import cronFetchDataCircleNavi from './cron_fetch_data_circle_navi';
import cronNotifyCircleNavi from './cron_notify_circle_navi';
import cronNotifyEvents from './cron_notify_events';

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'show help',
  },
];

const content = `
8時または，以前設定した「.発話」の予定の時間に，一日の生活をスマートスピーカが通知する.
#のついた予定の12分前にその予定のリマインドをする．
`;

const sections = [
  {
    header: 'circle notify',
    content,
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
];

configCommandLineArgs(optionDefinitions, sections, process.argv);

export default async function main() {
  await cronFetchDataCircleNavi(
    ['fetch_weather_json.js', 'fetch_calendar_json.js'],
    'cron_config.json',
  );
  await cronConfigEvents('cron_config.json');
  await cronNotifyCircleNavi();
  await cronNotifyEvents('events.json');
}

(async () => {
  try {
    await main();
    // eslint-disable-next-line no-console
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
