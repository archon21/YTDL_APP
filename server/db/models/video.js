const db = require('../db');
const filter = require('../../util-funcs');

class Video {
  writeVideo(title, size, ref, length, author, desc, thumbnail) {
    const formatedArgs = [];
    for (let i = 0; i < arguments.length; i++) {
      let arg = arguments[i];
      console.log(arg);
      formatedArgs[i] = filter.singleQuotes(arg);
    }
    const query = `INSERT INTO videos (${`video_title`}, ${`video_ref`}, ${`video_size`}, ${`video_length`}, ${`video_author`}, ${`video_desc`}, ${`video_thumbnail`}) VALUES ( '${
      formatedArgs[0]
    }', '${formatedArgs[2]}', '${formatedArgs[1]}', '${formatedArgs[3]}', '${
      formatedArgs[4]
    }', '${formatedArgs[5]}', '${formatedArgs[6]}');`;
    db.query(query, (err, results, field) => {
      if (err) {
        console.error(err);
        console.error(err.stack);
      } else {
        console.log('Entry Added');
      }
    });
  }

  async getVideoData(res, ref) {
    const query = `SELECT * FROM videos  WHERE ${`video_ref`} = ('${filter.singleQuotes(ref)}');`;

    // console.log(query)
    return await db.query(query, (err, results, field) => {
      if (err) {
        return console.error(err);
      } else {
        console.log('RESULTS', results);
        return res.json(results);
      }
    });
  }

  async getVideosData(res) {
    const query = `SELECT * FROM videos`;
    return await db.query(query, (err, results, field) => {
      if (err) {
        return console.error(err);
      } else {
        console.log(results);
        return res.json(results);
      }
    });
  }

  logQuery(query) {
    console.log(query);
  }
}

const video = new Video();

module.exports = video;
