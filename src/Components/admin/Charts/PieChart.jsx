import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // Import Pie chart
import {
  useGetOrderMutation,
  useGetProductMutation,
  useGetUsersMutation,
} from "../../../redux/api/chartAPI";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js"; // Use ArcElement for Pie chart

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const PieChart = ({data}) => {
  const {
    chartData,
    stockChartData,
    orderChartData,
    userAdminData,
    userMonthlyData,
    userAgeData
  } = data;
  // const [getProduct, { data: products, isLoading, error }] =
  //   useGetProductMutation();
  // const [getOrder] = useGetOrderMutation();
  // const [getUser] = useGetUsersMutation();
  // const [chartData, setChartData] = useState({});
  // const [stockChartData, setStockChartData] = useState({});
  // const [orderChartData, setOrderChartData] = useState({});
  // const [userAdminData, setUserAdminData] = useState({});
  // const [userMonthlyData, setUserMonthlyData] = useState({});
  // const [userAgeData, setUserAgeData] = useState({});
  // const getRandomColor = () => {
  //   const r = Math.floor(Math.random() * 256);
  //   const g = Math.floor(Math.random() * 256);
  //   const b = Math.floor(Math.random() * 256);
  //   const a = (Math.random() * 0.5 + 0.4).toFixed(2);
  //   return `rgba(${r}, ${g}, ${b}, ${a})`;
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getProduct().unwrap();
  //       const order = await getOrder().unwrap();
  //       const users = await getUser().unwrap();

  //       console.log(users);

  //       processChartData(result.Products);
  //       processStockChartData(result.Products);
  //       processOrderStatusData(order.orders);
  //       processUserAdminData(users.users);
  //       processUserMonthlyData(users.users);
  //       processUserAgeData(users.users);
  //     } catch (err) {
  //       console.error("Error in mutation:", err);
  //     }
  //   };
  //   fetchData();
  // }, [getProduct]);

  // const processOrderStatusData = (orders) => {
  //   let processingCount = 0;
  //   let shippedCount = 0;
  //   let deliveredCount = 0;

  //   orders.forEach((order) => {
  //     switch (order.status) {
  //       case "Processing":
  //         processingCount += 1;
  //         break;
  //       case "Shipped":
  //         shippedCount += 1;
  //         break;
  //       case "Delivered":
  //         deliveredCount += 1;
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   setOrderChartData({
  //     labels: ["Processing", "Shipped", "Delivered"],
  //     datasets: [
  //       {
  //         label: "Order Status",
  //         data: [processingCount, shippedCount, deliveredCount],
  //         backgroundColor: [
  //          getRandomColor,
  //           getRandomColor,
  //           getRandomColor,
  //         ],
  //         borderColor: [
  //           "rgba(255, 205, 86, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(75, 192, 192, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processChartData = (products) => {
  //   // Group stocks by category
  //   const categoryMap = {};

  //   products &&
  //     products.forEach((item) => {
  //       categoryMap[item.category] =
  //         (categoryMap[item.category] || 0) + item.stock;
  //     });

  //   // Prepare data for Chart.js
  //   const labels = Object.keys(categoryMap);
  //   const stockData = Object.values(categoryMap);

  //   setChartData({
  //     labels,
  //     datasets: [
  //       {
  //         label: "Stock per Category",
  //         data: stockData,
  //         backgroundColor: getRandomColor,
  //         borderColor: "rgba(75, 192, 192, 1)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processStockChartData = (products) => {
  //   let inStockCount = 0;
  //   let outOfStockCount = 0;

  //   products &&
  //     products.forEach((item) => {
  //       if (item.stock > 0) {
  //         inStockCount += 1;
  //       } else {
  //         outOfStockCount += 1;
  //       }
  //     });

  //   setStockChartData({
  //     labels: ["In Stock", "Out of Stock"],
  //     datasets: [
  //       {
  //         label: "Stock Status",
  //         data: [inStockCount, outOfStockCount],
  //         backgroundColor: [
  //           "rgba(54, 162, 235, 0.6)",
  //           "rgba(255, 99, 132, 0.6)",
  //         ],
  //         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processUserAdminData = (users) => {
  //   let userCount = 0;
  //   let adminCount = 0;

  //   users.forEach((user) => {
  //     if (user.role === "user") userCount += 1;
  //     if (user.role === "admin") adminCount += 1;
  //   });

  //   setUserAdminData({
  //     labels: ["Users", "Admins"],
  //     datasets: [
  //       {
  //         label: "User vs Admin",
  //         data: [userCount, adminCount],
  //         backgroundColor: [
  //           "rgba(75, 192, 192, 0.6)",
  //           "rgba(255, 99, 132, 0.6)",
  //         ],
  //         borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processUserMonthlyData = (users) => {
  //   const monthlyCount = Array(6).fill(0);
  //   const labels = [];

  //   for (let i = 5; i >= 0; i--) {
  //     const month = dayjs().subtract(i, "month").format("MMM YYYY");
  //     labels.push(month);
  //   }

  //   users.forEach((user) => {
  //     const userMonth = dayjs(user.createdAt).format("MMM YYYY");
  //     const monthIndex = labels.indexOf(userMonth);
  //     if (monthIndex >= 0) monthlyCount[monthIndex] += 1;
  //   });

  //   setUserMonthlyData({
  //     labels,
  //     datasets: [
  //       {
  //         label: "New Users per Month",
  //         data: monthlyCount,
  //         backgroundColor: "rgba(153, 102, 255, 0.6)",
  //         borderColor: "rgba(153, 102, 255, 1)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processUserAgeData = (users) => {
  //   let ageGroup1 = 0; // 18-25
  //   let ageGroup2 = 0; // 26-35
  //   let ageGroup3 = 0; // 36-45
  //   let ageGroup4 = 0; // 46+

  //   users.forEach((user) => {
  //     if (user.age >= 18 && user.age <= 25) ageGroup1 += 1;
  //     else if (user.age >= 26 && user.age <= 35) ageGroup2 += 1;
  //     else if (user.age >= 36 && user.age <= 45) ageGroup3 += 1;
  //     else if (user.age >= 46) ageGroup4 += 1;
  //   });

  //   setUserAgeData({
  //     labels: ["18-25", "26-35", "36-45", "46+"],
  //     datasets: [
  //       {
  //         label: "User Age Groups",
  //         data: [ageGroup1, ageGroup2, ageGroup3, ageGroup4],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.6)",
  //           "rgba(54, 162, 235, 0.6)",
  //           "rgba(255, 206, 86, 0.6)",
  //           "rgba(75, 192, 192, 0.6)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data.</p>;

  return (
    <div className="chart-container">
      {/* Stock Distribution per Category Pie Chart */}
      {chartData.labels && (
        <div className="chart-section">
          <h3>Stock Distribution per Category</h3>
          <Pie data={chartData} />
        </div>
      )}

      {/* Stock Status Pie Chart */}
      {stockChartData.labels && (
        <div className="chart-section">
          <h3>Stock Status (In vs Out of Stock)</h3>
          <Pie data={stockChartData} />
        </div>
      )}

      {/* Order Status Pie Chart */}
      {orderChartData.labels && (
        <div className="chart-section">
          <h3>Order Status (Processing, Shipped, Delivered)</h3>
          <Pie data={orderChartData} />
        </div>
      )}

      {/* User vs Admin Pie Chart */}
      {userAdminData.labels && (
        <div className="chart-section">
          <h3>User vs Admin</h3>
          <Pie data={userAdminData} />
        </div>
      )}

      {/* User Age Group Pie Chart */}
      {userAgeData.labels && (
        <div className="chart-section">
          <h3>Users by Age Group</h3>
          <Pie data={userAgeData} />
        </div>
      )}

      {/* New Users per Month Pie Chart */}
      {userMonthlyData.labels && (
        <div className="chart-section">
          <h3>New Users per Month</h3>
          <Pie data={userMonthlyData} />
        </div>
      )}
    </div>
  );
};

export default PieChart;
