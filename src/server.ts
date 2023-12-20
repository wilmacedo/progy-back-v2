import { app } from './app';
import { env } from './env';
import { Color } from './logger';

app.listen(env.PORT, () => {
  console.log(`🚀 HTTP Server Running!`);
  console.log(`🚪 Port in use: ${Color.YELLOW}${env.PORT}${Color.WHITE}`);
});
