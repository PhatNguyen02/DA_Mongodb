const User = require('../model/users');

exports.register = async (req, res) => {
  const { name, email, passwordHash, phone, adress, isAdmin} = req.body;
  try {
    const user = await User.create({
      name,
      email,
      passwordHash: passwordHash,
      phone,
      adress,
      isAdmin: isAdmin || false
    });
    req.session.userId = user._id;
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not log out, please try again' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logged out' });
  });
};