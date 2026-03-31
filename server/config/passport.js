import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import Faculty from "../models/Faculty.js";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import keys from "./key.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const faculty = await Student.findById(jwt_payload.id);
      const student = await Faculty.findById(jwt_payload.id);
      const admin = await Admin.findById(jwt_payload.id);

      if (faculty) {
        return done(null, faculty);
      } else if (student) {
        return done(null, student);
      } else if (admin) {
        return done(null, admin);
      } else {
        console.log("Passport Error");
      }
    })
  );
};
