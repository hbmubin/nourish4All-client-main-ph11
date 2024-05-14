import { useContext, useState } from "react";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const food = useLoaderData();
  const [request, setRequest] = useState(null);

  const handleRequest = (e) => {
    const form = e.target;
    const additionalNotes = form.additionalNotes.value;
    const foodStatus = "unavailable";
    const requestedFood = { additionalNotes, foodStatus };
    fetch(`http://localhost:5000/request/${food._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Successfully Requested",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setRequest(true);
        }
      });
  };
  return (
    <div>
      <section className="dark:bg-amber-100 dark:text-gray-800">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group cursor-default lg:grid lg:grid-cols-12 bg-amber-200"
          >
            <img
              src="https://source.unsplash.com/random/480x360"
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 lg:col-span-5 ">
              <h3 className="text-2xl font-semibold sm:text-4xl">
                {food.foodName}
              </h3>
              <span className=" dark:text-gray-600 font-semibold">
                Quantity : {food.foodQuantity}
              </span>
              <p className="my-6 dark:text-gray-700 font-semibold">
                Expired Date : {food.expiredDateTime}
              </p>
              <div>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                  className="btn px-16 bg-amber-500"
                  {...(request ? { disabled: true } : {})}
                >
                  {request ? "Requested" : "Request"}
                </button>
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box max-h-screen bg-amber-200 border-4">
                    <h3 className="font-bold text-lg">Are you sure!</h3>
                    <div className="modal-action mt-3">
                      <form
                        onSubmit={handleRequest}
                        className=" w-full"
                        method="dialog"
                      >
                        <div className=" flex flex-col font-semibold">
                          <div className="border-2 w-[50%] mb-4">
                            <img
                              className=""
                              src="https://source.unsplash.com/random/480x360"
                            />
                          </div>
                          <div className="text-2xl font-semibold">
                            {food.foodName}
                          </div>
                          <div className="flex items-center mb-1">
                            <span>
                              <MdProductionQuantityLimits />
                            </span>
                            <div className="ml-1">
                              Quantity : {food.foodQuantity}
                            </div>
                          </div>
                          <div className="flex items-center mb-1">
                            <span>
                              <CiLocationOn />
                            </span>
                            <div className="ml-1">
                              Pickup Location : {food.pickupLocation}
                            </div>
                          </div>
                          <div className="flex items-center mb-3">
                            <span>
                              <CiCalendarDate />
                            </span>
                            <div className="ml-1">
                              Expired Date : {food.expiredDateTime}
                            </div>
                          </div>
                          <div className="flex gap-2 p-2 text-sm  bg-amber-100 mt-2">
                            <div>
                              <div className="font-semibold text-neutral-700">
                                Donor
                              </div>
                              <div className=" ">
                                <div>{food.donor.name}</div>
                                <div>{food.donor.email}</div>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-neutral-700">
                                Benefactor
                              </div>

                              <div className=" ">
                                <div>{user.displayName}</div>
                                <div>{user.email}</div>
                              </div>
                            </div>
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Additional Notes
                              </span>
                            </label>
                            <textarea
                              name="additionalNotes"
                              className="textarea textarea-bordered"
                              defaultValue={food.additionalNotes}
                            ></textarea>
                          </div>
                        </div>
                        <button className="btn bg-amber-400 hover:bg-amber-500 w-full mt-2">
                          Confirm
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default FoodDetails;
