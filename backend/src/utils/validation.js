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