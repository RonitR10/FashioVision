const PortfolioPost = require("../models/PortfolioPost");
const slugify = require("slugify"); // This library helps in creating slugs from titles.

exports.addPortfolioPost = async (req, res) => {
  try {
    // Log the incoming request body to check its content
    // console.log("Request body:", req.body);
    // console.log("User ID:", req.userId);
    // console.log("Designer ID:", req.designerId);

    // Generate the slug from the title for SEO-friendly URL
    const slug = slugify(req.body.title, { lower: true });

    const post = new PortfolioPost({
      title: req.body.title,
      slug: slug,  // Add the generated slug
      description: req.body.description,
      images: req.body.images,
      tags: req.body.tags,
      designer: req.userId,
      designerId: req.designerId, // Assuming this is the ID for the designer
      visibility: req.body.visibility || 'public', // Default to 'public' if not provided
      // Don't need to set createdAt manually, it will be set by default
      // updatedAt: new Date(), // Can be handled in case of updates later
    });

    // Log the post object before saving
    console.log("Post to be saved:", post);

    // Save the post
    await post.save();
    
    // Send success response with the saved post
    res.status(201).json({ success: true, post });
  } catch (err) {
    // Log the error if it happens
    console.error("Error saving post:", err);
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

// PUBLIC access: anyone can view a designer’s portfolio
exports.getPortfolioPosts = async (req, res) => {
  try {
    // console.log("maje he");
    const {id } = req.params;
    const posts = await PortfolioPost.find({ designerId: id, visibility: "public" });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePortfolioPost = async (req, res) => {
  try {
    const post = await PortfolioPost.findById(req.params.id);
    
    // Check if post exists and if the logged-in designer is the same one who created the post
    if (!post || post.designer.toString() !== req.designerId) {
      return res.status(403).json({ message: "Unauthorized to update this post" });
    }

    // Update the post and also update the updatedAt field
    const updatedPost = await PortfolioPost.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() }, // Update the updatedAt timestamp
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePortfolioPost = async (req, res) => {
  try {
    const post = await PortfolioPost.findById(req.params.id);

    // Check if post exists and if the logged-in designer is the same one who created the post
    if (!post || post.designer.toString() !== req.designerId) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    await PortfolioPost.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Portfolio post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
