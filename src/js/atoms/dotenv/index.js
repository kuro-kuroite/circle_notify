import dotenv from 'dotenv';
import path from 'path';

const result = dotenv.config({
  path: path.resolve(__dirname, '../../../', '.env'),
});
if (result.error) {
  throw result.error;
}
