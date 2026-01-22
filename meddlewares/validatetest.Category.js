const allowedCategories = [
  "general",
  "medical",
  "engineering",
  "management",
  "specialized"
];

const validateCategory = (req, res, next) => {
  const { category } = req.params;

  if (!allowedCategories.includes(category)) {
    return res.status(400).json({
      message: "Invalid category"
    });
  }

  next();
};

export default validateCategory;
