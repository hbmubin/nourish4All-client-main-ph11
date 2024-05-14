import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const { user, loading } = useContext(AuthContext);
  const food = useLoaderData();
  if (loading) {
    return (
      <div className="min-h-[80vh] text-center">
        <span className="loading loading-ring w-28"></span>
      </div>
    );
  }

  const handleUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodPhoto.value;
    const foodQuantity = form.quantity.value;
    const pickupLocation = form.location.value;
    const expiredDateTime = form.date.value;
    const additionalNotes = form.notes.value;
    const updatedFood = {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expiredDateTime,
      additionalNotes,
    };
    fetch(`http://localhost:5000/food/${food._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Successfully Updated",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  return (
    <div className="hero min-h-[80vh] bg-amber-100">
      <div className="p-6 bg-amber-200">
        <h2 className="text-center text-4xl font-semibold mb-6">Update Food</h2>
        <form onSubmit={handleUpdateFood} className="flex gap-8">
          <div>
            <div className="form-control  w-96">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                type="text"
                defaultValue={food.foodName}
                name="foodName"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control  w-96">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="foodPhoto"
                defaultValue={food.foodImage}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control  w-96">
              <label className="label">
                <span className="label-text">Pickup Location</span>
              </label>
              <input
                type="text"
                name="location"
                defaultValue={food.pickupLocation}
                className="input input-bordered"
                required
              />
            </div>
            <div className=" w-96 flex gap-6 items-center">
              <div className="form-control w-44 ">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={food.foodQuantity}
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
                  defaultValue={food.expiredDateTime.split("T")[0]}
                  name="date"
                />

                <div className="w-12"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="form-control w-96">
              <label className="label">
                <span className="label-text">Additional Notes</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                defaultValue={food.additionalNotes}
                name="notes"
              ></textarea>
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
                Update Food
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
