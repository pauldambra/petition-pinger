const expect = require('chai').expect

function paginate(data, pageSize, currentPage) {
    const firstItem = (currentPage - 1) * pageSize
    const lastItem = currentPage * pageSize
    return data.slice(firstItem, lastItem);
}

function countPages(data, pageSize) {
    return Math.ceil(data.length / pageSize);
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

    it("says 0 pages for 0 items", () => {
        const data = []
        const pageSize = 5
        const count = countPages(data, pageSize)
        expect(count).to.eql(0)
    })

    it("says 1 pages for 1 item", () => {
        const data = [0]
        const pageSize = 5
        const count = countPages(data, pageSize)
        expect(count).to.eql(1)
    })

    it("says 1 pages for 4 items when pagesize is 5", () => {
        const data = [0, 1, 2, 3]
        const pageSize = 5
        const count = countPages(data, pageSize)
        expect(count).to.eql(1)
    })

    it("says 2 pages for 4 items when pagesize is 3", () => {
        const data = [0, 1, 2, 3]
        const pageSize = 3
        const count = countPages(data, pageSize)
        expect(count).to.eql(2)
    })

    it("says 7 pages for 13 items when pagesize is 2", () => {
        const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const pageSize = 2
        const count = countPages(data, pageSize)
        expect(count).to.eql(7)
    })
})