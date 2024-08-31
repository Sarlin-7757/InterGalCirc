import app from "./app";
import { connectToDatabase } from "./db/dbConnection";
import './events/tradeEventListener';
import './events/cargoEventEmitter';


connectToDatabase().then(()=>{
    app.listen(5000 , () => console.log("Server Open, Connected to Database {MongoDB}"));
}).catch((err)=> console.log(err));
