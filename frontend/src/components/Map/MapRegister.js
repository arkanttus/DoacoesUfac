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
      marker: null
    };
  }

  componentDidMount() {
    const self = this;
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on("results", function(data) {
      results.clearLayers();
      //console.log(data);
      const marker = data.results[0];

      if (marker) self.addMarker(marker);
    });

    map.once("locationfound", function(ev) {
      self.addMarker(ev);
    });
  }

  addMarker = e => {
    this.setState({ marker: e.latlng });
  };

  handleClose = () => {
    this.setState({ marker: null });
  };

  render() {
    const center = [-9.973879999999951, -67.80755999999997];
    const marker = this.state.marker;
    const {classes} = this.props
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
        className={classes.mapa}
        center={center}
        zoom="12"
        minZoom="4"
        maxZoom="19"
        ref={m => {
          this.leafletMap = m;
        }}
        onClick={this.addMarker}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        <LocateControl options={locateOptions} on={true} />

        <div className="pointer" />
        {marker && <Marker position={marker} onClick={this.handleClose} />}
      </Map>
    );
  }
}

export default withStyles(myStyles)(MapComp);