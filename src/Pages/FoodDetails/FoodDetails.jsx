import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useLoaderData } from "react-router-dom";

const FoodDetails = () => {
  const food = useLoaderData();
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
              alt=""
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
                >
                  Request
                </button>
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box bg-amber-200 border-4">
                    <h3 className="font-bold text-lg">Are you sure!</h3>
                    <div className="modal-action">
                      <form className=" w-full" method="dialog">
                        <div className="p-4 flex flex-col font-semibold">
                          <div className="text-2xl font-semibold">
                            {food.foodName}
                          </div>
                          <p className="text-stone-600  mb-3">
                            {food.additionalNotes}
                          </p>

                          <div className="flex items-center mb-1">
                            <span>
                              <MdProductionQuantityLimits />
                            </span>
                            <div className="ml-1">
                              {" "}
                              Quantity : {food.foodQuantity}
                            </div>
                          </div>
                          <div className="flex items-center mb-1">
                            <span>
                              <CiLocationOn />
                            </span>
                            <div className="ml-1">
                              {" "}
                              Pickup Location : {food.pickupLocation}
                            </div>
                          </div>
                          <div className="flex items-center mb-3">
                            <span>
                              <CiCalendarDate />
                            </span>
                            <div className="ml-1">
                              {" "}
                              Expired Date : {food.expiredDateTime}
                            </div>
                          </div>
                          <div className=" ">
                            <div className="font-semibold text-neutral-700">
                              Donor
                            </div>
                            <div className="flex justify-between items-center ">
                              <div className=" bg-amber-200 py-2 px-2  ">
                                <div>{food.donor.name}</div>
                                <div>{food.donor.email}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="btn w-full">Confirm</button>
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
