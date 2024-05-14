import testimonial from "../../../public/testimonila.json";

const TestimonialCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonial.map((test) => (
        <div key={test.id} className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">{test.comment}</p>
          <div className="text-sm font-semibold">{test.name}</div>
          <div className="text-xs text-gray-500">{test.role}</div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCard;
