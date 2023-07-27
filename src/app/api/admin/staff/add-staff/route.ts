import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
// import { authOptions } from "../auth/[...nextauth]/route"

enum RoleType {
	STUDENT = "STUDENT",
	TEACHER = "TEACHER",
	ADMIN = "ADMIN",
	MANAGER = "MANAGER"
}

enum GenderType {
	MALE = "MALE",
	FEMALE = "FEMALE",
	OTHER = "OTHER",
}

interface IncomingData {
	building: string;
	country: string;
	dateOfBirth: string;
	district: string;
	email: string;
	familyName: string;
	floor: string;
	gender: string;
	givenName: string;
	houseNo: string;
	lineId: string;
	middleName: string;
	mooNo: string;
	nickName: string;
	password: string;
	postalCode: string;
	primaryPhone: string;
	primaryPhoneType: string;
	province: string;
	road: string;
	secondaryPhone: string;
	secondaryPhoneType: string;
	soi: string;
	subDistrict: string;
}

interface PreparedData {
	email: string;
	password: string;
	role: RoleType.ADMIN;
	staff: {
		create: {
			givenName: string;
			middleName: string | null;
			familyName: string;
			nickName: string;
			dateOfBirth: Date;
			gender: GenderType
			lineId: string | null;
		};
	};
	address: {
		create: {
			houseNo: string;
			building: string | null;
			floor: string | null;
			mooNo: string | null;
			soi: string | null;
			road: string | null;
			subDistrict: string;
			district: string;
			province: string;
			postalCode: string;
			country: string;
		};
	};
	phone: {
		create: {
			number: string;
			type: string;
		}[];
	};
}

export async function POST(req: Request) {
	const data: IncomingData = await req.json();

	const preparedData: PreparedData = {
		email: data.email,
		password: data.password,
		role: RoleType.ADMIN,
		staff: {
			create: {
				givenName: data.givenName,
				middleName: data.middleName || null,
				familyName: data.familyName,
				nickName: data.nickName,
				dateOfBirth: new Date(data.dateOfBirth),
				gender: GenderType[data.gender.toUpperCase() as keyof typeof GenderType],
				lineId: data.lineId || null,
			},
		},
		address: {
			create: {
				houseNo: data.houseNo,
				building: data.building || null,
				floor: data.floor || null,
				mooNo: data.mooNo || null,
				soi: data.soi || null,
				road: data.road || null,
				subDistrict: data.subDistrict,
				district: data.district,
				province: data.province,
				postalCode: data.postalCode,
				country: data.country,
			},
		},
		phone: {
			create: [
				{
					number: data.primaryPhone,
					type: data.primaryPhoneType,
				},
				...(data.secondaryPhone
					? [
						{
							number: data.secondaryPhone,
							type: data.secondaryPhoneType || "", // default to empty string if it's not provided
						},
					]
					: []), // Don't create a second phone if it's not provided
			],
		},
	};

	try {
		const createdStaff = await prisma.user.create({
			data: preparedData,
		});

		return NextResponse.json(createdStaff);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message });
		}
		return NextResponse.json({ error: 'An unexpected error occurred.' });
	}
}