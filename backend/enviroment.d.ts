// declare global {
//     namespace NodeJS {
//       interface ProcessEnv {
//         JWT_ACCESS_KEY: string;
//         JWT_REFRESH_KEY: string;
//         NODE_ENV: "development" | "production" | "test";
//         PORT?: string;
//         PWD: string;
//       }
//     }
// }


declare module "jsonwebtoken" {
    export interface JwtPayload {
        id: string;
    }
}

declare namespace Express {
    export interface Request {
       file?: {
        filename: string;
       }
    }
 }

export {}