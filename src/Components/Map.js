import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrentPlace from "./CurrentPlace.js";
import Marker from "./Marker.js";
import "./Map.css";

export default class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				lat: 48.886202,
				lng: 2.361252
			}
		};
	}

	componentDidMount() {
		this.getLocation();
	}

	getLocation() {
		if (navigator.geolocation) {
			const that = this;
			navigator.geolocation.getCurrentPosition(position => {
				const center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				that.setState({ location: center });
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	handleMapClick = e => {
		let lat = e.lat;
		let lng = e.lng;

		let geocoder = new window.google.maps.Geocoder();
		console.log(geocoder);
		let latlng = { lat, lng };
		geocoder.geocode({ location: latlng }, (results, status) => {
			if (status === "OK") {
				this.props.getLatLng(lat, lng, results[0].formatted_address);
			}
		});
	};

	apiLoaded(map, maps) {
		this.props.apiLoadedCallback(map, maps, this.state.location);
	}

	render() {
		return (
			<div
				className="map-container col-12 col-lg-8 p-0 order-1 order-lg-2"
				title="add restaurant"
				/* data-toggle="collapse"
				href="#collapseForm"
				role="button"
				aria-expanded="false"
				aria-controls="collapseForm" */
			>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: "AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo",
						libraries: "places"
					}}
					center={this.state.location}
					zoom={13}
					onClick={this.handleMapClick}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => {
						this.apiLoaded(map, maps);
					}}
				>
					{this.props.restaurants.map(restaurant => (
						<Marker
							key={restaurant.name}
							lat={restaurant.lat}
							lng={restaurant.long}
							restaurant={restaurant}
							handleClick={this.props.handleClick}
						/>
					))}
					<CurrentPlace
						lat={this.state.location.lat}
						lng={this.state.location.lng}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}
