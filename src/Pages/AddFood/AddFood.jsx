import { useContext, useState } from "react";
import "../AddFood/addFood.css";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    return formattedDate;
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDate(selectedDate);
  };

  const donorInformation = {
    donatorImage: user.photoURL,
    name: user.displayName,
    email: user.email,
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodPhoto.value;
    const foodQuantity = form.quantity.value;
    const pickupLocation = form.location.value;
    const expiredDateTime = formatDate(date);
    const additionalNotes = form.notes.value;
    const foodStatus = form.foodStatus.value;
    const donor = donorInformation;
    const newFood = {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expiredDateTime,
      additionalNotes,
      foodStatus,
      donor,
    };
    fetch("http://localhost:5000/foods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Added new Food",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    console.log(newFood);
  };

  return (
    <div className="hero min-h-[80vh] bg-amber-100">
      <Helmet>
        <title>Add Food || Nourish4All</title>
      </Helmet>
      <div className="p-6 bg-amber-200">
        <h2 className="text-center text-4xl font-semibold mb-6">Add Food</h2>
        <form onSubmit={handleAddFood} className="md:flex gap-8">
          <div>
            <div className="form-control  lg:w-96">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                type="text"
                placeholder="Food Name"
                name="foodName"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control  lg:w-96">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="foodPhoto"
                placeholder="Photo URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control  lg:w-96">
              <label className="label">
                <span className="label-text">Pickup Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Pickup Location"
                className="input input-bordered"
                required
              />
            </div>
            <div className=" lg:w-96 flex gap-6 items-center">
              <div className="form-control w-44 ">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Expire Date</span>
                </label>
                <input
                  type="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  name="date"
                />

                <div className="w-12"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="form-control lg:w-96">
              <label className="label">
                <span className="label-text">Additional Notes</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Notes"
                name="notes"
              ></textarea>
            </div>
            <div className="mt-2 lg:w-96">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <div className=" flex ml-2 items-center">
                <div className=" flex gap-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      value="available"
                      name="foodStatus"
                      className="radio radio-xs outline"
                      defaultChecked
                    />
                    <label className="label">
                      <span className="label-text">Available</span>
                    </label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      value="unavailable"
                      name="foodStatus"
                      className="radio radio-xs outline"
                      disabled
                    />
                    <label className="label">
                      <span className="label-text">Unavailable</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-2">Donor information</div>
            <div className="flex items-center p-4 w-full bg-base-200 gap-6">
              <div className="w-12">
                <img className="avatar" src={user.photoURL} />
              </div>
              <div>
                <div>{user.displayName}</div>
                <div>{user.email}</div>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-amber-500 hover:bg-amber-600">
                Add Food
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
