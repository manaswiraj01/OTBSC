import pincodeDirectory from 'india-pincode-lookup';

export const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "name",
    "email",
    "phoneNo",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};


export const validateLocation = (state, city, pincode) => {
  const pincodeDetails = pincodeDirectory.lookup(pincode);

  if (!pincodeDetails || pincodeDetails.length === 0) {
    return { success: false, message: "Invalid pincode" };
  }

  const details = pincodeDetails[0];

  const isStateMatch = details.stateName.toLowerCase() === state.toLowerCase();
  const isCityMatch = details.districtName.toLowerCase().includes(city.toLowerCase());

  if (!isStateMatch || !isCityMatch) {
    return {
      success: false,
      message: "Pincode does not match the given state and city",
    };
  }

  return { success: true };
};



// export const validateLocation = async (state, city, pincode) => {
//   const stateData = data.states.find(
//     (s) => s.state.toLowerCase() === state.toLowerCase()
//   );

//   if (!stateData) return { success: false, message: "Invalid state" };

//   const isCityValid = stateData.cities.some(
//     (c) => c.toLowerCase() === city.toLowerCase()
//   );
//   if (!isCityValid) return { success: false, message: "Invalid city for selected state" };

//   const pincodeDetails = findDetails(pincode);
//   if (!pincodeDetails) return { success: false, message: "Invalid pincode" };

//   const isPincodeMatch =
//     pincodeDetails.state.toLowerCase() === state.toLowerCase() &&
//     pincodeDetails.district.toLowerCase().includes(city.toLowerCase());

//   if (!isPincodeMatch) {
//     return {
//       success: false,
//       message: "Pincode does not match the selected state and city",
//     };
//   }

//   return { success: true };
// };
