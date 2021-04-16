const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone-alt"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone-alt")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-alt");
    micIcon.classList.add("fa-microphone-alt-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-alt-slash");
    micIcon.classList.add("fa-microphone-alt");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="Ayuda del sitio") {
      window.open('ayuda.html', '__blank');
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="Busca múltiple") {
        window.open('https://segundamano.mx/anuncios/mexico?q='+searchFormInput.value);
 
          window.open('https://www.playstation.com/es-mx/search/?q='+searchFormInput.value);
        
           window.open('https://www.walmart.com.mx/productos?Ntt='+searchFormInput.value);
        
        window.open('https://www.bodegaaurrera.com.mx/productos?Ntt='+searchFormInput.value);
        
        window.open('https://www2.hm.com/es_mx/search-results.html?q='+searchFormInput.value);
      }
      if(transcript.toLowerCase().trim()==="segunda"){
        window.open('https://segundamano.mx/anuncios/mexico?q='+searchFormInput.value);

      }
      else if (transcript.toLowerCase().trim()==="play"){
        window.open('https://www.playstation.com/es-mx/search/?q='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="walmart"){
        window.open('https://www.walmart.com.mx/productos?Ntt='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="bodega"){
        window.open('https://www.bodegaaurrera.com.mx/productos?Ntt='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="ache y eme"){
        window.open('https://www2.hm.com/es_mx/search-results.html?q='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="salir del sitio"){      
        window.alert("¿Estás seguro?");
        window.close();
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}