import {
  ExtractJwt,
  Strategy as JWTStrategy,
  VerifiedCallback,
  StrategyOptions,
} from "passport-jwt";
import UserModel from "../../Modules/User/User.model";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const jwtStrategy = new JWTStrategy(
  jwtOptions,
  (payload: any, done: VerifiedCallback) => {
    (async () => {
      try {
        const user = await UserModel.findById(payload._id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (e) {
        return done(e, false);
      }
    })();
  }
);

export default jwtStrategy;
