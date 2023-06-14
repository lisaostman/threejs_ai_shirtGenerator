import express from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';

// env vironments
dotenv.config();

// setting up express router
const router = express.Router();

// comes from env 
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

// set up to call its ai to generate images for you
const openai = new OpenAIApi(config);

// route
router.route('/').get((req,res) => {
    res.status(200).json({message: "Hello from Dalle routes"})
})

router.route('/').post(async(req,res) => {
    try{
        const { prompt } = req.body;
        const response = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format: 'b64_json'
        });

        const image = response.data.data[0].b64_json;
        console.log(image);
        // passing it to our client end as a 200 message
        res.status(200).json({photo: image})
    } catch (eror) {
        console.log(error);
        res.status(500).json({message: "Something went wrong!"})
    }
})

export default router;