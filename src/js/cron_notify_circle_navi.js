import { configEnv, fsAsync } from '@kuro-kuroite/prelude';
import path from 'path';
import { setCron } from './atoms';

configEnv();

const { CIRCLE_NAVI_PATH } = process.env;

export default async function cronNotifyCircleNavi(
  circleNaviAppName = 'dist/app.js',
  configName = 'cron_config.json',
) {
  const { cronTimeCircleNaviApp } = JSON.parse(
    await fsAsync.readFile(
      path.resolve(__dirname, '../../', configName),
      'utf-8',
    ),
  );

  const cronTimeCircleAppPath = path.resolve(
    __dirname,
    '../../',
    CIRCLE_NAVI_PATH,
    circleNaviAppName,
  );

  console.log('will talk');
  setCron(`node ${cronTimeCircleAppPath}`, cronTimeCircleNaviApp);
}
