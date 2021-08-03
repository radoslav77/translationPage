const textInput = document.getElementById('text')
const form = document.getElementById('form')
const langEL = document.getElementById('leng')
const btnEl = document.getElementById('btn')
const resultDiv = document.querySelector('.result-container')

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    //errorMessage.style.display = 'block'
  }

//console.log(textInput)
//console.log(form)
//console.log(langEL)
//console.log(btnEl)
//console.log(resultDiv)

const API_URL = "https://deep-translate1.p.rapidapi.com/language/translate/v2"

const lang_URL = "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages"

const REQUEST_HEADERS = {
	"content-type": "application/json",
	"x-rapidapi-key": "e5cca01e94msh13b50c3f5cb7543p139c26jsn9bd955386cb9",
	"x-rapidapi-host": "deep-translate1.p.rapidapi.com"
}

let traslated = {}
let languageChoice = {}
const Languages =[]


form.addEventListener('submit', (e) => {
    e.preventDefault()
	 
	const originalText = text.value
	const lang = langEL.value
	// Getting lenguage code and saveing it into a dictionary
	axios.get(lang_URL, {headers: REQUEST_HEADERS})
	.then(response => {
		let langChoice = response.data
		langChoice = langChoice.languages
		langChoice.forEach(l => {
			Languages.push(l)
			if(lang == l.name){
			languageChoice['language'] = l.language	
			//getting language key word (exmple "en" for english) 
				var res = []
				for(let[key, value] of Object.entries(languageChoice)){
				res.push(value)		
		
				}
		
				const translation = {
					q: `${originalText}`,
					source: "en",
					target: `${res}`,
			}
			console.log(translation)

				// translation
				axios.post(API_URL, translation,{headers: REQUEST_HEADERS})
				.then(response => {
					const data = response.data
					
					traslated = data.data
					traslated = traslated.translations
					traslated = traslated.translatedText

					//inputing translated text into the HTML element
					resultDiv.innerHTML = `${traslated}`
				})
			}
		})
		
	})

.catch(error => console.log('On translation error', error))
})

var noteContent = ''

recognition.onresult = function(event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript
  
    // Add the current transcript to the contents of our Note.
    noteContent += transcript
   
    textInput.style.color = '#000'
    textInput.innerHTML = transcript
    
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
        noteContent += transcript
        textInput.style.color = '#000'
        textInput.innerHTML = transcript
}
  }

const startBtn = document.querySelector('#start-btn')
const stopBtn = document.querySelector('#stop-btn')

startBtn.addEventListener('click', function(e) {
    recognition.start()
  });

  stopBtn.addEventListener('click', function(e) {
    recognition.stop()
  });
//Here is the entire code needed to read out a string.
  function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance()
  
    // Set the text and voice attributes.
    speech.text = message
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1
  
    window.speechSynthesis.speak(speech)
  }