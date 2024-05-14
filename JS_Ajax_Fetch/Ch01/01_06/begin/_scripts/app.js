'use strict';

// const url = 'https://us-street.api.smarty.com/street-address?key=199072511117584239&street=22%20Degroat%20Rd&street2=&city=Sandyston&state=NJ&zipcode=07827&candidates=10&match=enhanced&license=us-rooftop-geocoding-cloud'

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=62d2461c9e90d58cc137848503b2eda7'

const addressField = document.querySelector('#address')
const cityField = document.querySelector('#city')
const stateField = document.querySelector('#state')
//const $zipField = $('#zip)
const zipField = document.querySelector('#zip')



const weatherUpdateUISuccess = (data) => {
  const parsedData = JSON.parse(data)
  console.log(parsedData)
  const country = parsedData.sys.country
  const name = parsedData.name
  zipField.value = country + '-' + name
}

const weatherUpdateUIError = (error) => {
  console.log(error)
}

const responseMethod = (httpRequest, successHandler, failureHandler) => {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      successHandler(httpRequest.responseText)
    } else {
      failureHandler(httpRequest.status + ': ' + httpRequest.responseText)
    }
  }
}

const createRequest = function(url, successHandler, failureHandler) {
  const httpRequest = new XMLHttpRequest(url);
  httpRequest.addEventListener(
    'readystatechange', 
    (url) => responseMethod(httpRequest, successHandler, failureHandler));
  httpRequest.open('GET', url);
  httpRequest.send();
};

const checkCompletion = () => {
  console.log('checkCompletion')
  if (addressField.value !== ''  
    && cityField.value !== '' 
    && stateField.value !== '') {
    const requestUrl = url + 
      '&street=' + addressField.value +
      '&city=' + cityField.value +
      '&state=' + stateField.value
    
    console.log(requestUrl)
    createRequest(requestUrl, weatherUpdateUISuccess, weatherUpdateUIError);
  }
}

addressField.addEventListener('change', checkCompletion)
cityField.addEventListener('change', checkCompletion)
stateField.addEventListener('change', checkCompletion)

// createRequest(url, weatherUpdateUISuccess, weatherUpdateUIError);