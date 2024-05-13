import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const { email } = user;

  useEffect(() => {
    fetch(`http://localhost:5000/my-foods/${email}`)
      .then((res) => res.json())
      .then((data) => setMyFoods(data));
  }, [email]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/foods/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const updatedFoods = myFoods.filter((food) => food._id !== _id);
              setMyFoods(updatedFoods);

              Swal.fire({
                title: "Deleted!",
                text: "Your food has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the food.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the food. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="min-h[80vh]">
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
                  <Link
                    to={`/update-food/${food._id}`}
                    className="bg-base-300 p-1"
                  >
                    <CiEdit size={25} />
                  </Link>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-warning p-1"
                  >
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
