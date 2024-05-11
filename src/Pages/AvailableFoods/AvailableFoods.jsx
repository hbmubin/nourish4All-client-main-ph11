import { useContext, useEffect, useState } from "react";
import Food from "../../Components/Food/Food";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { AuthContext } from "../../Provider/AuthProvider";

const AvailableFoods = () => {
  const { loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [rowStatus, setRowStatus] = useState(3);

  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => {
        const available = data.filter((food) => {
          if (food.foodStatus == "available") {
            return food;
          }
        });
        setFoods(available);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-center">
        <span className="loading loading-ring w-28"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-semibold">All available foods</h2>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex">
          <h2>Sort by</h2>
          <div>Expire date</div>
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
        {foods.map((food) => (
          <Food food={food} key={food._id}></Food>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
