// global variables
var key = 'AIzaSyBQuVmUSMvXSooCt0trsurxhelMeWGVeZE',
  lat = 40.7617653,
  lng = -73.3292857

// form
var locationForm = document.getElementById('location-form')
locationForm.addEventListener('submit', geocode)
// fires when the page load to display default city Deer Park NY
window.onload = geocode

function geocode(e) {
  e.preventDefault()
  var location =
    document.getElementById('location-input').value || 'Deer Park NY'
  axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: key
      }
    })
    .then(response => {
      console.log(response)

      // formatted address
      var formattedAddress = response.data.results[0].formatted_address
      var formattedAddressOutput = `<ul class='list-group'><li class='list-group-item'>${formattedAddress}</li></ul>`
      document.getElementById(
        'formatted-address'
      ).innerHTML = formattedAddressOutput

      //geometry output
      lat = response.data.results[0].geometry.location.lat
      lng = response.data.results[0].geometry.location.lng
      var geometryOutput = `<ul class='list-group'>
              <li class='list-group-item'>latitude: ${lat}</li>
              <li class='list-group-item'>longitude: ${lng}</li>
            </ul>`
      document.getElementById('geometry').innerHTML = geometryOutput
      initMap(lat, lng)
    })
    .catch(err => console.log(err))
}

function initMap(lat, lng) {
  var options = {
    zoom: 12,
    center: { lat, lng }
  }
  var map = new google.maps.Map(document.getElementById('map'), options)
  var marker = new google.maps.Marker({
    position: {
      lat,
      lng
    },
    map,
    // custom icon
    icon:
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  })
}
