
const getParameterByName = (queryParam) => {
  if (URLSearchParams) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(queryParam)
  } else {
    const url = window.location.href
    queryParam = queryParam.replace(/[\[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + queryParam + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    return !results || !results[2]
      ? ''
      : decodeURIComponent(results[2].replace(/\+/g, ' '))
  }
}

window.Rx.Observable.ajax({
  url: 'https://petition.parliament.uk/petitions.json?state=open',
  crossDomain: true
})
  .flatMap(function (r) { return r.response.data })
  .take(50)
  .subscribe(function (d) {
    var list = document.getElementById('popular-petitions')
    var optionNode = document.createElement('option')
    optionNode.value = d.links.self
    optionNode.appendChild(document.createTextNode(`${d.attributes.action} : ${d.attributes.signature_count} signatures`))
    list.appendChild(optionNode)
  })

var petitionInput = document.getElementById('petition')
const fromQueryParam = getParameterByName('petition')
let url
if (fromQueryParam) {
  url = fromQueryParam
  petitionInput.value = fromQueryParam
} else {
  url = petitionInput.value
}

window.Rx.Observable.fromEvent(petitionInput, 'keyup')
  .startWith(url)
  .debounceTime(500)
  .subscribe(function (t) {
    window.petitionPinger.url = petitionInput.value
  })
