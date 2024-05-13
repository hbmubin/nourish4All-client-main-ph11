import { useContext, useEffect, useState } from "react";
import Food from "../../Components/Food/Food";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { AuthContext } from "../../Provider/AuthProvider";

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
          ? "http://localhost:5000/foods"
          : "http://localhost:5000/foods-sortby"
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
      <div className="text-center">
        <h2 className="text-3xl font-semibold">All available foods</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className=" ">
          <h2 className="font-semibold ml-3">Sort by</h2>
          <div onClick={() => setSortBy(!sortBy)} className="btn">
            Expire date
          </div>
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
        <div>
          <button
            onClick={() => setRowStatus(2)}
            className={`rotate-90 p-3 ${rowStatus == 2 && "bg-amber-500"}`}
          >
            <HiOutlineMenuAlt4 size={30} />
          </button>
          <button
            onClick={() => setRowStatus(3)}
            className={`rotate-90 p-3 ${rowStatus == 3 && "bg-amber-500"}`}
          >
            <HiMenu size={30} />
          </button>
        </div>
      </div>
      <div
        className={`grid mb-10 ${
          rowStatus == 3 ? "grid-cols-3  gap-6" : "grid-cols-2  gap-12"
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
