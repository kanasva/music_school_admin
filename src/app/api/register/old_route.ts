// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { prisma } from '@/lib/prisma';
// import { authOptions } from "../auth/[...nextauth]/route"
// import { hash } from 'bcrypt';

// export async function POST(req: Request) {
// 	const data = await req.json();
// 	console.log(data)
// 	const res = await prisma.user.create({
// 		data: {
// 			email: data.email,
// 			password: await hash(data.password, 12),
// 			student: {
// 				create: {
// 					givenName: data.student.givenName,
// 					middleName: data.student.middleName,
// 					familyName: data.student.familyName,
// 					nickName: data.student.nickName,
// 					dateOfBirth: new Date(data.student.dateOfBirth),
// 					gender: data.student.gender,
// 					contact: {
// 						create: {
// 							houseNo: data.student.contact.houseNo,
// 							building: data.student.contact.building,
// 							floor: data.student.contact.floor,
// 							mooNo: parseInt(data.student.contact.mooNo),
// 							soi: data.student.contact.soi,
// 							road: data.student.contact.road,
// 							subDistrict: data.student.contact.subDistrict,
// 							district: data.student.contact.district,
// 							province: data.student.contact.province,
// 							postalCode: parseInt(data.student.contact.postalCode),
// 							country: data.student.contact.country,
// 							phones: {
// 								create: data.student.contact.phones // phones should be an array of phone objects with 'type' and 'number' fields
// 							}
// 						}
// 					}
// 				}
// 			}
// 		},

// 	});

// 	return NextResponse.json(res);
// }