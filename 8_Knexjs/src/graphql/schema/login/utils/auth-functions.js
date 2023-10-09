import { AuthenticationError } from "apollo-server-errors";

export const checkIsLoggedIn = (loggerUserId) => {
  if (!loggerUserId) {
    throw new AuthenticationError("You have to log in");
  }
};

export const checkOwner = (userId, loggerUserId) => {
  checkIsLoggedIn(loggerUserId);

  if (loggerUserId !== userId) {
    throw new AuthenticationError("You cannot update this user");
  }
};
