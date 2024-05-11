import { useLoaderData } from "react-router-dom";

const FoodDetails = () => {
  const food = useLoaderData();
  console.log(food);
  return (
    <div>
      <section className="dark:bg-amber-100 dark:text-gray-800">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group cursor-default lg:grid lg:grid-cols-12 bg-amber-200"
          >
            <img
              src="https://source.unsplash.com/random/480x360"
              alt=""
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 lg:col-span-5 ">
              <h3 className="text-2xl font-semibold sm:text-4xl">
                {food.foodName}
              </h3>
              <span className=" dark:text-gray-600 font-semibold">
                Quantity : {food.foodQuantity}
              </span>
              <p className="my-6 dark:text-gray-700 font-semibold">
                Expired Date : {food.expiredDateTime}
              </p>
              <div>
                <button className="btn px-16 bg-amber-500">Request</button>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default FoodDetails;
