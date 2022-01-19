
router.post("/login",(req, res, next)=> {
  usermodel.findOne({email: req.body.email})

          .then(user1=>{
          if(!user1){console.log('Login failed!')
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          return bcrypt.compare(req.body.password, user.password);
          })


        .then(result=>{
          if(!result){console.log('Login failed!')
            return res.status(401).json({
              message:"Auth failed"
            });
          }
          const token = jwt.sign({email: user.email, userId: user._id},
            "A_very_long_string_for_our_secret",
            { expiresIn: "1h"}
            );console.log('Login successful')
            res.status(200).json({
              token: token
            });
        })

      .catch(err =>{
        return res.status(401).json({
          message: "Auth failed"
        });
      })
});
