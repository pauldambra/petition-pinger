const defaultUrl = 'https://petition.parliament.uk/petitions/269157.json'

const getPetitionFromURL = () => {
  let needle = "petition"
  if (URLSearchParams) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(needle) || defaultUrl
  } else {
    const url = window.location.href
    needle = needle.replace(/[\[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + needle + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    return !results || !results[2]
      ? defaultUrl
      : decodeURIComponent(results[2].replace(/\+/g, ' '))
  }
}

window.petitionPinger.petitionChooser = new Vue({
  el: '#petition-chooser',
  data: {
    petitions: [],
    petitionUrl: getPetitionFromURL()
  },
  created: function() {

    fetch('https://petition.parliament.uk/petitions.json?state=open')
    .then(res => res.json())
    .then(res => {
      this.petitions = res.data
        .map(p => {
          return {
            url: p.links.self,
            description: `${p.attributes.action} : ${p.attributes.signature_count} signatures`
          }
        })
    })
  }
})

