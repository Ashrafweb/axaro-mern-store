import Message from "@/components/Message";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "@/redux/api/orderApiSlice";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

const OrderList = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery();

	const columns = useMemo(
		() => [
			{
				accessorKey: "orderItems",
				header: "Items",
				cell: ({ row }) => (
					<img
						src={row.original.orderItems[0].image}
						alt={row.original._id}
						className='w-12 h-12 object-cover rounded'
					/>
				),
			},
			{
				accessorKey: "_id",
				header: "ID",
				cell: ({ row }) => (
					<span className='font-mono text-sm'>{row.original._id}</span>
				),
			},
			{
				accessorKey: "user",
				header: "User",
				cell: ({ row }) =>
					row.original.user ? row.original.user.username : "N/A",
			},
			{
				accessorKey: "createdAt",
				header: "Date",
				cell: ({ row }) =>
					row.original.createdAt
						? new Date(row.original.createdAt).toLocaleDateString()
						: "N/A",
			},
			{
				accessorKey: "totalPrice",
				header: "Total",
				cell: ({ row }) => `$${row.original.totalPrice}`,
			},
			{
				accessorKey: "isPaid",
				header: "Paid",
				cell: ({ row }) =>
					row.original.isPaid ? (
						<Badge variant='default'>Paid</Badge>
					) : (
						<Badge variant='destructive'>Pending</Badge>
					),
			},
			{
				accessorKey: "isDelivered",
				header: "Delivered",
				cell: ({ row }) =>
					row.original.isDelivered ? (
						<Badge variant='default'>Delivered</Badge>
					) : (
						<Badge variant='destructive'>Pending</Badge>
					),
			},
			{
				id: "actions",
				header: "Actions",
				cell: ({ row }) => (
					<Link to={`/order/${row.original._id}`}>
						<button className='btn-primary'>View</button>
					</Link>
				),
			},
		],
		[]
	);

	const table = useReactTable({
		data: orders || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<div className='container mx-auto py-10'>
					<h1 className='text-2xl font-bold mb-6'>Orders</h1>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className='h-24 text-center'
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			)}
		</>
	);
};

export default OrderList;
