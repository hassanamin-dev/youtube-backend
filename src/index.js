// require('dotenv').config({ path : './env'})
import dotenv from 'dotenv'
import connectDb from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDb()















/* first approach
import { express } from 'express'
const app = express();

( async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=> {
            console.log("error", error)
            throw error
        })

        app.listen(process.env.PORT, ()=> {`server is listening on port 
            ${process.env.PORT}`})
    } catch (error) {
        console.error("Error", error);
        throw error
    }
})()
*/