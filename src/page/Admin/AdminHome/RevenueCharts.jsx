import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các phần mở rộng của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const RevenueCharts = () => {
  // Dữ liệu mẫu cho doanh thu trong 12 tháng
  const monthlyRevenueData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: [1200000, 1500000, 1800000, 2000000, 2200000, 2500000, 2300000, 2400000, 2100000, 2600000, 2700000, 3000000],
        borderColor: "#34D399", // Màu viền (xanh lá)
        backgroundColor: "rgba(52, 211, 153, 0.2)", // Màu nền của các điểm dữ liệu
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Dữ liệu mẫu cho doanh thu trong tuần này
  const weeklyRevenueData = {
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: [150000, 180000, 200000, 220000, 240000, 210000, 250000],
        borderColor: "#3B82F6", // Màu viền (xanh dương)
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Màu nền của các điểm dữ liệu
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 space-y-40">
      {/* Biểu đồ doanh thu trong 12 tháng */}
      <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: "400px", width: "100%" }}>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Doanh thu trong 12 tháng</h3>
        <Line data={monthlyRevenueData} options={{
          responsive: true,
          maintainAspectRatio: false, // Đảm bảo chiều cao không bị kéo dài quá nhiều
          aspectRatio: 1.5, // Tỷ lệ khung hình cho biểu đồ
        }} />
      </div>

      {/* Biểu đồ doanh thu trong tuần này */}
      <div className="bg-white p-6 rounded-lg shadow-md my-20" style={{ height: "400px", width: "100%" }}>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Doanh thu trong tuần này</h3>
        <Bar data={weeklyRevenueData} options={{
          responsive: true,
          maintainAspectRatio: false, // Đảm bảo chiều cao không bị kéo dài quá nhiều
          aspectRatio: 1.5, // Tỷ lệ khung hình cho biểu đồ
        }} />
      </div>
    </div>
  );
};

export default RevenueCharts;
