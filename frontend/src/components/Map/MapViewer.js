import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { withStyles } from "@material-ui/core";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

const myStyles = ((theme) => ({
  mapa: {
    zIndex: "100",
    width: '600px', 
    height: '350px',
    [theme.breakpoints.down('sm')]: {
        width: '97%', 
    }
  }
}))

class MapViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marker: null,
      popup: null
    };
  }

  componentDidMount() {
    const self = this;

    self.addMarker(self.props.institution);
  }

  addMarker = e => {
    const { latitude, longitude, ...popup } = e;
    const marker = { lat: latitude, lng: longitude };
    this.setState({ marker, popup });
  };

  render() {
    const { marker, popup } = this.state;
    const { classes } = this.props;

    console.log(marker);
    return (
      <Map
        className={classes.mapa}
        center={marker}
        zoom="15"
        minZoom="12"
        maxZoom="18"
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        <div className="pointer" />
        {marker && (
          <Marker position={marker}>
            <Popup>{popup.name}</Popup>
          </Marker>
        )}
      </Map>
    );
  }
}

export default withStyles(myStyles)(MapViewer);
