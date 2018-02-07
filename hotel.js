"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const DialogflowApp = require('actions-on-google').DialogflowApp;


const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
function sillyNameMaker(req, res) {
const app = new DialogflowApp({request: req, response: res});

const WELCOME_INTENT = 'input.welcome';  // the action name from the Dialogflow intent
const NUMBER_INTENT = 'input.number';  // the action name from the Dialogflow intent
const NUMBER_ARGUMENT = 'input.mynum'; // the action name from the Dialogflow intent
const Order="order";
const OrderedMenu ="OrderedMenu";
const myAction ='SampleAction';
console.log(req)
function welcomeIntent (app) {
  app.ask('Welcome to number echo! Say a number.');
}

function numberIntent (app) {
   app.ask(app)
  let number = app.getArgument(NUMBER_ARGUMENT);
  app.tell('You said 1 ' + number);
}
function sampleFunc(app)
{
  let _app = this.app;
  app.tell(_app);
  res.json({Data:_app});
}
function tell_Order(app)
{
    app.tell("idli vada dosa");
}
function your_Order(app)
{
    // cont from here
    let _app = new DialogflowApp({req,res})
    let _order = app.getArgument('menu');
    app.tell("You have ordered",_order)
}
let actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcomeIntent);
  actionMap.set(NUMBER_INTENT, numberIntent);
  actionMap.set(order,tell_Order);
  actionMap.set(OrderedMenu,your_Order);  
  actionMap.set(myAction,sampleFunc);
  app.handleRequest(actionMap);
   function responseHandler (app) {
    console.log("okok")
    // intent contains the name of the intent you defined in the Actions area of API.AI
    let intent = app.getIntent();
    switch (intent) {
      case WELCOME_INTENT:
        app.ask('Welcome! Say a number.');
        break;

      case NUMBER_INTENT:
        let number = app.getArgument(NUMBER_ARGUMENT);
        app.tell('You said 2' + number);
        break;

      case  myAction:
        app.ask('sample! ');
        break;

       default:
        app.ask('Please enter correct input! ');
        break;

    }
  }
  // you can add the function name instead of an action map
  app.handleRequest(responseHandler);
 
}

restService.post('/', function (req, res) {
 // console.log(req.body);
  sillyNameMaker(req, res);
})

 
restService.post("/echo", function(req, res) {
  //  var menu = "idli"   
   var menu = "idli, vada, dosa"
   //input[0].rawInputs[0].query
var speech =  req.body.result && req.body.result.parameters && req.body.result.parameters.Menu ? menu  : "Seems like some problem. Speak again.";
 // var speech =  req.input[0].rawInputs[0].query ? menu  : "you are connected to webhook.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});
restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });
