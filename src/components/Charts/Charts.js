import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart, Sector,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import NavBar from "../NavBar/NavBar";

export default class Charts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mostActiveUsersData : null,
      citiesWithMostUsersData : null,
      activeIndex: 0,
    };
  }

  componentWillMount() {
    this.renderMyData();
  }

  renderMyData(){

    const urls = [
      "http://localhost:8080/api/reports/v1?reportType=MOST_ACTIVE_USERS"
    ];
    const requests = urls.map(function(url) {
      return fetch(url, {
        method: "GET"
      })
        .then(function(response) {
          return response.json();
        });
    });
    Promise.all(requests)
      .then((results) => {
        this.setState({ mostActiveUsersData : results[0].activeUsers })
      }).catch(function(err) {
      console.log(err);
    });

    const citiesUrls = [
      "http://localhost:8080/api/reports/v1?reportType=CITIES_WITH_MOST_USERS"
    ];
    const citiesRequests = citiesUrls.map(function(url) {
      return fetch(url, {
        method: "GET"
      })
        .then(function(response) {
          return response.json();
        });
    });
    Promise.all(citiesRequests)
      .then((results) => {
        console.log("fetched " +results[0].cities)
        this.setState({ citiesWithMostUsersData : results[0].cities })
      }).catch(function(err) {
      console.log(err);
    });
  }

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {

    console.log("value of citiesWithMostUsersData during render = "
      + this.state.citiesWithMostUsersData)

    if (this.state.citiesWithMostUsersData === null) {
      this.renderMyData();
    }

    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, usersCount } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';

      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${usersCount} users`}</text>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(${(percent * 100).toFixed(2)}% from total)`}
          </text>
        </g>
      );
    };

    return (
      <>
        <NavBar/>
        <h1 style={{marginTop: "100px"}}>Cities with biggest number of users</h1>
        <div style={{zIndex: 1}}>
          <PieChart width={600} height={300} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.state.citiesWithMostUsersData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              fill="#8884d8"
              dataKey="usersCount"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </div>
        <h1 style={{marginTop: "100px"}}>Most active users</h1>
        <div>
          <BarChart
            width={1200}
            height={150}
            data={this.state.mostActiveUsersData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="email" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="messagesSent" fill="#82ca9d" />
          </BarChart>
        </div>
      </>
    );
  }
}