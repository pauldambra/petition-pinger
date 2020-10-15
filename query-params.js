const defaultUrl = 'https://petition.parliament.uk/petitions/269157.json'

const getDefaultValueFor = needle => needle === 'petition' ? defaultUrl : '';

window.petitionPinger.getValueFromURL = (needle) => {
    if (URLSearchParams) {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get(needle) || getDefaultValueFor(needle)
    } else {
        const url = window.location.href
        needle = needle.replace(/[\[\]]/g, '\\$&')
        const regex = new RegExp('[?&]' + needle + '(=([^&#]*)|&|#|$)')
        const results = regex.exec(url)
        return !results || !results[2]
            ? getDefaultValueFor(needle)
            : decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
}