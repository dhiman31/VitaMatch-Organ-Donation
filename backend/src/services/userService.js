const UserRepository = require("../repository/userRepo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const Hospital = require("../models/Hospital");
const User = require("../models/User");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      if (data.role === "DONOR") {
        return await this.userRepository.createUser(data);
      }

      const hospitalObj = await Hospital.findOne({
        name: data.hospitalName,
        city: data.address,
      }).select("_id");

      if (!hospitalObj) {
        throw new Error("Hospital not found");
      }

      const user = await this.userRepository.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        hospitalId: hospitalObj._id,
        phoneNumber: data.phoneNumber,
        address: data.address,
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error in user service");
    }
  }

  async login(data) {
    try {
      const user = await this.userRepository.findUser(data);

      if (!user) {
        throw new Error("Email does not exist");
      }

      const isMatch = await bcrypt.compare(data.password, user.password);

      if (!isMatch) {
        throw new Error("Invalid Password!");
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  
}

module.exports = UserService;
