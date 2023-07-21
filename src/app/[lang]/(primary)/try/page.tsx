import {
	CalendarIcon,
	ChartPieIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
} from '@heroicons/react/24/outline'

import { ChevronLeftIcon, ChevronRightIcon, UserPlusIcon } from '@heroicons/react/20/solid'


const navigation = [
	{ name: 'หน้าแรก', href: '#', icon: HomeIcon, current: true },
	{ name: 'นักเรียน', href: '#', icon: UsersIcon, current: false },
	{ name: 'ครู', href: '#', icon: FolderIcon, current: false },
	{ name: 'คอร์ส', href: '#', icon: CalendarIcon, count: '', current: false },
	{ name: 'ห้อง', href: '#', icon: DocumentDuplicateIcon, current: false },
	{ name: 'เจ้าหน้าที่', href: '#', icon: DocumentDuplicateIcon, current: false },
]

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function Example() {
	return (
		// whole page
		<div className="flex">
			{/* sidebar */}
			<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 max-w-min h-screen">
				<div className="flex h-16 shrink-0 items-center justify-center">
					<img
						className="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
				</div>
				<nav className="flex flex-1 flex-col">
					<ul role="list" className="flex flex-1 flex-col gap-y-7">
						<li>
							<ul role="list" className="-mx-2 space-y-1">
								{navigation.map((item) => (
									<li key={item.name}>
										<a
											href={item.href}
											className={classNames(
												item.current
													? 'bg-gray-100 text-sky-600'
													: 'text-gray-700 hover:text-sky-600 hover:bg-gray-100',
												'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold truncate'
											)}
										>
											<item.icon
												className={classNames(
													item.current ? 'text-sky-600' : 'text-gray-400 group-hover:text-sky-600',
													'h-6 w-6 shrink-0'
												)}
												aria-hidden="true"
											/>
											{item.name}
											{item.count ? (
												<span
													className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
													aria-hidden="true"
												>
													{item.count}
												</span>
											) : null}
										</a>
									</li>
								))}
							</ul>
						</li>
						<li className="-mx-6 mt-auto">
							<a
								href="#"
								className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-sky-600 hover:bg-gray-100"
							>
								<img
									className="h-8 w-8 rounded-full bg-gray-50"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
								<span className="sr-only">Your profile</span>
								<span aria-hidden="true">Tom Cook</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			{/* header */}
			<div className="w-full p-4">
				<div>
					<nav className="sm:hidden" aria-label="Back">
						<a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
							<ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
							Back
						</a>
					</nav>
					<nav className="hidden sm:flex" aria-label="Breadcrumb">
						<ol role="list" className="flex items-center space-x-4">
							<li>
								<div className="flex">
									<a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
										Jobs
									</a>
								</div>
							</li>
							<li>
								<div className="flex items-center">
									<ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									<a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
										Engineering
									</a>
								</div>
							</li>
							<li>
								<div className="flex items-center">
									<ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
									<a href="#" aria-current="page" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
										Back End Developer
									</a>
								</div>
							</li>
						</ol>
					</nav>
				</div>
				<div className="mt-2 md:flex md:items-center md:justify-between">
					<div className="min-w-0 flex-1">
						<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							เจ้าหน้าที่
						</h2>
					</div>
					<div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
						<button
							type="button"
							className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
						>
							<UserPlusIcon className="h-5 w-5 flex-shrink-0 mr-2" aria-hidden="true" />

							เพิ่มเจ้าหน้าที่
						</button>
					</div>
				</div>
			</div>
			{/* table */}

		</div>
	)
}
// flex-shrink-0