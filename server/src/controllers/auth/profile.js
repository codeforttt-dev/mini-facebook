const User = require('../../models/User');

exports.updateProfilePicture = async (req, res) => {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({ message: 'No avatar provided' });
    }

    // Update user profile picture in database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile picture updated successfully',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        emailOrPhone: updatedUser.emailOrPhone,
        avatar: updatedUser.avatar
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile picture' });
  }
};
