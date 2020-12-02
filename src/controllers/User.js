/* eslint-disable class-methods-use-this */
const bcrypt = require('bcryptjs');
const userModel = require('../models/User');

class User {
  async index(req, res) {
    const { id } = req.params;

    const user = await userModel.findById(id);

    return res.status(200).json(user);
  }

  async create(req, res) {
    const {
      name,
      username,
      email,
      password,
    } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Há um ou mais parâmetros obrigatórios faltando' });
    }

    const [emailExists, usernameExists] = await Promise.all([
      await userModel.findOne({ email }),
      await userModel.findOne({ username }),
    ]);

    if (emailExists || usernameExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await userModel.create({
      name,
      username,
      email,
      password: passwordHash,
    });

    return res.status(201).json(user);
  }

  async update(req, res) {
    const { id } = req.params;

    const {
      name,
      username,
      email,
      profileImage,
      bio,
    } = req.body;

    let user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const [emailExists, usernameExists] = await Promise.all([
      await userModel.findOne({ email }),
      await userModel.findOne({ username }),
    ]);

    if (emailExists || usernameExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    const userUpdated = {
      name: name || user.name,
      username: username || user.username,
      email: email || user.email,
      profileImage: profileImage || user.profileImage,
      bio: bio || user.bio,
    };

    user = await user.updateOne(userUpdated, { new: true });

    return res.sendStatus(200);
  }

  async delete(req, res) {
    const { id } = req.params;

    await userModel.deleteOne({ _id: id });

    return res.sendStatus(200);
  }
}

module.exports = new User();
