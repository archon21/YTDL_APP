const router = require('express').Router();
const db = require('../../db');
const path = require('path');
const fs = require('fs');
const { video } = require('../../db/models');

router.param('ref', function(req, res, next, ref) {
  req.ref_from_param = ref;
  next();
});

router.get('/', async (req, res, next) => {
  await video.getVideosData(res);
});

router.get('/:ref/get', (req, res, next) => {
  const {body} = req
  const ref  = req.ref_from_param;
  console.log(body.ref, body)
  console.log('URL;', req.url)
  if (body.ref) {
    return next();
  } else {
    const fileName = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'videos',
      ref + '.mp4'
    );
    const stat = fs.statSync(fileName);
    const fileSize = stat.size;
    const range = req.headers.range;
    console.log(range);
    console.log(fileSize);

    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(200, head);
    fs.createReadStream(fileName).pipe(res);
  }
});

router.post('/data', async (req, res, next) => {
  console.log('DATA', req.body);
  const { ref } = req.body;
  await video.getVideoData(res, ref);
});

// router.get('/', (req, res, next) => {
//     const query = `SELECT * FROM videos WHERE ${`video_title`}`
// })

module.exports = router;
