const tableBodyElement = document.querySelector('.table__body')

const tableRowTemplate = document.querySelector('.table__row-template').content
const tableInputFilter = document.querySelector('.table-input-fiter')

const getData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (response.ok) {
    return await response.json()
  } else {
    return Promise.reject(response)
  }
}

getData().then(data => {
  const table = new TableController(data)
  table.renderTable()
  table.listen()
})



class TableController {
  constructor(data) {
    this.data = data
    this.sortedData = data
    this.sortedAndFilteredData = data
    this.filterValue = ''
    this.tableBodyElement = document.querySelector('.table__body')
    this.tableRowTemplate = document.querySelector(
      '.table__row-template',
    ).content
    this.tableInputFilter = document.querySelector('.table-input-fiter')
    this.tableHeaders = document.querySelectorAll('.table__head')
  }

  _setFilter(e) {
    this.filterValue = e.target.value.toLowerCase()
    this.renderTable()
  }

  _filterData = () => {
    if (this.filterValue.length >= 3) {
      this.sortedAndFilteredData = this.sortedData.filter(item => {
        return (
          item.title.toLowerCase().includes(this.filterValue) ||
          item.body.toLowerCase().includes(this.filterValue)
        )
      })
    } else {
      this.sortedAndFilteredData = this.sortedData
    }
  }

  renderTable() {
    this.tableBodyElement.innerHTML = ''
    this._filterData()
    this.sortedAndFilteredData.forEach(item => {
      const tableRowElement = this.tableRowTemplate
        .querySelector('.table__row')
        .cloneNode(true)

      tableRowElement.querySelector('.table__data_type_id').textContent =
        item.id
      tableRowElement.querySelector('.table__data_type_user-id').textContent =
        item.userId
      tableRowElement.querySelector('.table__data_type_title').textContent =
        item.title
      tableRowElement.querySelector('.table__data_type_body').textContent =
        item.body
      this.tableBodyElement.append(tableRowElement)
    })
  }

  _setListeners() {
    this.tableInputFilter.addEventListener('input', e => this._setFilter(e))

    this.tableHeaders.forEach(tableHeader => {
      tableHeader.addEventListener('click', e => {
        this.tableHeaders.forEach(th => {
          if (th !== e.target) {
            th.textContent = th.id
          }
        })

        if (e.target.textContent.includes('↓')) {
          e.target.textContent = e.target.id + ' ↑'
          this.sortedData = this.data.toSorted((a, b) => {
            if (a[e.target.id] < b[e.target.id]) {
              return 1
            }
            if (a[e.target.id] > b[e.target.id]) {
              return -1
            }
            return 0
          })
        } else {
          e.target.textContent = e.target.id + ' ↓'
          this.sortedData = this.data.toSorted((a, b) => {
            if (a[e.target.id] > b[e.target.id]) {
              return 1
            }
            if (a[e.target.id] < b[e.target.id]) {
              return -1
            }
            return 0
          })
        }
        this.renderTable()
      })
    })
  }

  listen() {
    this._setListeners()
  }
}
