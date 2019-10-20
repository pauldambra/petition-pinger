var _ = window._

//ugh IE
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
  function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {};
    } while ((i < 0) && (el = el.parentElement));
    return el;
  };
}

const calculateMovement = x => {

      var change = x.position - x.lastPosition

      var movement = 'steady'
      if (change > 0) {
        movement = 'moving-up'
      }

      if (change < 0) {
        movement = 'moving-down'
      }

      return movement
}

const toggleHighlight = (state) => {
  return (event, leader) => {
    var constituency = window.constituencies.find(leader.name)
    constituency && constituency.classList[state]('highlight')

    const row = event.srcElement.closest('tr')
    row.classList[state]('highlight')
  }
}

const leaderBoardView = new Vue({
  el: '#votes',
  data: {
    leaders: []
  },
  methods: {
    mouseOver: toggleHighlight('add'),
    mouseLeave: toggleHighlight('remove')
  }
})

var lastLeaders = null

function update (data) {
  var leaders = _.chain(data)
    .orderBy('signature_count', 'desc')
    .take(20)
    .map(function (x, index) {
      return {
        name: x.name,
        signatureCount: x.signature_count,
        position: index
      }
    })
    .map(function (x) {
      if (lastLeaders) {
        x.lastPosition = _.findIndex(lastLeaders, { name: x.name })
        x.isNewEntry = x.lastPosition === -1
      }

      return x
    })
    .map(function (x) {
      if (lastLeaders) {
        x.movement = calculateMovement(x)
      }
      return x
    })
    .value()

  lastLeaders = leaders

  leaderBoardView.leaders = leaders
}

window.petitionPinger.signatures$.subscribe(update)
