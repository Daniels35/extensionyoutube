document.addEventListener('DOMContentLoaded', () => {
    const elements = {
      languagecontainer: document.getElementById('languagecontainer'),
      title: document.getElementById('title'),
      speedLabel: document.getElementById('speedLabel'),
      speedRange: document.getElementById('speedRange'),
      speedValue: document.getElementById('speedValue'),
      by: document.getElementById('by'),
      donateMessage: document.getElementById('donateMessage'),
      languageSelect: document.getElementById('language-select')
    };
  
    const translations = {
      en: {
        languagecontainer: "Language:",
        title: "Set Playback Speed",
        speedLabel: "Speed: <span id='speedValue'>1</span>x",
        by: "By <strong>Daniel Diaz</strong>",
        donateMessage: "If you enjoy using this extension, consider making a donation to support its development:"
      },
      es: {
        languagecontainer: "Idioma:",
        title: "Establecer velocidad de reproducción",
        speedLabel: "Velocidad: <span id='speedValue'>1</span>x",
        by: "Por <strong>Daniel Díaz</strong>",
        donateMessage: "Si disfrutas usando esta extensión, considera hacer una donación para apoyar su desarrollo:"
      }
    };
  
    function setLanguage(lang) {
      const translation = translations[lang];
      elements.languagecontainer.textContent = translation.languagecontainer;
      elements.title.innerHTML = translation.title;
      elements.speedLabel.innerHTML = translation.speedLabel.replace('<span id=\'speedValue\'>1</span>', `<span id='speedValue'>${elements.speedRange.value}</span>`);
      elements.by.innerHTML = translation.by;
      elements.donateMessage.innerHTML = translation.donateMessage;
      localStorage.setItem('language', lang);
    }
  
    // Set initial language based on stored preference or browser language
    const storedLanguage = localStorage.getItem('language') || navigator.language.substring(0, 2);
    if (translations[storedLanguage]) {
      elements.languageSelect.value = storedLanguage;
      setLanguage(storedLanguage);
    } else {
      elements.languageSelect.value = 'en';
      setLanguage('en');
    }
  
    elements.languageSelect.addEventListener('change', (event) => {
      setLanguage(event.target.value);
    });
  
    // Set the slider and span to the stored speed value if it exists
    const storedSpeed = localStorage.getItem('playbackSpeed');
    if (storedSpeed) {
      elements.speedRange.value = storedSpeed;
      elements.speedLabel.innerHTML = translations[elements.languageSelect.value].speedLabel.replace('<span id=\'speedValue\'>1</span>', `<span id='speedValue'>${storedSpeed}</span>`);
    } else {
      elements.speedValue.textContent = elements.speedRange.value;
    }
  
    elements.speedRange.addEventListener('input', () => {
      const speed = elements.speedRange.value;
      elements.speedValue.textContent = speed;
  
      // Update speed label with the new speed value
      elements.speedLabel.innerHTML = translations[elements.languageSelect.value].speedLabel.replace('<span id=\'speedValue\'>1</span>', `<span id='speedValue'>${speed}</span>`);
  
      // Store the speed value
      localStorage.setItem('playbackSpeed', speed);
  
      // Send message to background script to change the speed
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;
        chrome.runtime.sendMessage({action: "setSpeed", speed: parseFloat(speed), tabId: tabId}, (response) => {
          if (!response || response.status !== "success") {
            console.error("Failed to set speed:", response ? response.message : "Unknown error");
          } else {
            console.log(`Speed set to ${speed}x`);
          }
        });
      });
    });
  });
  