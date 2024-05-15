import { MdProductionQuantityLimits } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import "../Food/food.css";
import { motion } from "framer-motion";

const Food = ({ food }) => {
  const {
    _id,
    foodImage,
    foodQuantity,
    pickupLocation,
    donor,
    expiredDateTime,
    additionalNotes,
    foodName,
  } = food;
  const { donatorImage, name } = donor;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 1 }}
      className="shadow-sm border-[1px] flex flex-col bg-amber-300"
    >
      <div className="">
        <img src={foodImage} />
      </div>
      <div className="p-4 flex-grow flex flex-col font-semibold">
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
        <div className=" flex flex-col justify-end flex-grow">
          <div className="font-semibold text-neutral-700">Donor</div>
          <div className="flex  justify-between items-center ">
            <div className="flex items-center gap-4 bg-amber-200 py-2 px-4  ">
              <div className=" w-16">
                <img className="avatar" src={donatorImage} />
              </div>
              <div>{name}</div>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to={`/food/${_id}`}
                className="btn bg-amber-700 border-none text-white"
              >
                Show Details
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Food;
