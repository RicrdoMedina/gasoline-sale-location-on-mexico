import '../css/main.css'
import API from './class/API'
import UI from './class/UI'

console.log('ready')

const view = new UI
const api = new API

document.addEventListener('DOMContentLoaded', () => {
  view.showData()
})

const search = document.getElementById('search')

search.addEventListener('input', () => {
  if (search.value.length > 3) {
    view.search(search.value)
  } else if (search.value.length === 0) {
    view.initMap()
    view.showData()
  }
})
