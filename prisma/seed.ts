import { PrismaClient, RoleType, GenderType } from "@prisma/client"
import { hash } from "bcrypt"

// const prisma = new PrismaClient();

// async function main() {
//   const password = await hash("aaa", 12);
//   const user = await prisma.user.upsert({
//     where: { email: "aaa@aaa.com" },
//     update: {},
//     create: {
//       email: "aaa@aaa.com",
//       password: password,
//       role: "STUDENT",
//     },
//   });
//   const password2 = await hash("bbb", 12);
//   const user2 = await prisma.user.upsert({
//     where: { email: "bbb@bbb.com" },
//     update: {},
//     create: {
//       email: "bbb@bbb.com",
//       password: password2,
//       role: "TEACHER",
//     },
//   });
//   const password3 = await hash("ccc", 12);
//   const user3 = await prisma.user.upsert({
//     where: { email: "ccc@ccc.com" },
//     update: {},
//     create: {
//       email: "ccc@ccc.com",
//       password: password3,
//       role: "ADMIN",
//     },
//   });
//   const password4 = await hash("ddd", 12);
//   const user4 = await prisma.user.upsert({
//     where: { email: "ddd@ddd.com" },
//     update: {},
//     create: {
//       email: "ddd@ddd.com",
//       password: password4,
//       role: "MANAGER",
//     },
//   });
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

const prisma = new PrismaClient()

const mockStaffs = [
  {
    email: "jane.doe@example.com",
    password: "securePassword1",
    givenName: "Jane",
    middleName: "Elaine",
    familyName: "Doe",
    nickName: "Janie",
    dateOfBirth: new Date("1985-07-12"),
    gender: "female",
    lineId: "JaneD85",
    houseNo: "42",
    building: "Elm Tree Court",
    floor: "3",
    mooNo: "2",
    soi: "Palm Street",
    road: "Maple Avenue",
    subDistrict: "Central",
    district: "Downtown",
    province: "Somerset",
    postalCode: "98765",
    country: "UK",
    phone: [
      { number: "07700123456", type: "mobile" },
      { number: "02071234567", type: "work" },
    ],
  },
  {
    email: "john.smith@example.com",
    password: "securePassword2",
    givenName: "John",
    middleName: "Alexander",
    familyName: "Smith",
    nickName: "Johnny",
    dateOfBirth: new Date("1990-12-05"),
    gender: "male",
    lineId: "JohnS90",
    houseNo: "33",
    building: "Birch Apartments",
    floor: "1",
    mooNo: "5",
    soi: "Elm Lane",
    road: "High Street",
    subDistrict: "East",
    district: "Uptown",
    province: "Suffolk",
    postalCode: "12345",
    country: "UK",
    phone: [
      { number: "07700987654", type: "mobile" },
      { number: "02079876543", type: "work" },
    ],
  },
  {
    email: "sarah.connor@example.com",
    password: "securePassword3",
    givenName: "Sarah",
    middleName: "Jane",
    familyName: "Connor",
    nickName: "Sarah",
    dateOfBirth: new Date("2000-05-01"),
    gender: "female",
    lineId: "SarahC00",
    houseNo: "17",
    building: "Pine View",
    floor: "2",
    mooNo: "7",
    soi: "Rose Alley",
    road: "Parkway",
    subDistrict: "West",
    district: "Suburbia",
    province: "Norfolk",
    postalCode: "67890",
    country: "UK",
    phone: [
      { number: "07700543210", type: "mobile" },
      { number: "02074321098", type: "work" },
    ],
  },
]

async function main() {
  for (const data of mockStaffs) {
    const preparedData = {
      // prepare your data here just like your POST function
      email: data.email,
      password: await hash(data.password, 12),
      role: RoleType.ADMIN,
      staff: {
        create: {
          givenName: data.givenName,
          middleName: data.middleName || null,
          familyName: data.familyName,
          nickName: data.nickName,
          dateOfBirth: data.dateOfBirth,
          gender:
            GenderType[data.gender.toUpperCase() as keyof typeof GenderType],
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
        create: data.phone.map((phone, index) => ({
          number: phone.number,
          priority: index + 1,
          type: phone.type,
        })),
      },
    }

    try {
      const createdStaff = await prisma.user.create({
        data: preparedData,
      })
      console.log("Created staff:", createdStaff)
    } catch (error) {
      console.error("Error creating staff:", error)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
