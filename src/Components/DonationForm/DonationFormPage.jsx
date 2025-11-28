// import React, { useState } from "react";
// import "./DonationFormPage.css";
// import { db } from "../../firebase"; // adjust path
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function DonationFormPage() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     typeOfFood: "",
//     cuisineType: "",
//     quantity: "",
//     packaging: "",
//     preparationTime: "",
//     expiryTime: "",
//     pickupTime: "",
//     urgency: "",
//     instructions: "",
//     consentSafe: false,
//     consentTerms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await addDoc(collection(db, "donations"), {
//         ...formData,
//         createdAt: Timestamp.now(),
//       });

//       toast.success("Donation has been submitted! We will notify as soon as someone accepts this request.");
//       setFormData({
//         typeOfFood: "",
//         cuisineType: "",
//         quantity: "",
//         packaging: "",
//         preparationTime: "",
//         expiryTime: "",
//         pickupTime: "",
//         urgency: "",
//         instructions: "",
//         consentSafe: false,
//         consentTerms: false,
//       });
//       setStep(1); // reset to step 1
//     } catch (error) {
//       console.error("Error adding donation: ", error);
//       alert("Failed to submit donation. Please try again.");
//     }
//   };

//   return (
//     <div className="donation-container">
//       <h2>Post a New Donation</h2>
//       <p className="form-subtitle">
//         Fill out the form to make your surplus food available for pickup.
//       </p>

//       <form onSubmit={handleSubmit}>
//         {/* Step 1 */}
//         {step === 1 && (
//           <div className="form-card">
//             <h3>Food Donation Details</h3>

//             <div className="form-group">
//               <label>Type of Food</label>
//               <input
//                 type="text"
//                 name="typeOfFood"
//                 value={formData.typeOfFood}
//                 onChange={handleChange}
//                 placeholder="e.g., Sourdough Bread, Vegetable Soup"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Cuisine Type</label>
//               <input
//                 type="text"
//                 name="cuisineType"
//                 value={formData.cuisineType}
//                 onChange={handleChange}
//                 placeholder="e.g., Indian, Italian"
//               />
//             </div>

//             <div className="form-group">
//               <label>Quantity (in servings)</label>
//               <input
//                 type="text"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 placeholder="e.g., 20 Loaves, 5 Boxes"
//               />
//             </div>

//             <div className="form-group">
//               <label>Packaging Information</label>
//               <input
//                 type="text"
//                 name="packaging"
//                 value={formData.packaging}
//                 onChange={handleChange}
//                 placeholder="e.g., individual containers, trays"
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Preparation Time</label>
//                 <input
//                   type="datetime-local"
//                   name="preparationTime"
//                   value={formData.preparationTime}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Expiry Time</label>
//                 <input
//                   type="datetime-local"
//                   name="expiryTime"
//                   value={formData.expiryTime}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <button type="button" className="next-btn" onClick={nextStep}>
//               Next →
//             </button>
//           </div>
//         )}

//         {/* Step 2 */}
//         {step === 2 && (
//           <div className="form-card">
//             <h3>Pickup Information</h3>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Preferred Pickup Time</label>
//                 <input
//                   type="datetime-local"
//                   name="pickupTime"
//                   value={formData.pickupTime}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Urgency</label>
//                 <select
//                   name="urgency"
//                   value={formData.urgency}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select urgency</option>
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Special Instructions</label>
//               <textarea
//                 name="instructions"
//                 value={formData.instructions}
//                 onChange={handleChange}
//                 placeholder="e.g., Ring bell at the back entrance"
//               />
//             </div>

//             <div className="button-row">
//               <button type="button" className="back-btn" onClick={prevStep}>
//                 ← Back
//               </button>
//               <button type="button" className="next-btn" onClick={nextStep}>
//                 Next →
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3 */}
//         {step === 3 && (
//           <div className="form-card">
//             <h3>Consent</h3>

//             <div className="checkbox-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="consentSafe"
//                   checked={formData.consentSafe}
//                   onChange={handleChange}
//                 />
//                 I confirm that the food is prepared, stored, and handled in a
//                 safe and sanitary manner.
//               </label>
//             </div>

//             <div className="checkbox-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="consentTerms"
//                   checked={formData.consentTerms}
//                   onChange={handleChange}
//                 />
//                 I agree to the <a href="#">terms and conditions</a> of
//                 FoodShare.
//               </label>
//             </div>

//             <div className="button-row">
//               <button type="button" className="back-btn" onClick={prevStep}>
//                 ← Back
//               </button>
//               <button type="submit" className="submit-btn" onClick={() => toast.success("Thank you for your donation!")}>
//                 Submit Donation
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

// export default DonationFormPage;
import React, { useState } from "react";
import "./DonationFormPage.css";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import foodPic from '../../assets/food_pic2.jpg';

function DonationFormPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    restaurantName: "",
    typeOfFood: "",
    cuisineType: "",
    quantity: "",
    address: "",
    preparationTime: "",
    expiryTime: "",
    image: foodPic, // default image
    pickupTime: "",
    urgency: "",
    instructions: "",
    consentSafe: false,
    consentTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consentSafe || !formData.consentTerms) {
      toast.error("Please provide all required consents before submitting.");
      return;
    }

    try {
      await addDoc(collection(db, "donations"), {
        ...formData,
        createdAt: Timestamp.now(),
      });

      toast.success(
        "Donation has been submitted! We will notify as soon as someone accepts this request."
      );
      

      setFormData({
        restaurantName: "",
        typeOfFood: "",
        cuisineType: "",
        quantity: "",
        address: "",
        preparationTime: "",
        expiryTime: "",
        image: foodPic,
        pickupTime: "",
        urgency: "",
        instructions: "",
        consentSafe: false,
        consentTerms: false,
      });
      setStep(1);
    } catch (error) {
      console.error("Error adding donation: ", error);
      toast.error("Failed to submit donation. Please try again.");
    }
  };

  return (
    <div className="donation-container">
      <h2>Post a New Donation</h2>
      <p className="form-subtitle">
        Fill out the form to make your surplus food available for pickup.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Step 1 */}
        {step === 1 && (
          <div className="form-card">
            <h3>Food Donation Details</h3>

            <div className="form-group">
              <label>Restaurant Name</label>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="e.g., Udupi"
                required
              />
            </div>

            <div className="form-group">
              <label>Type of Food</label>
              <input
                type="text"
                name="typeOfFood"
                value={formData.typeOfFood}
                onChange={handleChange}
                placeholder="e.g., Sourdough Bread, Vegetable Soup"
                required
              />
            </div>

            <div className="form-group">
              <label>Cuisine Type</label>
              <input
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                placeholder="e.g., Indian, Italian"
              />
            </div>

            <div className="form-group">
              <label>Quantity (in servings)</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 20 Loaves, 5 Boxes"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., 456 Oak Ave, Sometown"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preparation Time</label>
                <input
                  type="datetime-local"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Expiry Time</label>
                <input
                  type="datetime-local"
                  name="expiryTime"
                  value={formData.expiryTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="button" className="next-btn" onClick={nextStep}>
              Next →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="form-card">
            <h3>Pickup Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Pickup Time</label>
                <input
                  type="datetime-local"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Urgency</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="">Select urgency</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Special Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="e.g., Ring bell at the back entrance"
              />
            </div>

            <div className="button-row">
              <button type="button" className="back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="next-btn" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="form-card">
            <h3>Consent</h3>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="consentSafe"
                  checked={formData.consentSafe}
                  onChange={handleChange}
                />
                I confirm that the food is prepared, stored, and handled in a
                safe and sanitary manner.
              </label>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="consentTerms"
                  checked={formData.consentTerms}
                  onChange={handleChange}
                />
                I agree to the <a href="#">terms and conditions</a> of FoodShare.
              </label>
            </div>

            <div className="button-row">
              <button type="button" className="back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button type="submit" className="submit-btn">
                Submit Donation
              </button>
            </div>
          </div>
        )}
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default DonationFormPage;
