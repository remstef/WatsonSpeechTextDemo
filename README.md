# Speech to Text and Text to Speech Nodejs Starter Application

  This application weaves together the speech to text and text to speech demo provided by IBM Watson as of Feb. 2015

  Please check out the [Speech to Text][stt_url1] service and [Text to Speech][tts_url1] service demo applications for latest reference.


## Getting Started

  1. create app nodejs in bluemix console
  2. bind Text-To-Speech and Speech-To-Text services to the app
  3. note down the credentials for the two services
  4. change credentials for the services in config/default.json under `credentials_stt` and `credentials_tts`
  5. run `npm install` to install all necessary packages
  6. run `node app.js` start the app on port 3000
  7. you can also run the app in bluemix. There are various methods working with apps in bluemix, please choose the one that works best for you. Simply stage and deploy the app as it befits you. (adapt `manifest.yml` file)


## Further References

  * [Speech to Text - Demo][stt_url2]
  * [Speech to Text on github][stt_url3]
  * [Text to Speech - Demo][tts_url1]
  * [Text to Speech on github][tts_url1]

[stt_url1]: https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html
[stt_url2]: https://speech-to-text-demo.mybluemix.net
[stt_url3]: https://github.com/watson-developer-cloud/speech-to-text-nodejs

[tts_url1]: https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/text-to-speech.html
[tts_url2]: https://text-to-speech-demo.mybluemix.net
[tts_url3]: https://github.com/watson-developer-cloud/text-to-speech-nodejs
