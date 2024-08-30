import app from "./app";
import { connectToDatabase } from "./db/dbConnection";

const PORT = 5000

connectToDatabase().then(()=>{
    app.listen(5000 , () => console.log("Server Open, Connected to Database {MongoDB}"));
}).catch((err)=> console.log(err));
