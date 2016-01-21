/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Module dependencies
var express    = require('express'),
  errorhandler = require('errorhandler'),
  bodyParser   = require('body-parser'),
  fs           = require('fs');
module.exports = function (app, speechToText) {

  // Configure Express
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Setup static public directory
  app.use(express.static(__dirname + '/../public'));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/../views');

  // Add error handling in dev
  if (!process.env.VCAP_SERVICES) {
    app.use(errorhandler());
  }

// render index page
app.get('/', function(req, res) {
  res.send('<html> \
<head> \
<title>Speech to Text</title> \
<meta charset="utf-8"> \
<meta http-equiv="X-UA-Compatible" content="IE=edge"> \
<meta name="viewport" content="width=device-width, initial-scale=1"> \
<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"> \
<link rel="icon" href="/images/favicon.ico" type="image/x-icon"> \
<link rel="stylesheet" href="/css/watson-bootstrap-dark.css"> \
<link rel="stylesheet" href="/css/banner.css"> \
<link rel="stylesheet" href="/css/style.css"> \
<style type="text/css"></style> \
</head> \
<body> \
<div class="micButton"></div> \
<p class="micText">Press to start speaking</p> \
<div class="well"> \
<div style="display:none" class="form-group row loading text-center"> \
<img src="images/watson.gif"> \
</div> \
<div class="errorMsg"></div> \
<div id="text" style="display: none;"></div> \
</div> \
<form class="speech-form form-horizontal" method="get"> \
  <fieldset> \
      <textarea id="textArea" class="form-control" required="" rows="8" name="text"></textarea> \
        <input class="btn btn-block speak-button" value="Speak"></input> \
    </fieldset> \
</form> \
<audio class="audio" controls="" autobuffer="" preload="auto" autoplay=""></audio>\
<form id="fileupload" method="POST" enctype="multipart/form-data" action="/" class="upload-form"><input type="hidden" name="url" class="url-input"></form> \
<script type="text/javascript" src="/js/browser-detect.js"></script> \
<script type="text/javascript" src="/js/jquery-1.11.1.min.js"></script> \
<script type="text/javascript" src="/js/speech-recognizer.js"></script> \
<script type="text/javascript" src="/js/socket.io.js"></script> \
<script type="text/javascript" src="/js/demo-tts.js"></script> \
<script type="text/javascript" src="/js/demo-stt.js"></script> \
</body> \
</html>')
});

app.post('/', function(req, res) {
  var audio;

  if(req.body.url && req.body.url.indexOf('audio/') === 0) {
    // sample audio
    audio = fs.createReadStream(__dirname + '/../public/' + req.body.url);
  } else {
    // malformed url
    return res.status(500).json({ error: 'Malformed URL' });
  }

  speechToText.recognize({audio: audio, content_type: 'audio/l16; rate=44100'}, function(err, transcript){
    if (err)
      return res.status(500).json({ error: err });
    else
      return res.json(transcript);
  });
});

};