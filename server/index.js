import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

// set up environmental variables
dotenv.config();

// setting up application
const app = express();
// preventing cross origin problems
app.use(cors())
// limit to send
app.use(express.json({limig: "50mb"}))
// uses app and assigns __/api/v1/dalle as using the routes from dalleRoutes
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', (req,res) => {
    res.status(200).json({message: "Hiiiii from DALL.E!"})
})

// say where to host it
app.listen(5000, () => console.log("Server has started on port 5000"))