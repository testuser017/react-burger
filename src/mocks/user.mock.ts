export const user = {
  success: true,
  user: {
    name: 'userName',
    email: 'user@email.test',
  },
};

export const updatedUser = {
  success: true,
  user: {
    name: 'updatedUserName',
    email: 'updatedUser@email.test',
  },
};

export const registeredUser = {
  ...user,
  accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjY5Njk2OTY5LCJleHAiOjk2OTY5Njk2fQ.ogBHyK4tpa9k_hSB5G4impd2SBbsBq2Hpu-o3FwE3S4',
  refreshToken: 'a7540faafef924fac81d1f54c81a817122efd517917e89c0e83489877ce8df2441a795183737e737',
};

export const logoutResponse = {
  success: true,
  message: 'Successful logout',
};

export const forgotPasswordResponse = {
  success: true,
  message: 'Reset email sent',
};
