import app from './app';
import { connectDb } from './src/database/connect';



const port = process.env.PORT || 5000
app.listen(port, async () => {
  await  connectDb()
    console.log(`Serveur démarré sur le port ${port}...`)
})
