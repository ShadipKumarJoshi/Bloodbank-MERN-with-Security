const Pet = require("../model/petModel");
const cloudinary = require("cloudinary");

const addPet = async (req, res) => {
  info('Add Pet request received', { requestBody: req.body, requestFiles: req.files, status: req.body.status });

  try {
    const {
      fullName,
      email,
      number,
      address,
      petType,
      condition,
      purpose,
      description,
      user,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !number ||
      !address ||
      !petType ||
      !condition ||
      !purpose ||
      !description ||
      !user
    ) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (req.body.status === "found") {
      const {
        petImageUrlOne,
        petImageUrlTwo,
        petImageUrlThree,
        petImageUrlFour,
      } = req.files;

      if (
        !petImageUrlOne ||
        !petImageUrlTwo ||
        !petImageUrlThree ||
        !petImageUrlFour
      ) {
        return res.json({
          success: false,
          message: "All pet images are required",
        });
      }

      // Perform concurrent uploads
      const [
        uploadedImageUrlOne,
        uploadedImageUrlTwo,
        uploadedImageUrlThree,
        uploadedImageUrlFour,
      ] = await Promise.all([
        cloudinary.v2.uploader.upload(petImageUrlOne.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlTwo.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlThree.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlFour.path, {
          folder: "Pet",
          crop: "scale",
        }),
      ]);

      const newPet = new Pet({
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        purpose,
        status: req.body.status,
        description,
        user,
        petImageUrlOne: uploadedImageUrlOne.secure_url,
        petImageUrlTwo: uploadedImageUrlTwo.secure_url,
        petImageUrlThree: uploadedImageUrlThree.secure_url,
        petImageUrlFour: uploadedImageUrlFour.secure_url,
      });

      await newPet.save();
      info('Pet created successfully', { petId: newPet._id });
    } else if (req.body.status === "own") {
      const { petAge, petGender, vaccines } = req.body;
      const {
        petImageUrlOne,
        petImageUrlTwo,
        petImageUrlThree,
        petImageUrlFour,
        petFileUrl,
      } = req.files;

      if (
        !petFileUrl ||
        !petImageUrlOne ||
        !petImageUrlTwo ||
        !petImageUrlThree ||
        !petImageUrlFour
      ) {
        return res.json({
          success: false,
          message: "All fields including images and file are required",
        });
      }

      // Perform concurrent uploads
      const [
        uploadedImageUrlOne,
        uploadedImageUrlTwo,
        uploadedImageUrlThree,
        uploadedImageUrlFour,
        uploadedFileUrl,
      ] = await Promise.all([
        cloudinary.v2.uploader.upload(petImageUrlOne.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlTwo.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlThree.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlFour.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petFileUrl.path, { folder: "Pet" }),
      ]);

      const isVaccinated = vaccines ? true : false;

      const newPet = new Pet({
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        status: req.body.status,
        purpose,
        description,
        petAge,
        petGender,
        petImageUrlOne: uploadedImageUrlOne.secure_url,
        petImageUrlTwo: uploadedImageUrlTwo.secure_url,
        petImageUrlThree: uploadedImageUrlThree.secure_url,
        petImageUrlFour: uploadedImageUrlFour.secure_url,
        petFileUrl: uploadedFileUrl.secure_url,
        user,
        vaccines,
        isVaccinated,
      });

      await newPet.save();
      info('Pet created successfully', { petId: newPet._id });
    }

    res.status(200).json({
      success: true,
      message: "Pet created successfully",
    });
  } catch (error) {
    error('Error creating pet', { error: error.message });
    res.status(500).json("Something went wrong. Please try again later.");
  }
};

const getAllPets = async (req, res) => {
  try {
    const allPets = await Pet.find();
    const Pets = allPets.filter((pet) => pet.isVaccinated === false);
    const vaccinatedPets = allPets.filter((pet) => pet.isVaccinated === true);

    info('Fetched all pets', { totalPets: allPets.length, unvaccinatedPets: Pets.length, vaccinatedPets: vaccinatedPets.length });

    res.status(200).json({
      success: true,
      allPets: Pets,
      vaccinatedPets: vaccinatedPets,
    });
  } catch (error) {
    error('Error fetching pets', { error: error.message });
    res.status(500).json(error.message);
  }
};

module.exports = {
  addPet,
  getAllPets,
};
