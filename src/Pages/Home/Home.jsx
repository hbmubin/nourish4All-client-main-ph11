import { useContext, useEffect, useState } from "react";
import Slider from "../../Components/Slider/Slider";
import { AuthContext } from "../../Provider/AuthProvider";
import Food from "../../Components/Food/Food";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

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

  return (
    <div>
      <Slider></Slider>
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-semibold">Featured Foods</h2>
      </div>
      <div className="grid grid-cols-3 gap-6 my-10">
        {foods.map((food) => (
          <Food food={food} key={food._id}></Food>
        ))}
      </div>
    </div>
  );
};

export default Home;
