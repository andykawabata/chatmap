import  React, { useState, useEffect, useRef} from 'react';
import db from '../db';
import { GoogleMap, LoadScript} from '@react-google-maps/api'
import InfoWindowWithComments from './comments/InfoWindowWithComments';
import { useParams } from 'react-router-dom';
import Markers from './Markers.js'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import MobileCommentWindow from './mobileComments/MobileCommentWindow'

function Map(props){
  
  let { state, city } = useParams();
  const [location, setLocation] = useState({state: state, city: city})
  const [coordinates, setCoordinates] = useState(null)
  const [pois, setPois] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState({isSelected: false,
                                                        coordinates: null,
                                                        info: null})
  const [position, setPosition] = useState(null);
  const [screenWidth, setScreenWidth] = useState();
  const mapRef = useRef(null);

  useEffect(()=>{
    updatScreenWidth()
    window.addEventListener("resize", updatScreenWidth);
    fetch("https://maps.googleapis.com/maps/api/geocode/json?&address=" + city + "%20" + state + "&key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    .then(result => result.json())
    .then(json => {
      const latlng = extractCoordinates(json);
      const lat = latlng[0];
      const lng = latlng[1];
      setPosition({lat: lat, lng: lng})
      setCoordinates({lat: lat, lng: lng});
      getAndSetPois();
    })
  },[])

  function updatScreenWidth(){
    setScreenWidth(window.innerWidth)
  }

  function getAndSetPois(){
    let pois=[];
    db.firestore().collection("states").doc(location.state).collection("cities").doc(location.city).collection("pois").get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        pois.push({id: doc.id,
                   name: doc.data().name,
                   type: doc.data().type,
                   address: doc.data().address,
                   photo: doc.data().photo,
                   lat: parseFloat(doc.data().lat),
                   lng: parseFloat(doc.data().lng)})
        })
      setPois(pois);
    })
  }

  function extractCoordinates(jsonResponse){
     const location =  jsonResponse.results[0].geometry.location;
     const lat = location.lat;
     const lng = location.lng;
     return [lat, lng];
  }

  function handleLoad(map){
    mapRef.current = map;
    console.log(mapRef.current)
  }

  function handleCenter(){
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    console.log(newPos.lat != position.lat || newPos.lng != position.lng)
    if(newPos.lat != position.lat || newPos.lng != position.lng)
      setPosition(newPos);
  }

  const overlayStyles= {
    padding: '0', 
    margin: '0', 
    width: '100%', 
    height: '100%',
    padding: '8px'
  }
  const modalStyles={
    maxWidth:'none',
    width: '100%', 
    height: '100%',
    padding: '0'
  }

  const selectedAndScreenWide = (selectedMarker.isSelected === true) && screenWidth >= 600 
  const selectedAndMobile = (selectedMarker.isSelected === true) && screenWidth < 600 

  return( coordinates && 

    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          id='example-map'
          onLoad={handleLoad}
          onCenterChanged={handleCenter}
          mapContainerStyle={{
            height: '100%',
            width: '100%'}}
          center={position}
          zoom={12}
        >
          {pois && 
          <Markers pois={pois} setSelectedMarker={setSelectedMarker} />
          }
          {selectedAndScreenWide && 
            <InfoWindowWithComments location={location} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} user={props.user} />
          }
          {selectedAndMobile &&
            <Modal styles={{overlay: overlayStyles, modal: modalStyles,}} open={selectedAndMobile} onClose={()=>setSelectedMarker({isSelected:false,coordinates:null,info:null})}>
              <MobileCommentWindow location={location} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} user={props.user}/>
            </Modal>  
          }
        </GoogleMap>
      </LoadScript>
    </div>
)

}
export default Map;