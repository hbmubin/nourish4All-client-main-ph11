import { useEffect, useState } from "react";
import Slider from "../../Components/Slider/Slider";
import Food from "../../Components/Food/Food";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import TestimonialCard from "../../Components/TestimonialCard/TestimonialCard";

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
      <div className="my-16 bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-8">
            Our Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Meals Distributed</h3>
              <p className="text-lg text-gray-700">10,000+</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Community Reach</h3>
              <p className="text-lg text-gray-700">50+ Local Communities</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Impact Story</h3>
              <p className="text-lg text-gray-700">
                Our impact reaches thousands through nutritious meals,
                empowering communities like Jane's to thrive with resilience and
                hope
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-4xl font-semibold text-center mb-8">
          What Our Users Say
        </h2>

        <TestimonialCard />
      </div>
    </div>
  );
};

export default Home;
