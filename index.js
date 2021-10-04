const app = require('./src/app');
const checkConection = require('./src/config/dbConection');
const port = process.env.PORT || 1337;

app.listen(port, async () => {
  console.log('---------------------------------------------------------------------------------\n\n');
  console.log(`🏁  Server on ${process.env.PORT} 🏁`);
  await checkConection();
});
