import { MdProductionQuantityLimits } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";

const Food = ({ food }) => {
  const {
    _id,
    foodImage,
    foodQuantity,
    pickupLocation,
    donor,
    expiredDateTime,
    additionalNotes,
    foodStatus,
    foodName,
  } = food;
  const { donatorImage, name, email } = donor;

  console.log(food);
  console.log(donor);

  return (
    <div className="shadow-sm border-[1px] bg-amber-300">
      <div className="">
        <img src="https://i.ibb.co/DMmNXfs/rangamatijpeg.jpg" />
      </div>
      <div className="p-4 flex flex-col font-semibold">
        <div className="text-2xl font-semibold">{foodName}</div>
        <p className="text-stone-600  mb-3">{additionalNotes}</p>

        <div className="flex items-center mb-1">
          <span>
            <MdProductionQuantityLimits />
          </span>
          <div className="ml-1"> Quantity : {foodQuantity}</div>
        </div>
        <div className="flex items-center mb-1">
          <span>
            <CiLocationOn />
          </span>
          <div className="ml-1"> Pickup Location : {pickupLocation}</div>
        </div>
        <div className="flex items-center mb-3">
          <span>
            <CiCalendarDate />
          </span>
          <div className="ml-1"> Expired Date : {expiredDateTime}</div>
        </div>
        <div className=" ">
          <div className="font-semibold text-neutral-700">Donor</div>
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-4 bg-amber-200 py-2 px-4  ">
              <div className="avatar rounded-full w-16">
                <img src="https://i.ibb.co/DMmNXfs/rangamatijpeg.jpg" />
              </div>
              <div>{name}</div>
            </div>
            <div>
              <Link
                to={`/food-details/${_id}`}
                className="btn bg-amber-700 border-none text-white"
              >
                Show Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
