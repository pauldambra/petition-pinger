const defaultUrl = 'https://petition.parliament.uk/petitions/269157.json'

window.petitionPinger.getPetitionFromURL = (needle) => {
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