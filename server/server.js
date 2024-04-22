import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectToMongoDB from './database/connec.js';
import router from './router/route.js';
//import generatePDF from './pdf/pdfgenerating.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

app.get('/',(req,res) => {
  res.status(201).json("home get request");
});
/** api routes */
app.use('/api',router)


//generatePDF();

/** start server only when we have valid connection */
connectToMongoDB().then(() =>{
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Coannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid connection");
})


