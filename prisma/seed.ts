import { PrismaClient, RoleType, GenderType } from "@prisma/client"
import { hash } from "bcrypt"

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
  {
    email: "lisa.jones@example.com",
    password: "strongPassword4",
    givenName: "Lisa",
    middleName: "",
    familyName: "Jones",
    nickName: "Lis",
    dateOfBirth: new Date("1985-09-20"),
    gender: "female",
    lineId: "LisaJ85",
    houseNo: "42",
    building: "Cedar Heights",
    floor: "3",
    mooNo: "12",
    soi: "Maple Lane",
    road: "Main Street",
    subDistrict: "North",
    district: "Downtown",
    province: "Essex",
    postalCode: "34567",
    country: "UK",
    phone: [
      { number: "07700876543", type: "mobile" },
      { number: "02071234567", type: "work" },
    ],
  },
  {
    email: "david.wilson@example.com",
    password: "securePassword5",
    givenName: "David",
    middleName: "Michael",
    familyName: "Wilson",
    nickName: "Dave",
    dateOfBirth: new Date("1978-03-15"),
    gender: "male",
    lineId: "DaveW78",
    houseNo: "55",
    building: "Oak Residences",
    floor: "4",
    mooNo: "8",
    soi: "Beech Avenue",
    road: "Oak Street",
    subDistrict: "South",
    district: "Midtown",
    province: "Kent",
    postalCode: "45678",
    country: "UK",
    phone: [
      { number: "07700678901", type: "mobile" },
      { number: "02075678901", type: "work" },
    ],
  },
  {
    email: "emma.davies@example.com",
    password: "password123",
    givenName: "Emma",
    middleName: "Elizabeth",
    familyName: "Davies",
    nickName: "Em",
    dateOfBirth: new Date("1994-11-10"),
    gender: "female",
    lineId: "EmD94",
    houseNo: "23",
    building: "Willow View",
    floor: "2",
    mooNo: "3",
    soi: "Fern Lane",
    road: "Grove Road",
    subDistrict: "East",
    district: "Suburbia",
    province: "Surrey",
    postalCode: "56789",
    country: "UK",
    phone: [
      { number: "07700123456", type: "mobile" },
      { number: "02071234567", type: "work" },
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
