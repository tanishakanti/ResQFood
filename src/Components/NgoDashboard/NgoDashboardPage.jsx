import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./NgoDashboardPage.css";

const NgoDashboardPage = () => {
  // Sample data
  const lineData = [
    { month: "Jan", meals: 150 },
    { month: "Feb", meals: 200 },
    { month: "Mar", meals: 170 },
    { month: "Apr", meals: 250 },
    { month: "May", meals: 300 },
    { month: "Jun", meals: 280 },
    { month: "Jul", meals: 350 },
  ];

  const pieData = [
    { name: "Accepted", value: 80 },
    { name: "Pending", value: 15 },
    { name: "Expired", value: 5 },
  ];
  const pieColors = ["#FF7A00", "#C9B6E4", "#F9C7D0"];

  const barData = [
    { type: "Bakery", value: 120 },
    { type: "Produce", value: 95 },
    { type: "Dairy", value: 60 },
    { type: "Prepared Meals", value: 150 },
    { type: "Canned Goods", value: 110 },
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Food Rescue Dashboard</h1>
        <p>Monitoring food rescue operations and impact analytics</p>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-utensils"></i>
          </div>
          <div className="stat-content">
            <h3>Meals Collected/Saved</h3>
            <p className="stat-value">1,704</p>
            <p className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 12.5% from last week
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Daily Beneficiaries</h3>
            <p className="stat-value">342</p>
            <p className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 8.2% from last week
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-box-open"></i>
          </div>
          <div className="stat-content">
            <h3>Donations Accepted</h3>
            <p className="stat-value">628</p>
            <p className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 5.7% from last week
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-hands-helping"></i>
          </div>
          <div className="stat-content">
            <h3>Volunteers & NGOs</h3>
            <p className="stat-value">52</p>
            <p className="stat-trend positive">
              <i className="fas fa-plus"></i> 3 new this month
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Line Chart */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Meals Saved Over Time</h3>
            <div className="chart-filter">
              <button className="filter-btn active">Monthly</button>
              <button className="filter-btn">Quarterly</button>
              <button className="filter-btn">Yearly</button>
            </div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="meals"
                  stroke="#FF7A00"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side by side charts */}
        <div className="side-by-side-charts">
          {/* Donation Status */}
          <div className="chart-card">
            <h3>Donation Status</h3>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="chart-card">
            <h3>Quick Stats</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-star"></i> Success Rate
                </span>
                <span className="stat-figure">95%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-box"></i> Donations Today
                </span>
                <span className="stat-figure">68</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-city"></i> Cities Covered
                </span>
                <span className="stat-figure">12</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-clock"></i> Avg. Response Time
                </span>
                <span className="stat-figure">28 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="bottom-charts">
        <div className="chart-card">
          <h3>Donations by Food Type</h3>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF7A00" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Restaurant Locations</h3>
          <div className="map-placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <p>Interactive Map View</p>
            <span>12 active locations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDashboardPage;