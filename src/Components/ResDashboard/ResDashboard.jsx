import React, { useState, useEffect } from "react";
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
import "./ResDashboard.css";

const ResDashboard = () => {
  // State for interactive elements
  const [timeFilter, setTimeFilter] = useState("Daily");
  const [hoveredStat, setHoveredStat] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({
    orders: 0,
    revenue: 0,
    customers: 0,
    satisfaction: 0
  });

  // Sample data for restaurant metrics
  const ordersData = [
    { time: "9AM", orders: 12 },
    { time: "11AM", orders: 25 },
    { time: "1PM", orders: 48 },
    { time: "3PM", orders: 18 },
    { time: "5PM", orders: 32 },
    { time: "7PM", orders: 56 },
    { time: "9PM", orders: 42 },
  ];

  const foodWasteData = [
    { name: "Used", value: 75 },
    { name: "Donated", value: 15 },
    { name: "Wasted", value: 10 },
  ];
  const wasteColors = ["#38a169", "#FF7A00", "#e53e3e"];

  const menuPerformanceData = [
    { item: "Burger", orders: 120, revenue: 840 },
    { item: "Pizza", orders: 95, revenue: 1140 },
    { item: "Salad", orders: 60, revenue: 300 },
    { item: "Pasta", orders: 85, revenue: 935 },
    { item: "Dessert", orders: 70, revenue: 420 },
  ];

  // Animation for stat counters
  useEffect(() => {
    const targetStats = {
      orders: 342,
      revenue: 5280,
      customers: 218,
      satisfaction: 94
    };
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    const counters = {};
    Object.keys(targetStats).forEach(stat => {
      counters[stat] = setInterval(() => {
        setAnimatedStats(prev => {
          const current = prev[stat];
          const target = targetStats[stat];
          const increment = Math.ceil((target - current) / 10);
          
          if (current < target) {
            return {...prev, [stat]: current + increment > target ? target : current + increment};
          } else {
            clearInterval(counters[stat]);
            return prev;
          }
        });
      }, interval);
    });
    
    return () => {
      Object.values(counters).forEach(intervalId => clearInterval(intervalId));
    };
  }, []);

  // Custom tooltips
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            <span className="tooltip-dot" style={{backgroundColor: "#FF7A00"}}></span>
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            Orders: {payload[0].value}
          </p>
          <p className="tooltip-value">
            Revenue: ${payload[0].payload.revenue}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom active shape for pie chart
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <circle cx={cx} cy={cy} r={outerRadius + 5} fill={fill} fillOpacity={0.3} />
        <circle cx={cx} cy={cy} r={outerRadius} fill={fill} />
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fff" fontWeight="bold">
          {`${props.value}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Restaurant Operations Dashboard</h1>
        <p>Monitoring restaurant performance and food management</p>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div 
          className={`stat-card ${hoveredStat === 'orders' ? 'stat-card-hover' : ''}`}
          onMouseEnter={() => setHoveredStat('orders')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="stat-icon">
            <i className="fas fa-utensils"></i>
          </div>
          <div className="stat-content">
            <h3>Today's Orders</h3>
            <p className="stat-value">{animatedStats.orders}</p>
            <p className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 8.5% from yesterday
            </p>
          </div>
        </div>

        <div 
          className={`stat-card ${hoveredStat === 'revenue' ? 'stat-card-hover' : ''}`}
          onMouseEnter={() => setHoveredStat('revenue')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>Today's Revenue</h3>
            <p className="stat-value">${animatedStats.revenue}</p>
            <p className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 12.3% from yesterday
            </p>
          </div>
        </div>

        <div 
          className={`stat-card ${hoveredStat === 'customers' ? 'stat-card-hover' : ''}`}
          onMouseEnter={() => setHoveredStat('customers')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Customers Served</h3>
            <p className="stat-value">{animatedStats.customers}</p>
            <p className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 5.7% from yesterday
            </p>
          </div>
        </div>

        <div 
          className={`stat-card ${hoveredStat === 'satisfaction' ? 'stat-card-hover' : ''}`}
          onMouseEnter={() => setHoveredStat('satisfaction')}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="stat-icon">
            <i className="fas fa-star"></i>
          </div>
          <div className="stat-content">
            <h3>Customer Satisfaction</h3>
            <p className="stat-value">{animatedStats.satisfaction}%</p>
            <p className="stat-trend positive">
              <i className="fas fa-plus"></i> 2% from last week
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Line Chart */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Orders Throughout the Day</h3>
            <div className="chart-filter">
              <button 
                className={`filter-btn ${timeFilter === "Daily" ? "active" : ""}`}
                onClick={() => setTimeFilter("Daily")}
              >
                Daily
              </button>
              <button 
                className={`filter-btn ${timeFilter === "Weekly" ? "active" : ""}`}
                onClick={() => setTimeFilter("Weekly")}
              >
                Weekly
              </button>
              <button 
                className={`filter-btn ${timeFilter === "Monthly" ? "active" : ""}`}
                onClick={() => setTimeFilter("Monthly")}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={<CustomLineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#FF7A00"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#FF7A00", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8, fill: "#FF7A00", stroke: "#fff", strokeWidth: 2 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side by side charts */}
        <div className="side-by-side-charts">
          {/* Food Utilization */}
          <div className="chart-card">
            <h3>Food Utilization</h3>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={foodWasteData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    activeShape={renderActiveShape}
                    animationDuration={500}
                  >
                    {foodWasteData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={wasteColors[index]} 
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="chart-card">
            <h3>Restaurant Metrics</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-percentage"></i> Table Turnover
                </span>
                <span className="stat-figure">2.3x</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-clock"></i> Avg. Preparation Time
                </span>
                <span className="stat-figure">18 min</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-utensil-spoon"></i> Most Popular Item
                </span>
                <span className="stat-figure">Burger</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  <i className="fas fa-share-alt"></i> Food Donated (lbs)
                </span>
                <span className="stat-figure">24</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="bottom-charts">
        <div className="chart-card">
          <h3>Menu Performance</h3>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={menuPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="item" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar 
                  yAxisId="left"
                  dataKey="orders" 
                  fill="#FF7A00" 
                  barSize={40} 
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Kitchen Efficiency</h3>
          <div className="map-placeholder interactive-map">
            <i className="fas fa-blender"></i>
            <p>Kitchen Performance</p>
            <span>92% efficiency rating</span>
            <div className="map-hover-info">
              Orders prepared: 342 | Waste reduced: 15%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResDashboard;  