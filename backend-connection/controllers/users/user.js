

// Global httpURL export 설정
const httpURL = require('../../GlobalConstantShare/gloabalHttpURL');

const User = require('../../models/users/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltKey = require('../../middleware/saltKey');

exports.user_get_all = (req, res, next) => {

    User.find()
                .select()
                .exec()
                .then(docs => {

                    const response = {
                        count: docs.length,
                        users: docs.map(doc => {
                            return {
                                email: doc.email,
                                password: doc.password,
                                name: doc.name,
                                permissionTag: doc.permissionTag,
                                created_at: doc.created_at,
                                updated_at: doc.updated_at,
                                provider: doc.provider,
                                _id: doc._id,
                                request:   {
                                    type: 'GET',
                                    url: httpURL + '/user/' + doc._id
                                }
                            };
                        })
                    };
                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err});
                });
};

exports.user_get_one = (req, res, next) => {

  const decoded = jwt.decode(req.query.token);
  console.log("decoded: " + decoded.user._id);

  console.log('이것은 서버 점검영역이다');
  User.findById(decoded.user._id)
              .exec()
              .then(user => {
                console.log('실제로 찾은 사용자 정보', user);
                  res.status(200).json({ user: user });
              })
              .catch(err => {
                  console.log(err);
                  res.status(500).json({error: err});
              });
};

exports.user_signUp = (req, res, next) => {
  console.log('name is '+ req.body.name);
  console.log('email is '+ req.body.email);
  console.log('password is '+ req.body.password);
  console.log('permission tag is '+ req.body.permissionTag);

    User.find({ email: req.body.email })
        .exec()
        .then( user => {
            if (user.length >= 1) {
                return res.status(409).json({
                  title: 'User SignUp Error',
                  message: 'User is already existed'
                });
            } else {
                console.log(req.body.password);

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {

                        return res.status(500).json({
                          title: 'User SignUp Error',
                          message: 'Password is not matched'
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            permissionTag: req.body.permissionTag
                        });
                        user
                            .save()
                            .then(result => {
                               const token = jwt.sign({user: user}, saltKey,{expiresIn: '1h'});
                               return res.status(200).json({
                                message: 'user are saved successfully',
                                token: token,
                                user: user
                                // permissionTag: user.permissionTag,
                                // userName: user.name,
                                // shoppingCartLists : user.shoppingCartLists,
                                // paidToeflLists : user.paidToeflLists,
                            });

                            })
                            .catch(err => {
                                res.status(500).json({
                                  title: 'User SignUp Error',
                                  message: 'User can not be saved'
                                });
                            });

                    }
                });

            }
        });
};

exports.user_login = (req, res, next) => {

    User.findOne({email: req.body.email})
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                  title: 'User Login Error',
                  message: 'User is not existing'
                });
            }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                  title: 'User Login Error',
                  message: 'Password is wrong.....'
                });
            }
            if (result) {
                const token = jwt.sign({user: user}, saltKey,{expiresIn: '1h'});
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    user: user
                    // permissionTag: user.permissionTag,
                    // userName: user.name,
                    // shoppingCartLists : user.shoppingCartLists,
                    // paidToeflLists : user.paidToeflLists,
                    // paymentId : user.paymentId,

                });
            }
            res.status(401).json({
              title: 'User Login Error',
              message: 'Authentication is failed'
            });
        });

    })
    .catch(err => {
        res.status(500).json({
          title: 'User Login Error',
          message: 'No user existed'
        });
    });
};

exports.user_sociaLogin = (req, res, next) => {
  console.log('name is '+ req.body.name);
  console.log('email is '+ req.body.email);
  console.log('password is '+ req.body.password);
  console.log('permission tag is '+ req.body.permissionTag);
  console.log( 'social Login Provider'+ req.body.provider);

  User.findOne({email: req.body.email})
      .exec()
      .then( user => {
        console.log( user );
              if (user.length < 1) {
                      bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                              title: 'New User Saved Error',
                              message: 'Password is not matched'
                            });
                        } else {
                            const user = new User({
                                email: req.body.email,
                                password: hash,
                                name: req.body.name,
                                permissionTag: req.body.permissionTag,
                                created_at: req.body.currentDate,
                                updated_at: req.body.updatedDate,
                                provider: req.body.provider
                            });
                            user
                                .save()
                                .then(result => {
                                        const token = jwt.sign({user: user}, saltKey,{expiresIn: '1h'});
                                        return res.status(200).json({
                                          message: 'user are saved successfully',
                                          token: token,
                                          user: user
                                      });
                                })
                                    .catch(err => {
                                        res.status(500).json({
                                          title: 'User SignUp Error',
                                          message: 'User can not be saved'
                                        });
                                });

                        }
                      });
              }
              bcrypt.compare(req.body.password, user.password, (err, result) => {
                  if (err) {
                      return res.status(401).json({
                        title: 'User Login Error',
                        message: 'Password is wrong.....'
                      });
                  }
                  if (result) {
                      const token = jwt.sign({user: user}, saltKey,{expiresIn: '1h'});
                      return res.status(200).json({
                          message: 'Auth successful',
                          token: token,
                          user: user
                      });
                  }
                  res.status(401).json({
                    title: 'User Login Error',
                    message: 'Authentication is failed'
                  });
              });

      })
        .catch(err => {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                  title: 'New User Saved Error',
                  message: 'Password is not matched'
                });
            } else {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    permissionTag: req.body.permissionTag,
                    created_at: req.body.currentDate,
                    updated_at: req.body.updatedDate,
                    provider: req.body.provider
                });
                user
                    .save()
                    .then(result => {
                            const token = jwt.sign({user: user}, saltKey,{expiresIn: '1h'});
                            return res.status(200).json({
                              message: 'user are saved successfully',
                              token: token,
                              user: user
                          });
                    })
                        .catch(err => {
                            res.status(500).json({
                              title: 'Social user Added  Error',
                              message: 'User can not be saved'
                            });
                    });

            }
          });
        });
};

exports.user_delete = (req, res, next) => {

  const decoded = jwt.decode(req.query.token);
  console.log("decoded: " + decoded.user._id);

    User.remove({_id:decoded.user._id})
                            .exec()
                            .then(result => {
                                res.status(200).json(
                                    {
                                        title: 'User has been deleted',
                                        message: 'User deleted'
                                    }
                                );
                            })
                            .catch(err => {
                                res.status(500).json({
                                  title: 'User Delete Error',
                                  message: 'User can not be deleted'
                                });
                            });
};
