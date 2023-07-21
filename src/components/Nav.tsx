"use client"

import Link from 'next/link'


import { Sidebar } from 'flowbite-react';
import { HiHome, HiDocumentText, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";


export function Nav() {

	return (
		// <Sidebar
		// 	className="border-r-2 top-0 left-0 h-screen w-min"
		// 	aria-label="Default sidebar example"
		// >
		// 	<Sidebar.Items className="">
		// 		<Sidebar.ItemGroup>
		// 			<Sidebar.Item
		// 				href="#"
		// 				icon={HiHome}
		// 			>
		// 				<p>
		// 					Home
		// 				</p>
		// 			</Sidebar.Item>
		// 			<Sidebar.Item
		// 				href="#"
		// 				icon={PiStudentFill}
		// 			>
		// 				<p>
		// 					นักเรียน
		// 				</p>
		// 			</Sidebar.Item>
		// 			<Sidebar.Item
		// 				href="#"
		// 				icon={PiChalkboardTeacherFill}
		// 			>
		// 				<p>
		// 					ครู
		// 				</p>
		// 			</Sidebar.Item>
		// 			<Sidebar.Item
		// 				href="#"
		// 				icon={HiDocumentText}
		// 			>
		// 				<p>
		// 					คอร์ส
		// 				</p>
		// 			</Sidebar.Item>
		// 		</Sidebar.ItemGroup>
		// 	</Sidebar.Items>
		// </Sidebar>


		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/sign-in">Sign in</Link>
				</li>
				<li>
					<Link href="/register">Register</Link>
				</li>
				<li>
					<Link href="/session-check">Session Check</Link>
				</li>
			</ul>
		</nav >
	)
}