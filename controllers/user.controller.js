// const { User } = require('../models/userSchema');

async function createContact(req, res, next) {
  // const { user } = req;
  // const { id: movieId } = req.body;

  // user.movies.push({ _id: movieId });
  // await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      ok: true,
    },
  });
}

async function getContact(req, res, next) {
  const { user } = req;
  const userWithMovies = await User.findById(user._id).populate('movies', {
    title: 1,
    year: 1,
    _id: 1,
  });

  return res.status(200).json({
    data: {
      ok: false,
    },
  });
}

async function me(req, res, next) {
  const { user } = req;
  const { email, _id: id } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        id,
      },
    },
  });
}

module.exports = {
  createContact,
  getContact,
  me,
};
