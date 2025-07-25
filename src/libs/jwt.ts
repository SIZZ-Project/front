// import { decodeJwt, jwtVerify } from "jose";

// /**
//  * accessToken | undefined를 검증하여 jwt로 변환한다.
//  * jwt가 없을 때 / 잘못되었을 시 null을 리턴한다.
//  */
// export async function safeJwtVerify(accessToken: string | undefined) {
//   if (!accessToken) {
//     return null;
//   }
//   try {
//     const result = await jwtVerify(
//       accessToken,
//       new TextEncoder().encode(process.env.JWT_SECRET),
//       {}
//     );
//     return result;
//   } catch (error) {
//     // SECRET이 맞지 않을 시 등 오류 발생 시 상관 없이 무조건 Null 반환
//     console.error(error);
//     return null;
//   }
// }

// /**
//  * JWT를 파싱한다. (만료 여부 포함)
//  */
// export async function safeJwtDecode(accessToken: string | undefined) {
//   if (!accessToken) {
//     return null;
//   }
//   try {
//     const result = decodeJwt(accessToken);

//     return result;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
