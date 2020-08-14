const expect = require('chai').expect

function paginate(data, pageSize, currentPage) {
    const firstItem = (currentPage - 1) * pageSize
    const lastItem = currentPage * pageSize
    return data.slice(firstItem, lastItem);
}

describe("paging through some data", () => {
    it("can page a single page from 2 items", () => {
        const data = [0, 1]
        const pageSize = 5
        const currentPage = 1
        const page = paginate(data, pageSize, currentPage)
        expect(page).to.eql([0, 1])
    })

    it("can page a single page from 6 items", () => {
        const data = [0, 1, 2, 3, 4, 5]
        const pageSize = 5
        const currentPage = 1
        const page = paginate(data, pageSize, currentPage)
        expect(page).to.eql([0, 1, 2, 3, 4])
    })

    it("can page a second page from 6 items", () => {
        const data = [0, 1, 2, 3, 4, 5]
        const pageSize = 5
        const currentPage = 2
        const page = paginate(data, pageSize, currentPage)
        expect(page).to.eql([5])
    })
})