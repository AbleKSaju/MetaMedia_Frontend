const { Cloudinary } = require("@cloudinary/url-gen");

// Create a Cloudinary instance
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARYNAME,
  },
  url: {
    secure: true, // Whether to use HTTPS
  },
});
