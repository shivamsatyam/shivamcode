
let save_code = document.getElementById('save_code')
let run_code = document.getElementById('run_code')
let iframe = document.getElementById('iframe')

save_code.addEventListener('click',(e) => {
  	let code_title = prompt("Enter a title for your code")
  	if (code_title) {
  		let html_code = editor_html.getSession().getValue()
  		let css_code = editor_css.getSession().getValue()
  		let js_code = editor_js.getSession().getValue()

  		let code_data = [code_title,html_code,css_code,js_code]

  		let xhr = new XMLHttpRequest()
  		xhr.open('POST','/addpost')


  		xhr.setRequestHeader('Content-Type', 'application/json')

  		xhr.onload = function () {
  			alert('Your code submitted succesfully')
  		}


  		xhr.send(JSON.stringify(code_data))
  		alert('Your code submitted succesfully')


  	}else{
  		alert('Please write a suitable title')
  	}
});



run_code.addEventListener('click',(e) => {
	  let html_code = String(editor_html.getSession().getValue())
  		let css_code = String(editor_css.getSession().getValue())
  		let js_code = String(editor_js.getSession().getValue())

  		html_code.replace(`"`,`'`)
  		css_code.replace(`"`,`'`)
  		js_code.replace(`"`,`'`)

  		let iframe_data = html_code + `<style>${css_code}</style>` + `<script>${js_code}</script>`

  		iframe.srcdoc = iframe_data

  		iframe.style.display = "block"
  		iframe.style.width = "100vw"
  		iframe.style.height = "50vh" 


});