const textInput = document.getElementById('text')
const form = document.getElementById('form')
const langEL = document.getElementById('leng')
const btnEl = document.getElementById('btn')
const resultDiv = document.querySelector('.result-container')

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
	