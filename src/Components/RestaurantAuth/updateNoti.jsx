import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// Create a new donation and notify NGOs
export async function createDonation() {
  const donationRef = await addDoc(collection(db, "donations"), {
    restaurant: "Pizza Point",
    item: "Sandwiches",
    status: "pending",
    createdAt: serverTimestamp(),
  });

  // Create notification for NGOs
  await addDoc(collection(db, "notifications"), {
    to: "ngo",
    donationId: donationRef.id,
    message: "Pizza Point donated Sandwiches",
    type: "donation",
    seen: false,
    createdAt: serverTimestamp(),
  });
}

// Accept a donation and notify the restaurant
export async function acceptDonation(donationId, ngoId, restaurantId) {
  const donationRef = doc(db, "donations", donationId);
  await updateDoc(donationRef, {
    status: "accepted",
    ngo: ngoId,
  });

  // Notify the restaurant
  await addDoc(collection(db, "notifications"), {
    to: "restaurant",
    userId: restaurantId,
    donationId,
    message: "Your donation was accepted by NGO",
    type: "accept",
    seen: false,
    createdAt: serverTimestamp(),
  });
}
