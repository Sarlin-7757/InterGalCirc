import app from "./app";
import { connectToDatabase } from "./db/dbConnection";
import './events/tradeEventListener';
import './events/cargoEventEmitter';

const PORT = process.env.PORT as string || 5000;
connectToDatabase().then(()=>{
    app.listen(PORT, () => console.log("Server Open, Connected to Database {MongoDB}"));
}).catch((err)=> console.log(err));
