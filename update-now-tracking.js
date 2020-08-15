
const nowTrackingView = new Vue({
  el: '#now-tracking-outlet',
  data: {
    url:'',
    name:'',
    signatureCount:''
  },
    computed: {
      humanUrl: function () {
          return this.url.replace(/\.json$/, '')
      }
    }
})

const hasResponse = r => r && r.data && r.data.attributes

const updateNowTracking = (response) => {
    nowTrackingView.url = response.links.self.trim('.json')
    nowTrackingView.name = response.data.attributes.action
    nowTrackingView.signatureCount = response.data.attributes.signature_count
}

window.petitionPinger.responses$
  .filter(hasResponse)
  .subscribe(updateNowTracking)
