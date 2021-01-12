import React, { Component } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer, Marker } from "react-leaflet";
import LocateControl from "./Locate";
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
    width: "90%",
    height: "65%",
    zIndex: "100",
    position: "absolute"
  }
}


class MapComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marker: this.props.marker,
      showCurrent: false
    };

    this.handleCoordinates = this.props.handleCoordinates
    this.setMarker = this.props.setMarker
  }

  componentDidMount() {
    const self = this;
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on("results", function(data) {
      results.clearLayers();
      const marker = data.results[0];

      if (marker) self.addMarker(marker);
    });

    map.on("locationfound", function(ev) {
      self.setState({ showCurrent: true });
      self.addMarker(ev);
    });
  }

  addMarker = e => {
    const marker = e.latlng
    this.setState({ marker });
    this.setMarker(marker)
    this.handleCoordinates(marker.lat, marker.lng)
  };

  clickMapa = e => {
    this.setState({ showCurrent: false });
    this.addMarker(e);
  };

  handleClose = () => {
    this.setMarker(null)
    this.setState({ marker: null });
    this.handleCoordinates('', '')
  };

  render() {
    //const {handleCoordinates} = this.props
    const center = this.props.center ? this.props.center : [-9.973879999999951, -67.80755999999997];
    const institution = this.props.institution ? this.props.institution : null
    const marker = this.state.marker ? this.state.marker : institution;
    const showCurrent = this.state.showCurrent;
    const {classes} = this.props
    const {styles} = this.props
    const locateOptions = {
      showPopup: false,
      position: "topleft",
      strings: {
        title: "Mostre-me onde estou!"
      },
      onActivate: () => {} // callback before engine starts retrieving locations
    };

    return (
      <Map
        className={styles ? styles : classes.mapa}
        center={center}
        zoom="12"
        minZoom="4"
        maxZoom="19"
        ref={m => {
          this.leafletMap = m;
        }}
        onClick={this.clickMapa}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        <LocateControl options={locateOptions} on={showCurrent} />

        <div className="pointer" />
        {marker && <Marker position={marker} onClick={this.handleClose} />}
      </Map>
    );
  }
}

export default withStyles(myStyles)(MapComp);