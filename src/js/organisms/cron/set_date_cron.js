import '@babel/polyfill';
import { DateFnsTz, configEnv, dateFns } from '@kuro-kuroite/prelude';
import { setCron } from '../../atoms';

configEnv();

const { REGION } = process.env;

const dateFnsTZ = new DateFnsTz(REGION);

export default function setDateCron(exec, utcDate, delta = 10) {
  // TODO: dateFnsTZのメソッドでn分前を再現する
  console.log(typeof utcDate);
  const zonedDateTime = dateFnsTZ.toDate(dateFns.addMinutes(utcDate, -delta));
  console.log('aaa');
  console.log(zonedDateTime instanceof Date);
  console.log(zonedDateTime);
  const cronTime = zonedDateTime;

  return setCron(exec, cronTime);
}
