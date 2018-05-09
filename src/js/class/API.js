export default class API {
  async getData () {
    const data = await fetch('https://api.datos.gob.mx/v1/precio.gasolina.publico')

    const res = await data.json()

    return {
      res
    }
  }
}
