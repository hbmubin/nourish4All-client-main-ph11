import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const { email } = user;
  console.log(myFoods);

  useEffect(() => {
    fetch(`http://localhost:5000/my-foods/${email}`)
      .then((res) => res.json())
      .then((data) => setMyFoods(data));
  }, [email]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Food Name</th>
              <th>Expire Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myFoods.map((food, idx) => (
              <tr key={food._id}>
                <th>{idx + 1}</th>
                <td>{food.foodName}</td>
                <td>{food.expiredDateTime}</td>
                <td>
                  {food.foodStatus == "available"
                    ? "not requested"
                    : "requested"}
                </td>
                <td className="flex justify-around">
                  <button className="bg-base-300 p-1">
                    <CiEdit size={25} />
                  </button>
                  <button className="bg-warning p-1">
                    <MdDeleteOutline size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyFoods;
