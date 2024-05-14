import { useEffect, useState } from "react";
import Slider from "../../Components/Slider/Slider";
import Food from "../../Components/Food/Food";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Home = () => {
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

  const limitedFoods = foods.slice(0, 6);

  return (
    <div>
      <Helmet>
        <title>Nourish4All</title>
      </Helmet>
      <Slider></Slider>
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-semibold">Featured Foods</h2>
      </div>
      <div className="grid grid-cols-3 gap-6 my-10">
        {limitedFoods.map((food) => (
          <Food food={food} key={food._id}></Food>
        ))}
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-center"
      >
        <Link to="/available-foods" className="btn">
          Show all
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
