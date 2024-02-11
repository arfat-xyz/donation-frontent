// import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";
// import { NextResponse } from "next/server";
// import squareWasm from "./square.wasm";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request) {
//   const token = await getToken({ req: request });
//   const { pathname } = request.nextUrl;
//   const role = token?.role;
//   // if (role === "admin" && pathname.startsWith("/dashboard/admin")) {
//   //   return NextResponse.next();
//   // }
//   // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE}`);
//   const m = new WebAssembly.Module(squareWasm);
//   const i = new WebAssembly.Instance(m);

//   // Call the exported function from the WebAssembly module
//   const answer = i.exports.square(9);

//   const response = NextResponse.next();
//   response.headers.set("x-square", answer.toString());
//   return response;
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/dashboard/admin/:page*",
// };
