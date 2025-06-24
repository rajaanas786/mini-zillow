const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");

exports.createProperty = async (req, res) => {
  const { title, description, location, price } = req.body;
  const files = req.files;
  let imageUrls = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }

  const property = new Property({
    title,
    description,
    location,
    price,
    images: imageUrls,
    createdBy: req.user.id,
  });

  await property.save();
  res.json(property);
};

// exports.getAllProperties = async (req, res) => {
//   const properties = await Property.find().sort({ createdAt: -1 });
//   res.json(properties);
// };
exports.getAllProperties = async (req, res) => {
  try {
    // Read query params with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Total count (for frontend pagination)
    const total = await Property.countDocuments();

    // Get paginated properties
    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      properties,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ error: "Property not found" });
  res.json(property);
};

exports.updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};
