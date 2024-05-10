import { useContext } from "react";
import Slider from "../../Components/Slider/Slider";
import { AuthContext } from "../../Provider/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <Slider></Slider>
    </div>
  );
};

export default Home;
