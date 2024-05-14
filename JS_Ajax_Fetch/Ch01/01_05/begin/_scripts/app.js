'use strict';

const url = 'http://universities.hipolabs.com/search?name=seoul&limit=1'

const createRequest = function(url) {
    const httpRequest = new XMLHttpRequest(url)
    httpRequest.addEventListener('readystatechange', (url) => {
        if (httpRequest.readyState === 4) {
            console.log(httpRequest.responseText)
        }
    })

    httpRequest.open('GET', url)
    httpRequest.send();
}

createRequest(url)