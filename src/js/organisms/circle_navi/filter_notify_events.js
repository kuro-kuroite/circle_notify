import '@babel/polyfill';
import { filterEvents } from '../../atoms';

export default async function filterNotifyEvents(
  fileName = `events.json`,
  startWithChar = '#',
) {
  const notifyEvents = await filterEvents(fileName, event => {
    const name = event.summary;

    return name.startsWith(startWithChar);
  });
  return notifyEvents;
}
