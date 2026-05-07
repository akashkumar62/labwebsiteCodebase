// components/ContactForm.js
// import { db } from "../../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";


// export default function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await addDoc(collection(db, "contacts"), formData);
//       setSuccess(true);
//       setFormData({ name: "", email: "", subject: "", message: "" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <section id="contact" className="p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6 text-center border-b-2 pb-2">
//         Contact Us
//       </h2>
//       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
//         {/* Left Section - Contact Details */}
//         <div className="bg-gray-900  p-6 rounded-lg">
//           <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
//           <p className="text-gray-400">
//             <span className="block font-bold text-white">Address</span>
//             Department of Chemistry, IIT BHU (Varanasi) <br />
//             Varanasi, UP, India - 221005
//           </p>
//           <p className="mt-4 text-gray-400">
//             <span className="block font-bold text-white">Email</span>
//             abc.chy@iitbhu.ac.in
//           </p>
//           <p className="mt-4 text-gray-400">
//             <span className="block font-bold text-white">Phone</span>
//             +91 12345678
//           </p>
//           {/* Map Section */}
//           <div className="mt-6">
//             <iframe
//               title="IIT BHU Location"
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.245748079531!2d82.98673757534003!3d25.262317329060092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e33ef9b1f7cdd%3A0x7555db6d623dc140!2sIndian%20Institute%20of%20Technology%20(BHU)%20Varanasi!5e0!3m2!1sen!2sin!4v1743416789496!5m2!1sen!2sin" 
//               width="100%"
//               height="250"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>
//         </div>

//         {/* Right Section - Contact Form */}
//         <div className="bg-gray-900 p-6 rounded-lg">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-300">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300">Subject</label>
//               <input
//                 type="text"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300">Message</label>
//               <textarea
//                 name="message"
//                 rows="4"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className={`w-full py-2 rounded-lg transition ${
//                 loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
//               }`}
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send Message"}
//             </button>
//             {success && (
//               <p className="text-green-400 text-center mt-2">Message sent successfully!</p>
//             )}
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function ContactInfo() {
  return (
    <section id="contact" className="p-2 text-white">
      <h2 className="font-sans text-3xl font-bold mt-6 mb-6 text-center border-b-2 pb-2">
        Contact Us
      </h2>
      <div className="max-w-4xl mx-auto  bg-gray-800 rounded-lg shadow-lg">
        {/* Left Section - Contact Details */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-gray-400">
            <span className="block font-bold text-white">Address</span>
            Department of Chemistry, IIT BHU (Varanasi) <br />
            Varanasi, UP, India - 221005
          </p>
          <p className="mt-4 text-gray-400">
            <span className="block font-bold text-white">Email</span>
            saravana.chy@itbhu.ac.in
          </p>
          {/* Map Section */}
          <div className="mt-6">
            <iframe
              title="IIT BHU Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.245748079531!2d82.98673757534003!3d25.262317329060092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e33ef9b1f7cdd%3A0x7555db6d623dc140!2sIndian%20Institute%20of%20Technology%20(BHU)%20Varanasi!5e0!3m2!1sen!2sin!4v1743416789496!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

