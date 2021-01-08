const express = require('express');
const path = require('path');
const app = express();
const youtubedl = require('youtube-dl');
const fs = require('fs');
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/ytdownload', (req, res) => {
    
    let ytLink = req.query.ytLink+"";
    console.log("Youtube link is "+ytLink);
    const video = youtubedl(ytLink,
      // Optional arguments passed to youtube-dl.
      ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: __dirname })
     
    // Will be called when the download starts.
    video.on('info', function(info) {
      console.log('Download started')
      console.log('filename: ' + info._filename)
      console.log('size: ' + info.size)
    })
    let base = 'public';
    let filelink='/myvideo.mp4';
    let link = base+'/myvideo.mp4';
    video.pipe(fs.createWriteStream(link));

    return res.json({ success: true, link: filelink });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
