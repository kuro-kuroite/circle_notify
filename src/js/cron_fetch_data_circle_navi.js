import path from 'path';
import { configEnv, fsAsync } from '@kuro-kuroite/prelude';
import { setCron } from './atoms';

configEnv();

const { CIRCLE_NAVI_PATH } = process.env;

export default async function cronFetchDataCircleNavi(
  fetchDataScripts = ['fetch_weather_json.js', 'fetch_calendar_json.js'],
  configName = 'cron_config.json',
) {
  const configPath = path.resolve(__dirname, '../../', configName);
  const { cronTimeCircleNaviFetchData } = JSON.parse(
    await fsAsync.readFile(configPath, 'utf-8'),
  );

  await Promise.all(
    fetchDataScripts.map(async fetchDataScript => {
      const fetchDataScriptPath = path.resolve(
        __dirname,
        '../../',
        CIRCLE_NAVI_PATH,
        `./dist/${fetchDataScript}`,
      );

      const exec = `node ${fetchDataScriptPath}`;
      setCron(exec, cronTimeCircleNaviFetchData, 0);
    }),
  );
}

(async () => {
  try {
    await cronFetchDataCircleNavi(['fetch_weather_json.js']);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
