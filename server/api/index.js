const router = require('express').Router();

router.use('/ytdl', require('./ytdl'));
router.use('/videos', require('./videos'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
module.exports = router;
