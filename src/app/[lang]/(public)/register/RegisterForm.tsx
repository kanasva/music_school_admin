'use client'

import { useTransition, useState } from 'react';

interface Phone {
	type: string;
	number: string;
	[key: string]: string; // This allows any string to be used as a key.
}

export function RegisterForm() {
	const [formData, setFormData] = useState({
		givenName: '',
		middleName: '',
		familyName: '',
		nickName: '',
		dateOfBirth: '',
		gender: '',
		email: '',
		password: '',
		phones: [{ type: '', number: '' }, { type: '', number: '' }, { type: '', number: '' }] as Phone[],
		houseNo: '',
		building: '',
		floor: '',
		mooNo: 0,
		soi: '',
		road: '',
		subDistrict: '',
		district: '',
		province: '',
		postalCode: 0,
		country: ''
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
		const updatedPhones = [...formData.phones];
		updatedPhones[index][e.target.name] = e.target.value;
		setFormData({ ...formData, phones: updatedPhones });
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// alternative If we want users to upload their photo
		// const formData = new FormData(e.currentTarget);
		const body = {
			email: formData.email,
			password: formData.password,
			student: {
				givenName: formData.givenName,
				middleName: formData.middleName,
				familyName: formData.familyName,
				nickName: formData.nickName,
				dateOfBirth: formData.dateOfBirth,
				gender: formData.gender,
				contact: {
					houseNo: formData.houseNo,
					building: formData.building,
					floor: formData.floor,
					mooNo: formData.mooNo,
					soi: formData.soi,
					road: formData.road,
					subDistrict: formData.subDistrict,
					district: formData.district,
					province: formData.province,
					postalCode: formData.postalCode,
					country: formData.country,
					phones: formData.phones
				}
			}
		};
		const res = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		await res.json();
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="givenName">Given Name</label>
				<input type="text" id="givenName" name="givenName" value={formData.givenName} onChange={handleChange} placeholder="Given Name" />

				<label htmlFor="middleName">Middle Name</label>
				<input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />

				<label htmlFor="familyName">Family Name</label>
				<input type="text" id="familyName" name="familyName" value={formData.familyName} onChange={handleChange} placeholder="Family Name" />

				<label htmlFor="nickName">Nickname</label>
				<input type="text" id="nickName" name="nickName" value={formData.nickName} onChange={handleChange} placeholder="Nickname" />

				<label htmlFor="dateOfBirth">Date of Birth</label>
				<input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" />

				<div>
					<p>Gender</p>
					<label htmlFor="male">Male</label>
					<input
						type="radio"
						id="male"
						name="gender"
						value="MALE"
						checked={formData.gender === 'MALE'}
						onChange={handleChange}
					/>

					<label htmlFor="female">Female</label>
					<input
						type="radio"
						id="female"
						name="gender"
						value="FEMALE"
						checked={formData.gender === 'FEMALE'}
						onChange={handleChange}
					/>
				</div>

				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />

				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />

				{formData.phones.map((phone, index) => (
					<div key={index}>
						<label htmlFor={`phoneType${index}`}>Phone Type</label>
						<input type="text" id={`phoneType${index}`} name="type" value={phone.type} onChange={(e) => handlePhoneChange(e, index)} placeholder="Phone Type" />

						<label htmlFor={`phoneNumber${index}`}>Phone Number</label>
						<input type="text" id={`phoneNumber${index}`} name="number" value={phone.number} onChange={(e) => handlePhoneChange(e, index)} placeholder="Phone Number" />
					</div>
				))}

				<label htmlFor="houseNo">House Number</label>
				<input type="text" id="houseNo" name="houseNo" value={formData.houseNo} onChange={handleChange} placeholder="House Number" />

				<label htmlFor="building">Building</label>
				<input type="text" id="building" name="building" value={formData.building} onChange={handleChange} placeholder="Building" />

				<label htmlFor="floor">Floor</label>
				<input type="text" id="floor" name="floor" value={formData.floor} onChange={handleChange} placeholder="Floor" />

				<label htmlFor="mooNo">Moo Number</label>
				<input type="number" id="mooNo" name="mooNo" value={formData.mooNo} onChange={handleChange} placeholder="Moo Number" />

				<label htmlFor="soi">Soi</label>
				<input type="text" id="soi" name="soi" value={formData.soi} onChange={handleChange} placeholder="Soi" />

				<label htmlFor="road">Road</label>
				<input type="text" id="road" name="road" value={formData.road} onChange={handleChange} placeholder="Road" />

				<label htmlFor="subDistrict">Sub District</label>
				<input type="text" id="subDistrict" name="subDistrict" value={formData.subDistrict} onChange={handleChange} placeholder="Sub District" />

				<label htmlFor="district">District</label>
				<input type="text" id="district" name="district" value={formData.district} onChange={handleChange} placeholder="District" />

				<label htmlFor="province">Province</label>
				<input type="text" id="province" name="province" value={formData.province} onChange={handleChange} placeholder="Province" />

				<label htmlFor="postalCode">Postal Code</label>
				<input type="number" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" />

				<label htmlFor="country">Country</label>
				<input type="text" id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />

				<button type="submit">Register</button>
			</form>
		</div>
	)
}