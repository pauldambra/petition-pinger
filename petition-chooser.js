
window.petitionPinger.petitionChooser = new Vue({
  el: '#petition-chooser',
  data: {
    petitions: [],
    petitionUrl: window.petitionPinger.getValueFromURL('petition')
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

