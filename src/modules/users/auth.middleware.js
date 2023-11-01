import { promisify } from 'util';
import jwt from 'jsonwebtoken'; 
 import {envs} from '../../config/enviroments/enviroments.js'
 import { UserService } from './user.services.js';
import { catchAsync, AppError } from '../../errors/index.js';

const userService = new UserService()

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    envs.SECRET_JWT_SEED
  );

const user = await userService.findOneUserById(decoded.id)

  if (!user) {
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }
  

  //only if you have the functionality to change password
  /*
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      const changedTimeStamp = parseInt(
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          'User recently changed passwodrd!, please login again.',
          401
        )
      );
    }
  }
  */

  req.sessionUser = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }

    next();
  };
};


export const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

 next();
});