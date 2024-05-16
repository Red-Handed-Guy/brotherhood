const tableBodyElement = document.querySelector('.table__body')

const tableRowTemplate = document.querySelector('.table__row-template').content

const getData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (response.ok) {
    return await response.json()
  } else {
    return Promise.reject(response)
  }
}

getData().then(data => {
  data.forEach(item => {
    const tableRowElement = tableRowTemplate
      .querySelector('.table__row')
      .cloneNode(true)

    tableRowElement.querySelector('.table__data_type_id').textContent = item.id
    tableRowElement.querySelector('.table__data_type_user-id').textContent =
      item.userId
    tableRowElement.querySelector('.table__data_type_title').textContent =
      item.title
    tableRowElement.querySelector('.table__data_type_body').textContent =
      item.body
      
    tableBodyElement.append(tableRowElement)
  })
})
