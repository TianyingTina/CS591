var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hw1/:input', function(req,res){
  let input = req.params.input;
  let length = input.length;
  res.json({String: input, Length: length});
})

router.post('/hw1',function(req,res,next){
  console.log(req.body.input);
  res.json({String: req.body.input,Length: req.body.input.length }
  )
}
)

module.exports = router;
