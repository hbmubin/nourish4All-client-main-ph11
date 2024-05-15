import { useContext, useEffect, useState } from "react";
import Food from "../../Components/Food/Food";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const AvailableFoods = () => {
  const { loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [rowStatus, setRowStatus] = useState(3);
  const [sortBy, setSortBy] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `${
        sortBy == false
          ? "https://nourisg4all-server-assign-11.vercel.app/foods"
          : "https://nourisg4all-server-assign-11.vercel.app/foods-sortby"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const available = data.filter((food) => {
          if (food.foodStatus == "available") {
            return food;
          }
        });
        setFoods(available);
      });
  }, [sortBy]);

  if (loading) {
    return (
      <div className="min-h-[80vh] text-center">
        <span className="loading loading-ring w-28"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Available Food || Nourish4All</title>
      </Helmet>
      <div className="text-center">
        <h2 className="text-3xl font-semibold">All available foods</h2>
      </div>

      <div className="flex justify-between items-center mb-4 lg:mt-0 mt-6">
        <div className=" ">
          <h2 className="font-semibold ml-3">Sort by</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSortBy(!sortBy)}
            className="btn"
          >
            Expire date
          </motion.button>
        </div>
        <div className="flex justify-center">
          <label className="input w-64 input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className=" lg:block hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: 90 }}
            onClick={() => setRowStatus(2)}
            className={`rotate-90 p-3 ${rowStatus == 2 && "bg-amber-500"}`}
          >
            <HiOutlineMenuAlt4 size={30} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: 90 }}
            onClick={() => setRowStatus(3)}
            className={`rotate-90 p-3 ${rowStatus == 3 && "bg-amber-500"}`}
          >
            <HiMenu size={30} />
          </motion.button>
        </div>
      </div>
      <div
        className={`grid md:grid-cols-2 mb-10 ${
          rowStatus == 3 ? "lg:grid-cols-3  gap-6" : "lg:grid-cols-2  gap-12"
        }`}
      >
        {foods
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.foodName.toLowerCase().includes(search);
          })
          .map((food) => (
            <Food food={food} key={food._id}></Food>
          ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
