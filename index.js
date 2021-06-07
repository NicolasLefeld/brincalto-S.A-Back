const app = require('./src/app');
const checkConection = require('./src/config/dbConection');

app.listen(process.env.PORT, async () => {
  console.log('---------------------------------------------------------------------------------\n\n');
  console.log(`🏁  Server on ${process.env.PORT} 🏁`);
  await checkConection();
});
