/* eslint-disable no-unused-vars */
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useGetUsersQuery } from "@/redux/api/usersApiSlice";
import {
	useGetTotalOrdersQuery,
	useGetTotalSalesByDateQuery,
	useGetTotalSalesQuery,
} from "@/redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Package } from "lucide-react";

const Overview = () => {
	const { data: sales, isLoading } = useGetTotalSalesQuery();
	const { data: customers, isLoading: loading } = useGetUsersQuery();
	const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
	const { data: salesDetail } = useGetTotalSalesByDateQuery();

	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		if (salesDetail) {
			const formattedSalesDate = salesDetail.map((item) => ({
				x: item._id,
				y: item.totalSales,
			}));
			setChartData(formattedSalesDate);
		}
	}, [salesDetail]);

	return (
		<>
			<section className='xl:ml-[2rem] md:ml-[0rem]'>
				<div className='w-[80%] flex flex-col md:flex-row justify-around flex-wrap gap-4'>
					<Card className='w-full md:w-[10rem] lg:w-[15rem]'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Sales</CardTitle>
							<DollarSign className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>
								$ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
							</div>
						</CardContent>
					</Card>
					<Card className='w-full md:w-[10rem] lg:w-[15rem]'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Customers</CardTitle>
							<Users className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>
								{isLoading ? <Loader /> : customers?.length}
							</div>
						</CardContent>
					</Card>
					<Card className='w-full md:w-[10rem] lg:w-[15rem]'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>All Orders</CardTitle>
							<Package className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>
								{isLoading ? <Loader /> : orders?.totalOrders}
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className='ml-[10rem] mt-[4rem]'>
					<CardHeader>
						<CardTitle>Sales Trend</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width='100%' height={300}>
							<BarChart data={chartData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='x' />
								<YAxis />
								<Tooltip />
								<Bar dataKey='y' fill='hsl(var(--primary))' />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<div className='mt-[4rem]'>
					<OrderList />
				</div>
			</section>
		</>
	);
};

export default Overview;
