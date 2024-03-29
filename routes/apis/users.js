const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController.js')
const { authenticated, checkRoleIsUser } = require('../../middleware/auth')

const multer = require('multer')
const upload = multer({// 確定圖片格式 jpg、jpeg、png
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image'))
    }
    cb(null, true)
  },
  limit: {
    fileSize: 1000000
  },
  dest: 'temp/'
})
const userImageUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }])

router.post('/login', userController.userLogin)
router.get('/tweets', authenticated, checkRoleIsUser, userController.getTweets)
router.get('/get-current-user', authenticated, userController.getCurrentUser)
router.get('/top', authenticated, checkRoleIsUser, userController.getTopUsers)
router.get('/:id/tweets', authenticated, checkRoleIsUser, userController.getUserTweets)
router.get('/:id/followers', authenticated, checkRoleIsUser, userController.getFollowers)
router.get('/:id/followings', authenticated, checkRoleIsUser, userController.getFollowings)
router.get('/:id/likes', authenticated, checkRoleIsUser, userController.getLikedTweets)
router.get('/:id/replied_tweets', authenticated, checkRoleIsUser, userController.getUserReliedTweets)
router.put('/:id/setting', authenticated, checkRoleIsUser, userController.putUserSetting)
router.get('/:id', authenticated, checkRoleIsUser, userController.getUser)
router.put('/:id', authenticated, checkRoleIsUser, userImageUpload, userController.putUser)
router.post('/', userController.register)







module.exports = router