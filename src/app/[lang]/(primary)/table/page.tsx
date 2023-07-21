import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "c27b4b73",
			amount: 200,
			status: "success",
			email: "johndoe@yahoo.com",
		},
		{
			id: "14d28e58",
			amount: 150,
			status: "failed",
			email: "janedoe@outlook.com",
		},
		{
			id: "24d3eb91",
			amount: 350,
			status: "processing",
			email: "customer1@example.com",
		},
		{
			id: "d12d8a0b",
			amount: 400,
			status: "pending",
			email: "customer2@example.com",
		},
		{
			id: "f51e8c28",
			amount: 175,
			status: "success",
			email: "customer3@example.com",
		},
		{
			id: "44e81a93",
			amount: 250,
			status: "failed",
			email: "customer4@example.com",
		},
		{
			id: "77b22b45",
			amount: 225,
			status: "processing",
			email: "customer5@example.com",
		},
		{
			id: "a8f28b76",
			amount: 275,
			status: "pending",
			email: "customer6@example.com",
		},
		{
			id: "b9245f87",
			amount: 325,
			status: "processing",
			email: "customer7@example.com",
		},
		{
			id: "cd39ea98",
			amount: 375,
			status: "success",
			email: "customer8@example.com",
		},
		{
			id: "d3f0bc29",
			amount: 425,
			status: "failed",
			email: "customer9@example.com",
		},
		{
			id: "e40d8f30",
			amount: 475,
			status: "processing",
			email: "customer10@example.com",
		},
		{
			id: "fa27d041",
			amount: 525,
			status: "pending",
			email: "customer11@example.com",
		},
		{
			id: "01b61c52",
			amount: 575,
			status: "success",
			email: "customer12@example.com",
		},
		{
			id: "13c46513",
			amount: 625,
			status: "failed",
			email: "customer13@example.com",
		},
		{
			id: "27d23b24",
			amount: 675,
			status: "processing",
			email: "customer14@example.com",
		},
		{
			id: "38f01235",
			amount: 725,
			status: "pending",
			email: "customer15@example.com",
		}
	]
}

export default async function DemoPage() {
	const data = await getData()

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	)
}


