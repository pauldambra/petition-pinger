const _ = window._;

const calculateMovement = x => {
    const change = x.position - x.lastPosition;

    switch (true) {
        case (change < 0): return 'moving-down'
        case (change > 0): return 'moving-up'
        default: return 'steady'
    }
}

const toggleHighlight = (state) => {
    return (event, leader) => {
        const constituency = window.constituencies.find(leader.name)
        if (constituency) {
            constituency.classList[state]('highlight')
        }
        const row = event.srcElement.closest('tr')
        if (row) {
            row.classList[state]('highlight')
        }
    }
}

const leaderBoardView = new Vue({
    el: '#votes',
    data: {
        leaders: [],
        pageSize: 10,
        currentPage: 1,
        constituencyFilter: ''
    },
    methods: {
        mouseOver: toggleHighlight('add'),
        mouseLeave: toggleHighlight('remove'),
        nextPage: function () {
            if ((this.currentPage * this.pageSize) < this.filteredLeaders.length) this.currentPage++;
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        }
    },
    computed: {
        filteredLeaders: function() {
          return this.leaders.filter(l => l.name.toLowerCase().indexOf(this.constituencyFilter) >= 0)
        },
        leaderboardPage: function () {
            const firstItem = (this.currentPage - 1) * this.pageSize
            const lastItem = this.currentPage * this.pageSize
            return this.filteredLeaders.slice(firstItem, lastItem);
        },
        totalPages: function () {
            return Math.ceil(this.filteredLeaders.length / this.pageSize)
        }
    }
})

let lastLeaders = null;

function update(data) {
    const leaders = _.chain(data)
        .orderBy('signature_count', 'desc')
        .map(function (x, index) {
            return {
                name: x.name,
                signatureCount: x.signature_count,
                position: index
            }
        })
        .map(function (x) {
            if (lastLeaders) {
                x.lastPosition = _.findIndex(lastLeaders, {name: x.name})
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
        .value();

    lastLeaders = leaders

    leaderBoardView.leaders = leaders
}

window.petitionPinger.signatures$.subscribe(update)
