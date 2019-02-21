import '@babel/polyfill';
import { filterEvents } from '../../atoms';

export default async function filterConfigEvents(
  fileName = `events.json`,
  startWithChar = '.',
) {
  const configEvents = await filterEvents(fileName, event => {
    const name = event.summary;

    return name.startsWith(startWithChar);
  });
  return configEvents;
}
