import Profile from "../models/ProfileSchema.js";

export const save = async (req, res) => {
  const { user, userData } = req.body;
  try {
    const updateDoc = {
      user: user,
      name: userData.name,
      address: userData.address,
      state: userData.state,
      statecode: userData.statecode,
      gstin: userData.gstin,
      pan: userData.pan,
      phone: userData.phone,
      email: userData.email,
      code: userData.code,
      logo: userData.logo,
      bank: userData.bank,
      acno: userData.acno,
      ifsc: userData.ifsc,
      oaddress: userData.oaddress,
    };
    // Use findOneAndUpdate to either update the existing invoice or insert a new one if it doesn't exist
    await Profile.findOneAndUpdate({ user: user }, updateDoc, {
      new: true,
      upsert: true,
    });

    res.status(200).json({ success: true, message: "Success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const get = async (req, res) => {
  const { user } = req.body;
  try {
    const profile = await Profile.find({ user: user });
    // console.log(profile);
    let status = false;
    if (profile.length > 0) status = true;

    // console.log(profile);

    res.status(200).json({
      success: true,
      message: "Success",
      data: profile,
      status: status,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
