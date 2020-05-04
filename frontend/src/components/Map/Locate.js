import React, { Component } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

class LocateControl extends Component {
  constructor(props) {
    super(props);

    this.lc = null;
  }
  
  componentDidMount() {
    const { options, startDirectly, on } = this.props;
    const { map } = this.props.leaflet;

    this.lc = new Locate(options);

    const lc = this.lc;

    lc.addTo(map);

    if (startDirectly && on) lc.start();
  }

  render() {
    const { on } = this.props;

    if (!on) this.lc.stop();

    return null;
  }
}

export default withLeaflet(LocateControl);