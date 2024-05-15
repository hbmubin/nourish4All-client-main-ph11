import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyFoodRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const { email } = user;
  const [myFoodRequest, setMyFoodRequest] = useState([]);
  const axiosSecure = useAxiosSecure();

  const url = `/my-food-request/${email}`;

  useEffect(() => {
    axiosSecure.get(url).then((res) => setMyFoodRequest(res.data));
  }, [url, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-[80vh] text-center">
        <span className="loading loading-ring w-28"></span>
      </div>
    );
  }
  return (
    <div className="min-h-[50vh]">
      <Helmet>
        <title>Request Food || Nourish4All</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="md:block hidden">Food Name</th>
              <th>Donor Name</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {myFoodRequest.map((food) => (
              <tr key={food._id}>
                <td className="md:block hidden">{food.foodName}</td>
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
