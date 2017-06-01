<template>
  <div id="map-container"></div>
</template>

<style>
  #map-container {
    height: 300px;
    width:400px;
  }
</style>

<script>
  import BMap from 'BMap'

  export default {
    mounted () {
      var that = this
      const map = new BMap.Map('map-container')
      map.centerAndZoom('昆明', 14)
      map.enableScrollWheelZoom()
      map.enableContinuousZoom()
      var geoc = new BMap.Geocoder()
      map.addEventListener('click', function (e) {
        alert(e.point.lng + ',' + e.point.lat)
        that.$emit('getAddressCoordinate', e.point)
      })
      map.addEventListener('click', function (e) {
        var pt = e.point
        geoc.getLocation(pt, function (rs) {
          var addComp = rs.addressComponents
          that.$emit('getAddressLocation', addComp)
          alert(addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber)
        })
      })
      console.log(map)
    }
  }
</script>
