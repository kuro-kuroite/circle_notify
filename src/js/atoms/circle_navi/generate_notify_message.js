import { configEnv } from '@kuro-kuroite/prelude';

configEnv();

const { REGION } = process.env;

export default function generateNotifyMessage(
  eventName,
  delta,
  region = REGION,
) {
  if (region === 'JP') {
    return `"${delta}分後に，${eventName}の予定があります"`;
  }
  if (region === 'US') {
    return `"In ${delta} minutes, you have ${eventName}."`;
  }
  return `"In ${delta} minutes, you have ${eventName}."`;
}
