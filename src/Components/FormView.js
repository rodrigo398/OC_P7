import React, { Component } from "react";
import RestaurantItem from "./RestaurantItem.js";
import StarRatingComponent from "react-star-rating-component";
import "./FormView.css";

export default class FormView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 3
		};
	}
	handleSubmit = e => {
		e.preventDefault();
		/* 		console.log(e.target.elements.rating.value); */
		const newRestaurant = {
			restaurantName: e.target.elements.name.value,
			description: e.target.elements.description.value,
			address: `${e.target.elements.address.value}, ${e.target.elements.postalCode.value}`,
			lat: e.target.elements.latitude.value,
			long: e.target.elements.longitude.value,
			ratings: [
				{
					stars: e.target.elements.rating.value,
					comment: e.target.elements.comments.value
				}
			]
		};
		let addNewRestaurant = new RestaurantItem(newRestaurant);
		this.calcAverageRating(addNewRestaurant);
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

	render() {
		return (
			<div>
				<p className="d-flex justify-content-end">
					<i
						className="fas fa-plus"
						title="add restaurant"
						data-toggle="collapse"
						href="#collapseForm"
						role="button"
						aria-expanded="false"
						aria-controls="collapseForm"
					></i>
				</p>
				<div className="collapse" id="collapseForm">
					<form onSubmit={e => this.handleSubmit(e)} name="add-restaurant-form">
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
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="address"
									placeholder="Address"
									required
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="postalCode"
									placeholder={"Postal code"}
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
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="longitude"
									placeholder="Longitude"
									required
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
							{/* <div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="latitude"
									placeholder="Latitude"
								/>
							</div>
							<div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="longitude"
									placeholder="Longitude"
								/>
							</div> */}
							<div className="col-12 text-center">
								<button className="btn btn-form rounded">Add</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
