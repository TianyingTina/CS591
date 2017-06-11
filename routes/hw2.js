/**
 * Created by tianyingzhang on 6/10/17.
 */
var express = require('express');
var router = express.Router();
var hw2task = require('../library/schema.js').hw2module;

/* GET home page. */
router.get('/', function(req, res, next) {
    hw2task.find({}, function(err, text){
        var newtext = [];


        text.forEach(function(user) {
            newtext.push(user.input);
        });
        newtext = newtext.map(function(e){
            return JSON.stringify(e);
        });

        newtext = newtext.join(",");

        res.send(newtext);


    });});


/*router.param("input",function(req,res,next,id){
    console.log("is it in?");
    hw2task.findOne({input:id},function(err,docs){
        if (err) {
            return next(err);
        }
        else if(docs){
            req.input = docs.input;
            req.length = docs.length;
            return next();
        }
        else  {
            const length = id.length;
            req.input = id;
            req.length = length;
            const newItem = {
                input:id,
                length:length
            };
            hw2task.create(newItem);
            return next();
        }
    });
});*/


router.get('/:input', function(req,res){
    let input = req.params.input;
    let length = input.length;
    hw2task.findOne({
        input: input
    }).exec(function(err,finn){
        if (err){
            res.send('err');
        }
        else if (!finn){
            const newItem = {
                input:input,
                length:length
            };
            hw2task.create(newItem);
            res.json({String: input, Length: length});
        }
    });

    res.json({String: input, Length: length});
})
/*
router.get('/:input', function(req,res){
    let input = req.params.input;
    let length = input.length;
    /!*console.log(hw2task.findOne({input:req.input}));*!/



 /!*{
            const length = req.length;
            const id = req.input;
            const newItem = {
                input:id,
                length:length
            };
            hw2task.create(newItem);

        }*!/

    res.json({String:req.input,Length:req.length});



});
*/




router.post('/',function(req,res,next){
        console.log(req.body.input);
        hw2task.findOne({'input':req.body.input}, function(err,docs){

            if(req.body.input == null){
                console.log("There is no String!");
                res.json("The input could not be blank. Please enter a string.");
            }
            else if(docs){
                req.body.input = docs.input;
                req.body.length = docs.length;
                console.log("The word is already in the database!");
                res.json({String: req.body.input,Length: req.body.input.length })
            }
            else {
                const id = req.body.input;
                const length = req.body.length;
                const newItem = {
                    input:id,
                    length:length
                };
                hw2task.create(newItem);
                console.log("The word is not in the database. Lets add it!");
                res.json({String: req.body.input,Length: req.body.input.length })

            }
        })
        /*res.json({String: req.body.input,Length: req.body.input.length }*/

    }
);

router.delete('/:input', function (req, res) {
    let input = req.params.input;
    let length = input.length;
    console.log('Got a DELETE request at /user');
    hw2task.findOneAndRemove({
        input: input
    }).exec(function(err,docs){
        if(err){
            console.log('err');
            res.json('err');


        }
        else if(!docs){
            res.json('string not found');
        }
        else{
            console.log('the word already in the database. Delete it!')
            res.json('Delete Successfully');
        }
    })
})

module.exports = router;
