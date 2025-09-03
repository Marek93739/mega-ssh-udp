import Navbar from "../components/Navbar";
import { FaInfoCircle, FaGlobeAmericas, FaUserTie, FaPalette, FaShieldAlt } from 'react-icons/fa';

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-sky-50 mb-10 animate-fade-in-down">
          <FaInfoCircle className="inline-block mr-4" />About us.
        </h1>
        <div className="bg-neutral-900 shadow-2xl rounded-xl p-10 border border-neutral-600 transform transition-all duration-500">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            <FaGlobeAmericas className="inline-block text-orange-400 mr-3" />
            Welcome to the About page of the Mega UDP Web App! Our core mission is to empower users by providing free, reliable UDP configurations. These configurations are meticulously crafted to enable seamless utilization of HTTP Custom VPNs, ensuring your online privacy and freedom.
          </p>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            <FaUserTie className="inline-block text-orange-400 mr-3" />
            This innovative application is proudly brought to you by <a href="#" className="font-bold text-orange-400">Megasus</a>. We are deeply committed to delivering a robust, user-friendly, and secure platform that caters to all your UDP configuration requirements, making advanced networking accessible to everyone.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            <FaPalette className="inline-block text-orange-400 mr-3" />
            Our design philosophy is rooted in modern aesthetics, focusing on a clean, intuitive, and highly responsive user experience. Every element is carefully considered to perfectly align with the overall dark theme and vibrant orange accents of our application. We relentlessly pursue simplicity and efficiency, ensuring that anyone, regardless of their technical expertise, can effortlessly get started with their VPN configurations.
          </p>
          <div className="mt-8 text-center text-gray-400 text-lg">
            <FaShieldAlt className="inline-block text-orange-400 mr-2" />Your privacy, our priority.
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}