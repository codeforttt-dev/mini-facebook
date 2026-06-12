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
      { returnDocument: 'after' }
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

exports.updateProfileDetails = async (req, res) => {
  try {
    const { bio, workplace, education, location, hometown, relationshipStatus } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { bio, workplace, education, location, hometown, relationshipStatus },
      { returnDocument: 'after' }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        emailOrPhone: updatedUser.emailOrPhone,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        workplace: updatedUser.workplace,
        education: updatedUser.education,
        location: updatedUser.location,
        hometown: updatedUser.hometown,
        relationshipStatus: updatedUser.relationshipStatus,
        createdAt: updatedUser.createdAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile details' });
  }
};
