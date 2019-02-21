import { configEnv, fsAsync, dateFns, DateFnsTz } from '@kuro-kuroite/prelude';
import path from 'path';
import { filterConfigEvents } from './index';

configEnv();
const { REGION } = process.env;

const dateFnsTz = new DateFnsTz(REGION);

export default async function cronConfigEvents(
  configName = 'cron_config.json',
) {
  const configPath = path.resolve(__dirname, '../../', configName);
  const configEvents = await filterConfigEvents();

  await Promise.all(
    configEvents.map(async event => {
      const name = event.summary.replace('.', '');
      if (['発話', 'speak'].includes(name)) {
        const cronConfig = JSON.parse(
          await fsAsync.readFile(configPath, 'utf-8'),
        );
        const dateTime = dateFnsTz.toDate(event.start.dateTime);
        // HACK: cron_config は日本時間であるので，
        //       Local Time に変換をする
        const zonedTime = dateFnsTz.utcToZonedTime(dateTime);
        const hours = dateFns.getHours(zonedTime);
        const minutes = dateFns.getMinutes(zonedTime);
        const seconds = dateFns.getSeconds(zonedTime);
        cronConfig.cronTimeCircleNaviApp = `${seconds} ${minutes} ${hours} * * *`;

        await fsAsync.writeFile(
          configPath,
          JSON.stringify(cronConfig, null, '  '),
        );
      }
    }),
  );
}
