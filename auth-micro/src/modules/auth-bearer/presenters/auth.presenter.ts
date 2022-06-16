// import { Injectable } from '@nestjs/common';
//
// import {
//   LoginReqMapper,
//   LoginResMapper,
//   RegisterResMapper,
// } from '../swagger/swagger.mapper';
//
// @Injectable()
// export class AuthPresenter {
//   oneRegisterResponse(auth): RegisterResMapper {
//     return {
//       auth: {
//         createdAt: auth.createdAt,
//         currentRefreshToken: auth.currentRefreshToken,
//         firstName: auth.firstName,
//         id: auth.id,
//         lastName: auth.lastName,
//         picture: auth.picture,
//         roles: auth.roles,
//         updatedAt: auth.updatedAt,
//         verificationLink: auth.verificationLink,
//         verifiedEmail: auth.verifiedEmail,
//       },
//     };
//   }
//
//   manyRegisterResponse(auth): RegisterResMapper {
//     return { auth };
//   }
//
//   oneLoginResponse(auth): LoginResMapper {
//     return {
//       auth: {
//         createdAt: auth.createdAt,
//         firstName: auth.firstName,
//         id: auth.id,
//         lastName: auth.lastName,
//         picture: auth.picture,
//         roles: auth.roles,
//         updatedAt: auth.updatedAt,
//         verificationLink: auth.verificationLink,
//         verifiedEmail: auth.verifiedEmail,
//       },
//     };
//   }
//
//   manyLoginResponse(auth): LoginResMapper {
//     return { auth };
//   }
// }
