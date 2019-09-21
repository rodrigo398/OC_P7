import React, { Component } from "react";
import RestaurantItem from "./RestaurantItem.js";
import StarRatingComponent from "react-star-rating-component";
import "./RestaurantForm.css";

export default class RestaurantForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 3,
			isClicked: false,
			toggleBtn: true
		};
	}
	handleSubmit = e => {
		e.preventDefault();

		const newRestaurant = {
			restaurantName: e.target.elements.name.value,
			description: e.target.elements.description.value,
			address: `${e.target.elements.address.value}, ${e.target.elements.postalCode.value}`,
			lat: Number(e.target.elements.latitude.value),
			long: Number(e.target.elements.longitude.value),
			ratings: Number(e.target.elements.rating.value)
			/* place_id: null */
			/* ratings: [
				{
					stars: e.target.elements.rating.value,
					comment: e.target.elements.comments.value
				}
			] */
		};
		let addNewRestaurant = new RestaurantItem(newRestaurant);
		addNewRestaurant.reviews = [
			{
				text: e.target.elements.comments.value,
				rating: e.target.elements.rating.value
			}
		];
		/* this.calcAverageRating(addNewRestaurant); */
		this.props.handleSubmitForm(addNewRestaurant);
		let getForm = document.getElementsByName("add-restaurant-form");
		getForm[0].reset();
	};

	calcAverageRating(restaurant) {
		return restaurant.averageRating;
	}

	onStarClick = (nextValue, prevValue, name) => {
		this.setState({ rating: nextValue });
	};

	handleBtnIcon() {
		this.setState(prevState => {
			console.log(prevState);
			return {
				isClicked: !prevState.isClicked
			};
		});
	}

	/* 	checkRequiredInput() {
		let myForm = document.getElementById("restaurant-form");
		console.log(myForm);
		let form = myForm.elements;
		console.log(form);
	} */

	render() {
		return (
			<div>
				<p className="d-flex justify-content-end">
					<i
						onClick={() => this.handleBtnIcon()}
						className={this.state.isClicked ? "fas fa-minus" : "fas fa-plus"}
						title="add restaurant"
						data-toggle="collapse"
						href="#collapseForm"
						role="button"
						aria-expanded="false"
						aria-controls="collapseForm"
					></i>
				</p>
				<div className="collapse" id="collapseForm">
					<form
						onSubmit={e => this.handleSubmit(e)}
						name="add-restaurant-form"
						id="restaurant-form"
					>
						<div className="row">
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="name"
									placeholder="Restaurant name"
									required
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="description"
									placeholder="Description"
									required
								/>
							</div>
							<div className="col-12 mb-2">
								<input
									type="text"
									className="form-control"
									name="address"
									placeholder="Address"
									value={this.props.newRestaurantPosition.address}
									required
								/>
							</div>
							<div className="col-12 mb-2">
								<input
									type="text"
									className="form-control"
									name="postalCode"
									placeholder={"Postal code"}
									value={this.props.newRestaurantPosition.postalCode}
									required
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="latitude"
									placeholder="Latitude"
									required
									value={
										this.props.newRestaurantPosition.LatLngOnClick == null
											? ""
											: this.props.newRestaurantPosition.LatLngOnClick.lat
									}
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="longitude"
									placeholder="Longitude"
									required
									value={
										this.props.newRestaurantPosition.LatLngOnClick == null
											? ""
											: this.props.newRestaurantPosition.LatLngOnClick.lng
									}
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="comments"
									placeholder="Comments"
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<StarRatingComponent
									name="rating"
									starCount={5}
									value={this.state.rating}
									onStarClick={this.onStarClick}
								/>
							</div>
							<div className="col-12 text-center">
								{/* this.checkRequiredInput() */}
								{/* this.state.toggleBtn && (
									<button
										className="btn btn-form rounded"
										data-toggle="collapse"
										href="#collapseForm"
										role="button"
										aria-expanded="false"
										aria-controls="collapseForm"
										onClick={() => this.handleBtnIcon()}
									>
										Add
									</button>
								) */}
								{
									<button
										className="btn btn-form rounded"
										href="#collapseForm"
										role="button"
										aria-expanded="false"
										aria-controls="collapseForm"
										onClick={() => this.handleBtnIcon()}
									>
										Add
									</button>
								}
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
