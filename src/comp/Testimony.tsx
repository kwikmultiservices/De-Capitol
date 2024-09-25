import React from "react";

interface Testimonial {
  name: string;
  title: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Stuggart",
    title: "Business owner",
    image: "/image/c6.png", // Replace with actual image URL
    review:
      "I've been banking with De Capitol for over a decade, and they have consistently provided excellent service. From personal loans to investment advice, their team has always been knowledgeable and helpful.",
  },
  {
    name: "Sarah Brown",
    title: "Home Owner",
    image: "/image/c5.png", // Replace with actual image URL
    review:
      "As a first-time homebuyer, I was nervous about the mortgage process. The team at De Capitol guided me through every step, ensuring I got the best rate and terms. I couldn’t be happier with their service!",
  },
];

const TestimonialItem: React.FC<Testimonial> = ({
  name,
  title,
  image,
  review,
}) => {
  return (
    <div className="flex mb-6">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <p className="text-gray-700 mb-2">"{review}"</p>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <>
      <div className="container mx-auto md:px-6 py-16 flex justify-between flex-col md:flex-row items-center flex-wrap">
        {/* Left Section */}
        <div className="w-full md:w-1/3 px-2">
          <h2 className="text-[1.3rem] md:text-3xl font-bold mb-6">
            What our Clients are saying.
          </h2>
          <div className="flex items-center">
            <div className="border-b border-black w-10 mr-2"></div>
            <p className="text-lg">
              02<span className="text-gray-500">|06</span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/3 px-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialItem key={index} {...testimonial} />
          ))}
        </div>
      </div>
     
      <div className="container mx-auto md:px-6 py-16 flex justify-between items-start flex-col md:flex-row">
       
        {/* Left Section */}
        <div className="w-full flex justify-center">
          <img src="/image/c7.png" alt="" className="h-[50vh]"/>
        </div>

        {/* Right Section */}
        <div className="w-full px-3">
        <h1 className="capitalize py-4 font-extrabold text-[1.3rem] md:text-[2rem]">Why choose us</h1>
          <p>
            Customer-Centric Approach: Your needs are our priority. We listen,
            understand, and tailor our solutions to fit your unique situation.
            Expertise and Experience: With over [number] years in the banking
            industry, we bring extensive knowledge and insights to help you make
            informed financial decisions. Innovation: We embrace technology to
            bring you convenient banking solutions that simplify your life.
            Community Involvement: We are proud to support and invest in the
            communities we serve, fostering growth and prosperity for all. Our
            Services Explore a comprehensive range of banking services designed
            to meet your needs, from personal banking and wealth management to
            business banking solutions. Whatever your financial aspirations, we
            have the tools and expertise to help you succeed.
          </p>
        </div>
      </div>
      <div className="">
        <img src="/image/c8.png" alt="" className="md:h-[50vh] h-[30vh]" />
      </div>
    </>
  );
};

export default TestimonialsSection;
