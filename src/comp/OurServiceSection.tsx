import React from 'react';

interface Service {
  title: string;
  image: string;
  bgColor: string;
}

const services: Service[] = [
  {
    title: 'International Transfer',
    image: '/image/c1.png', // Replace with actual image link
    bgColor: 'bg-orange-500 text-white',
  },
  {
    title: 'Local Transfer',
    image: '/image/c3.png', // Replace with actual image link
    bgColor: 'bg-white text-black',
  },
  {
    title: 'Loans and Credit Line',
    image: '/image/c2.png', // Replace with actual image link
    bgColor: 'bg-white text-black',
  },
  {
    title: 'Investment Banking',
    image: '/image/c4.png', // Replace with actual image link
    bgColor: 'bg-orange-500 text-white',
  },
];

const OurService: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Our Services</h2>
        <p className="text-gray-600">move money fast and securely</p>
      </div>

      {/* Service Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className={`p-4 ${service.bgColor}`}>
              <h3 className="text-center font-semibold">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
