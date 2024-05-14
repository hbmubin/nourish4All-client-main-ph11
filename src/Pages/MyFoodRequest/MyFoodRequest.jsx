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
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Food Name</th>
              <th>Donor Name</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {myFoodRequest.map((food, idx) => (
              <tr key={food._id}>
                <th>{idx + 1}</th>
                <td>{food.foodName}</td>
                <td>{food.donor.name}</td>
                <td>{food.pickupLocation}</td>
                <td>{food.expiredDateTime}</td>
                <td>{food.requestDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodRequest;
