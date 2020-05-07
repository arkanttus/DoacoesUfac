import React, { Component } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import LocateControl from "./Locate";
import { RedMarker, BlueMarker } from "./MarkersColors";
import { withStyles } from "@material-ui/core";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

const myStyles = {
  mapa: {
    width: "80%",
    height: "70vh",
    zIndex: "100",
    left: "10%"
  }
}

class MapComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      myPosition: null,
      circlePosition: null,
      nextInstitutions: [],
      activePopup: null
    };

    this.map = null;
    this.radius = 2000;
  }

  componentDidMount() {
    this.map = this.leafletMap.leafletElement;
    const map = this.map;
    const self = this;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on("results", function(data) {
      results.clearLayers();
      //console.log(data);
      const marker = data.results[0];

      if (marker) self.addMyPosition(marker);
    });

    map.on("locationfound", function(ev) {
      self.addMyPosition(ev);
    });

    const markers = [
      {
        id: 1,
        name: "ABC",
        latlng: {
          lat: -9.96403208832135,
          lng: -67.82675743103029
        }
      },
      {
        id: 2,
        name: "BBBB",
        latlng: {
          lat: -9.9627640448494,
          lng: -67.8948211669922
        }
      },
      {
        id: 3,
        name: "CCC",
        latlng: {
          lat: -9.981361521399743,
          lng: -67.81946182250978
        }
      }
    ];

    markers.forEach(m => {
      self.addMarker(m);
    });
  }

  addMyPosition = e => {
    const position = e.latlng;

    this.clearMyPosition();

    this.setState({ myPosition: position });

    this.selectPoints(position.lat, position.lng);
    this.drawerCircle(position, this.radius);
  };

  clearMyPosition = () => {
    const circlePosition = this.state.circlePosition;

    if (circlePosition) this.map.removeLayer(circlePosition);

    this.setState({ myPosition: null, circlePosition: null });
  };

  addMarker = e => {
    const markers = this.state.markers;
    markers.push(e);
    this.setState({ markers });
  };

  selectPoints = (lat, lng) => {
    const radius = this.radius;
    const current_position = L.latLng(lat, lng);

    this.state.markers.forEach(m => {
      const ponto_atual = [m.latlng.lat, m.latlng.lng];
      const distancia = current_position.distanceTo(ponto_atual);

      m.inRadius = distancia <= radius;
    });
  };

  drawerCircle = (currentPosition, radius) => {
    const circlePosition = L.circle(currentPosition, radius, {
      /// Number is in Meters
      color: "#136aec",
      fillOpacity: 0.2,
      fillColor: "#136aec",
      opacity: 1,
      weight: 0
    }).addTo(this.map);

    this.setState({ circlePosition });
  };

  handleActivePopup = mark => {
    this.setState({ activePopup: mark });
  };

  handleClosePop;

  render() {
    const center = [-9.973879999999951, -67.80755999999997];
    const markers = this.state.markers;
    const myPosition = this.state.myPosition;
    const activePopup = this.state.activePopup;
    const {classes} = this.props
    const locateOptions = {
      showPopup: false,
      position: "topleft",
      strings: {
        title: "Mostre-me onde estou!"
      },
      drawCircle: false,
      onActivate: () => {} // callback before engine starts retrieving locations
    };

    return (
      <Map
        className={classes.mapa}
        center={center}
        zoom="11"
        ref={m => {
          this.leafletMap = m;
        }}
        onClick={this.addMyPosition}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        <LocateControl options={locateOptions} on={myPosition ? false : true} />

        <div className="pointer" />

        {myPosition && (
          <CircleMarker
            center={myPosition}
            radius={9}
            color="white"
            fillColor="#2A93EE"
            fillOpacity={1}
            opacity={1}
            onClick={this.clearMyPosition}
          />
        )}

        {markers.map(m => (
          <Marker
            position={m.latlng}
            key={m.id}
            icon={m.inRadius ? RedMarker : BlueMarker}
          >
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default withStyles(myStyles)(MapComp);
