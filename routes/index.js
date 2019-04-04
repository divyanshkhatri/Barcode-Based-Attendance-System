var express = require('express');
var router = express.Router();
var attendance = require('./../model/student')

/* GET home page. */

var D=new Date;
date = D.getDate();
month = D.getMonth();
year = D.getFullYear();
finalDate = date + "/" + month + "/" + year;

// to send the barcode sacnner page
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

// to update the attendance
router.post("/student", (req, res) => {
  var regno = req.body.code;
  let query={
    $push : {
      registerno : regno
    }
  }
  let today = "1554108799167"; 
  attendance.updateOne({date : today},query,(err,done)=>{
    console.log(err,done);
    if(err)
      {
        console.log(err);
          res.send({
          code: 1,
          message: "Attendance failed"
        })
      }
    else if(done){
      res.send({
        code: 0,
        message: "Attendance recorded"
      })
    }
  })
})

  //insert one student
  router.post("/add", (req, res)=>{
    let data = new attendance({
      date : Date.now(),
      registerno : []
    })
    data.save({}, (err, docs)=>{
      if(err)
        console.log(err);
      else {

        console.log(docs);
        res.send({
          code: 0, 
          message: "Created new date",
          students: docs
        })
      }
  })
})
  //returns all the student list
  router.get("/student", (req, res)=>{
    attendance.find({}, (err, docs)=>{
      if(err)
        console.log(err);
      else 
        console.log(docs);
        res.send({
          code: 0, 
          message: "showing present students",
          students: docs
        })

  })

});
module.exports = router;