const cors = require('cors')
const express = require('express')
const { result, values, isNull } = require("lodash");
const con=require ("./db.js").con
const path = require('path');
const { body, check, param, validationResult } = require("express-validator");

const PORT = 8080

 const corsOptions = { origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 }

const app = express();
// parses JSON from incoming request
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// Do not edit
const options = {
  lemon:  'yellow',
  lime: 'limegreen',
  tangerine: 'orange',
  grapefruit: 'lightcoral',
  grape: 'lavender'
};

// #3 helper function 'getColor`
const getColor = (fruit) => {
   let fruit = ""
   let c1 = options.lemon
   let c2 = options.limegreen
   let c3 = options.tangerine
   let c4 = options.grapefruit
   let c5 = options.grape
   
   fruit.add(c1,c2,c3,c4,c5)
    return fruit
}

// #1 serve the colors.html page when /colors is visited
// DO NOT USE express.static
app.get('/colors',cors(corsOptions), (req, res)  => {
  
  const ABSOLUTE_PATH = path.join(__dirname, '../client/colors.html');
  res.sendFile(ABSOLUTE_PATH); 
  res.status(200)
});

// #2 & #4 handle POST requests to /colors

  app.post("/colors/", cors(corsOptions), async (req, res) => {
      const { fruit } = req.body;
      let colors = getColor(fruit)
      res.send(colors);
  
});

// #6 serve styles.css - DO NOT use express.static()


  app.get('/styles.css', cors(corsOptions), (req, res) => {

    const ABSOLUTE_PATH = path.join(__dirname, '../client/style.css');

    res.sendFile(ABSOLUTE_PATH); 

   
});


// #5 Update functionality to database
app.put('/colors/:id/:fruit', cors(corsOptions) , async (req,res) => {
  const { id } = req.params;
  const { fruit } = req.params;
  const { color } = req.body;
  const  fruitC = getColor(fruit);
  
  let result = await con.query(
    "UPDATE car SET color = fruitC  WHERE car_id = ?",
    [fruit, id]
  );
  console.log(result[0]);
  res.send(result[0]);
});


// #7 unknown routes - 404 handler
// research what route to serve this for
app.get('/colors', () => {
  res.status(404).render('error');
})

// Global error handling middleware
// You can leave this alone
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
