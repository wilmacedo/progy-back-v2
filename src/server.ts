import { app } from "./app";

app.listen(3333, () => {
  console.log(`🚀 HTTP Server Running!`);
  console.log(`🚪 Port in use: \x1b[33m3333`);
});
