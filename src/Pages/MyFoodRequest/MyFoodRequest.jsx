import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const { email } = user;
  const [myFoodRequest, setMyFoodRequest] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-food-request/${email}`)
      .then((res) => res.json())
      .then((data) => setMyFoodRequest(data));
  }, [email]);

  console.log(myFoodRequest);
  return <div>MyFoodRequest</div>;
};

export default MyFoodRequest;
