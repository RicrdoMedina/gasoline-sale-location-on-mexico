import API from './API'
import flagMexico from '../../images/mexico.png'

export default class Ui {
  constructor () {
    this.api = new API
    this.initMap()
  }

  initMap () {
    let latLng = {lat: 19.390519, lng: -99.3739778}
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 5
    })
    this.displayFlagCountry()
  }

  displayFlagCountry () {
    let imgFlag = document.createElement('img')
    let boxImgFlag = document.getElementById('boxFlag')
    if (boxImgFlag.childElementCount === 0) {
      imgFlag.src = flagMexico

      imgFlag.className = 'flag-country'

      imgFlag.alt = 'Mexico'

      imgFlag.width = '40'

      boxImgFlag.appendChild(imgFlag)
    }
  }

  showData () {
    this.api.getData()
              .then(data => {
                const res = data.res.results
                this.showMap(res)
              })
  }

  showMap (datos) {

    let infoWindowActive;

    datos.forEach(dato => {
      let { latitude, longitude, calle, regular, premium } = dato;

      let latLng = {
        lat: Number( latitude ),
        lng: Number( longitude )
      }

      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      })

      let infoWindow = this.createInfoWindow(calle, regular, premium)

      marker.addListener('click', () => {

        if (infoWindowActive) {
          infoWindowActive.close()
        }

        infoWindow.open(this.mapa, marker)

        infoWindowActive = infoWindow
      })
    })
  }

  createInfoWindow (calle, regular, premium) {

    let contentInfo = `
    <p> Domicilio: ${calle} </p>
    <p> Precio Regular: $${regular} </p>
    <p> Precio Premium: $${premium} </p>
    `

    let infoWindow = new google.maps.InfoWindow({
      content: contentInfo
    })

    return infoWindow
  }

  search (search) {
    this.api.getData()
              .then(data => {
                const res = data.res.results
                this.filterResult(res, search)
              })
  }

  filterResult (res, search) {
    let results = res.filter(function (obj) {
      let r = obj.calle.toUpperCase().indexOf(search.toUpperCase()) !== -1
      // console.log(r)
      return r
    })
    this.initMap()
    this.showMap(results)
  }
}
