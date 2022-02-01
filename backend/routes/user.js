const express = require ( 'express' );

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
//const token = jwt.sign();

const router = express.Router();

const usermodel=require("../models/user");
  /*router.post("/signup", (req, res, next) =>{

    const NewUser = usermodel({
      email: req.body.email,
      password: req.body.password
    });
    NewUser.save()
    .then(result =>{
      res.status(201).json({
        message: "User Created",
        result: result
      });
    });
  });*/
  router.post("/signup", (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const NewUser = usermodel({
        email: req.body.email,
        password: hash
      });
      NewUser.save()
      .then(result =>{
        res.status(201).json({
          message: "User Created",
          result: result
        });
      });
    }).catch(err =>{
      res.status(500).json({
        error: err
      });
    });
  });
/////////////////////////////////////////////////////////////////
  /*router.post("/login",(req, res, next)=> {console.log('trying to login...')
    usermodel.findOne({email: req.body.email}).then(user1=>{
      if(!user1){console.log('Login failed!')
        return res.status(401).json({
          message: "Auth failed"
        });
      }console.log('user found:'+req.body.password+' and '+user1.password)
      return bcrypt.compare(req.body.password, user1.password);
    })
    .then(result=>{console.log('result!')
      if(!result){console.log('Login failed!')
        return res.status(401).json({
          message:"Auth failed"
        });
      }
      const token = jwt.sign({email: user.email, userId: user._id}, "A_very_long_string_for_our_secret", { expiresIn: "1h"} );
      console.log('Login successful')
        res.status(200).json({
          token: token
        });
    }).catch(err =>{console.log('Login err!')
      return res.status(401).json({
        message: "Auth failed"
      });  })
  });*/
/////////////////////////////////////////////////
router.post('/login', function(req, res) {

  usermodel.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).json({   message: "Auth failed"  })
    if (!user) return res.status(401).json({   message: "Auth failed"  })

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: "Auth failed" })

    const token = jwt.sign({email: user.email, userId: user._id}, "A_very_long_string_for_our_secret", { expiresIn: "1h"} );

    res.status(200).json({ token: token, expiresIn: 3600, userId: user._id, email: user.email})
  });

});
////////////to get email///////////////////////
router.get("/:id",(req, res, next)=>{
  usermodel.findById(req.params.id).then(user =>{
    if(user){
      const email=user.email
      res.status(200).json({email:email});
    }else{
      res.status(484).json({message: 'User not Found!'});
    }
  });
});

//////////////////////////////////////////////////
module.exports = router;
/*
  const token = jwt.sign({email: user.email, userId: user._id},
          "A_very_long_string_for_our_secret",
          { expiresIn: "1h"}
          );
 */
