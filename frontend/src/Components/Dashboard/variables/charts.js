// Daily Traffic Dashboards Default

export const barChartDataDailyTraffic = [
    {
      name: "Daily Traffic",
      data: [20, 30, 40, 20, 45, 50, 30],
    },
  ];
  
  export const barChartOptionsDailyTraffic = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: ["00", "04", "08", "12", "14", "16", "18"],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  };
  
  // Consumption Users Reports
  
  export const barChartDataConsumption = [
    {
      name: "PRODUCT A",
      data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
    {
      name: "PRODUCT B",
      data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
    {
      name: "PRODUCT C",
      data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    },
  ];
  
  export const barChartOptionsConsumption = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
  
    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
  };
  
  export const pieChartOptions = {
    labels: ["Your files", "System", "Empty"],
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };
  
  export const pieChartData = [63, 25, 12];
  
  // Total Spent Default

  export const completeOrderHistory = {
    "5/8/24": { cost: 1952.75, lbs: 1640.03, packageCount: 63 },
    "5/10/24": { cost: 1305.44, lbs: 1287.55, packageCount: 42 },
    "5/14/24": { cost: 1883.11, lbs: 1183.37, packageCount: 48 },
    "5/17/24": { cost: 1864.50, lbs: 1364.05, packageCount: 49 },
    "5/20/24": { cost: 1505.11, lbs: 1396.48, packageCount: 48 },
    "5/24/24": { cost: 2683.53, lbs: 1993.52, packageCount: 74 },
    "5/29/24": { cost: 1975.17, lbs: 1339.40, packageCount: 51 },
    "6/01/24": { cost: 1986.45, lbs: 1667.80, packageCount: 57 },
    "6/05/24": { cost: 2066.71, lbs: 1553.39, packageCount: 59 },
    "6/08/24": { cost: 1889.91, lbs: 1316.42, packageCount: 56 },
    "6/12/24": { cost: 2600.96, lbs: 1851.07, packageCount: 67 },
    "6/15/24": { cost: 1275.45, lbs: 1278.21, packageCount: 48 },
    "6/19/24": { cost: 1440.75, lbs: 973.64, packageCount: 36 },
    "6/22/24": { cost: 1896.25, lbs: 1334.71, packageCount: 53 },
    "6/26/24": { cost: 1493.41, lbs: 1215.77, packageCount: 43 },
    "6/29/24": { cost: 2587.51, lbs: 1765.43, packageCount: 59 },
    "7/03/24": { cost: 1493.25, lbs: 1226.80, packageCount: 24 },
    "7/06/24": { cost: 818.10, lbs: 623.34, packageCount: 41 },
    "7/11/24": { cost: 1091.75, lbs: 1203.55, packageCount: 39 },
    "7/13/24": { cost: 1787.07, lbs: 1092.02, packageCount: 44 },
    "7/17/24": { cost: 1413.20, lbs: 1192.89, packageCount: 38 },
    "7/20/24": { cost: 1391.19, lbs: 1089.11, packageCount: 40 },
    "7/23/24": { cost: 1148.20, lbs: 1264.65, packageCount: 43 },
    "7/26/24": { cost: 1619.85, lbs: 1132.30, packageCount: 36 },
    "7/29/24": { cost: 944.95, lbs: 889.80, packageCount: 42 },
    "8/02/24": { cost: 1101.15, lbs: 1101.24, packageCount: 38 },
    "8/05/24": { cost: 1678.47, lbs: 1058.08, packageCount: 56 },
    "8/08/24": { cost: 2078.19, lbs: 1398.20, packageCount: 26 },
    "8/10/24": { cost: 1032.67, lbs: 935.78, packageCount: 33 },
    "8/12/24": { cost: 1032.80, lbs: 934.40, packageCount: 35 },
    "8/16/24": { cost: 1236.49, lbs: 1056.20, packageCount: 51 },
    "8/19/24": { cost: 1759.80, lbs: 1465.87, packageCount: 55 },
    "8/24/24": { cost: 1775.38, lbs: 1398.88, packageCount: 57 },
    "8/28/24": { cost: 2529.84, lbs: 1588.26, packageCount: 59 },
    "8/31/24": { cost: 1737.09, lbs: 1482.53, packageCount: 48 },
    "9/04/24": { cost: 1506.09, lbs: 1327.14, packageCount: 52 },
    "9/07/24": { cost: 1610.20, lbs: 1330.88, packageCount: 48 },
    "9/11/24": { cost: 1766.05, lbs: 1419.80, packageCount: 48 },
    "9/14/24": { cost: 1579.73, lbs: 1295.33, packageCount: 36 },
    "9/16/24": { cost: 1915.42, lbs: 1171.50, packageCount: 51 },
    "9/19/24": { cost: 1582.63, lbs: 1219.46, packageCount: 49 },
    "9/23/24": { cost: 1285.69, lbs: 1301.04, packageCount: 45 },
    "9/26/24": { cost: 1906.14, lbs: 1400.97, packageCount: 35 },
    "9/28/24": { cost: 1075.71, lbs: 849.30, packageCount: 53 },
    "10/2/24": { cost: 1932.73, lbs: 1332.63, packageCount: 55 },
    "10/7/24": { cost: 1448.99, lbs: 1430.61, packageCount: 60 },
    "10/10/24": { cost: 2812.98, lbs: 1799.15, packageCount: 33 },
    "10/14/24": { cost: 911.15, lbs: 874.80, packageCount: 49 },
    "10/17/24": { cost: 1476.65, lbs: 1426.30, packageCount: 32 },
    "10/19/24": { cost: 1185.79, lbs: 875.14, packageCount: 52 },
    "10/23/24": { cost: 1688.86, lbs: 1440.80, packageCount: 30 },
    "10/25/24": { cost: 1000.30, lbs: 854.40, packageCount: 58 },
    "10/28/24": { cost: 2038.29, lbs: 1630.67, packageCount: 68 },
    "11/1/24": { cost: 2236.16, lbs: 1822.33, packageCount: 40 },
    "11/04/24": { cost: 1574.61, lbs: 870.75, packageCount: 47 },
    "11/09/24": { cost: 1290.65, lbs: 1342.55, packageCount: 56 },
    "11/14/24": { cost: 2088.97, lbs: 1518.42, packageCount: 30 },
    "11/16/24": { cost: 1177.75, lbs: 830.10, packageCount: 45 },
    "11/20/24": { cost: 2198.85, lbs: 1362.43, packageCount: 40 },
    "11/23/24": { cost: 1376.14, lbs: 1142.14, packageCount: 49 },
    "11/27/24": { cost: 1703.52, lbs: 1346.86, packageCount: 34 },
    "11/29/24": { cost: 988.47, lbs: 951.23, packageCount: 38 },
    "12/02/24": { cost: 1492.88, lbs: 1038.39, packageCount: 38 }
  };
  

  export const orderCosts = [1952.75, 1305.44, 1883.11, 1864.50, 1505.11, 2683.53, 1975.17, 1986.45, 2066.71, 1889.91, 2600.96, 1275.45, 1440.75, 1896.25, 1493.41, 2587.51, 1493.25, 818.10, 1091.75, 1787.07, 1413.20, 1391.19, 1148.20, 1619.85, 944.95, 1101.15, 1678.47, 2078.19, 1032.67, 1032.80, 1236.49, 1759.80, 1775.38, 2529.84, 1737.09, 1506.09, 1610.20, 1766.05, 1579.73, 1915.42, 1582.63, 1285.69, 1906.14, 1075.71, 1932.73, 1448.99, 2812.98, 911.15, 1476.65, 1185.79, 1688.86, 1000.30, 2038.29, 2236.16, 1574.61, 1290.65, 2088.97, 1177.75, 2198.85, 1376.14, 1703.52, 988.47, 1492.88, 1695.92, 1090.45, 1713.34, 1387.15, 1591.64, 1112.25];
  export const orderlbs =   [1640.03, 1287.55, 1183.37, 1364.05, 1396.48, 1993.52, 1339.40, 1667.80, 1553.39, 1316.42, 1851.07, 1278.21, 973.64, 1334.71, 1215.77, 1765.43, 1226.80,  623.34, 1203.55, 1092.02, 1192.89, 1089.11, 1264.65, 1132.30, 889.80, 1101.24, 1058.08, 1398.20, 935.78, 934.40, 1056.20, 1465.87, 1398.88, 1588.26, 1482.53, 1327.14, 1330.88, 1419.80, 1295.33, 1171.50, 1219.46, 1301.04, 1400.97, 849.30, 1332.63, 1430.61, 1799.15, 874.80, 1426.30, 875.14, 1440.80, 854.40, 1630.67, 1822.33, 870.75, 1342.55, 1518.42, 830.10, 1362.43, 1142.14, 1346.86, 951.23, 1038.39, 1662.03, 889.33, 1218.11, 1387.15, 1167.05, 1049.55];
  export const orderpackagecounts = [63, 42, 48, 49, 48, 74, 51, 57, 59, 56, 67, 48, 36, 53, 43, 59, 24, 41, 39, 44, 38, 40, 43, 36, 42, 38, 56, 26, 33, 35, 51, 55, 57, 59, 48, 52, 48, 48, 36, 51, 49, 45, 35, 53, 55, 60, 33, 49, 32, 52, 30, 58, 68, 40, 47, 56, 30, 45, 40, 49, 34, 38, 62, 35, 44, 31, 43, 39];
  export const orderdates = ["5/8/24", "5/10/24", "5/14/24", "5/17/24", "5/20/24", "5/24/24", "5/29/24", "6/01/24", "6/05/24", "6/08/24", "6/12/24", "6/15/24", "6/19/24", "6/22/24", "6/26/24", "6/29/24", "7/03/24", "7/06/24", "7/11/24", "7/13/24", "7/17/24", "7/20/24", "7/23/24", "7/26/24", "7/29/24", "8/02/24", "8/05/24", "8/08/24", "8/10/24", "8/12/24", "8/16/24", "8/19/24", "8/24/24", "8/28/24", "8/31/24", "9/04/24", "9/07/24", "9/11/24", "9/14/24", "9/16/24", "9/19/24","9/23/24", "9/26/24", "9/28/24", "10/2/24", "10/7/24", "10/10/24","10/14/24", "10/17/24", "10/19/24", "10/23/24", "10/25/24","10/28/24", "11/1/24", "11/04/24", "11/09/24", "11/14/24", "11/16/24","11/20/24", "11/23/24", "11/27/24", "11/29/24", "12/02/24", "12/7/24", "12/11/24", "12/13/24", "12/16/24", "12/20/24", "12/23/24"];

  export const lineChartDataTotalSpent = [
    {
      name: "Ingredient Costs",
      data: orderCosts,
      //1952.75, 1305.44, 1883.11, 1864.50, 1505.11, 2683.53, 1975.17, 1986.45, 2066.71, 1889.91, 2600.96, 1275.45, 1440.75, 1896.25, 1493.41, 2587.51, 1416.36, 1493.25, 818.10, 1408.41, 1091.75, 1787.07, 1426.26, 1413.20, 1391.19, 1148.20, 1619.85, 944.95, 1101.15, 1678.47, 2078.19, 1032.67, 1032.80, 1236.49, 1759.80, 1775.38, 2529.84, 1737.09, 1506.09, 1610.20, 1766.05, 1579.73, 1915.42, 1582.63, 1285.69, 1906.14, 1075.71, 1932.73, 1448.99, 2812.98, 911.15, 1476.65, 1185.79, 1688.86, 1000.30, 2038.29, 2236.16, 1574.61, 2088.97, 1177.75, 2198.85, 1376.14, 1703.52, 988.47, 1492.88, 1695.92, 1090.45, 1713.34, 1387.15, 1591.64, 1112.25
      //5/8/24, 5/10/24, 5/14/24, 5/17/24, 5/20/24, 5/24/24, 5/29/24, 6/01/24, 6/05/24, 6/08/24, 6/12/24, 6/15/24, 6/19/24, 6/22/24, 6/26/24, 6/29/24, 7/1/24, 7/03/24, 7/06/24, 7/11/ 4, 7/13/24, 7/17/24, 7/20/24, 7/23/24, 7/26/24, 7/29/24, 8/02/24, 8/05/24, 8/08/24, 8/10/24, 8/12/24, 8/16/24, 8/19/24, 8/24/24, 8/28/24, 8/31/24, 9/04/24, 9/07/24, 9/11/24, 9/14/24, 9/16/24, 9/19/24, 9/23/24, 9/26/24, 9/28/24, 10/2/24, 10/7/24, 10/10/24, 10/14/24, 10/17/24, 10/19/24, 10/23/24, 10/25/24, 10/28/24, 11/1/24, 11/04/24, 11/14/24, 11/16/24, 11/20/24, 11/23/24, 11/27/14, 11/29/24, 12/02/24, 12/7/24, 12/11/24, 12/13/24, 12/16/24, 12/20/24, 12/23/24
      //# of packages: 63, 42, 48, 49, 48, 74, 51, 57, 59, 56, 67, 48, 36, 53, 43, 59, 45, 24, 41, 39, 44, 38, 40, 43, 36, 42, 38, 56, 26, 33, 35, 51, 55, 57, 59, 48, 52, 48, 48, 36, 51, 49, 45, 35, 53, 55, 60, 33, 49, 32, 52, 30, 58, 68, 40, 47, 56, 30, 45, 40, 49, 34, 38, 62, 35, 44, 31, 43, 39
      //1640.03, 1287.55, 1183.37, 1364.05, 1396.48, 1993.52, 1339.40, 1667.80, 1553.39, 1316.42, 1667.80, 1553.39, 1316.42, 1851.07, 1278.21, 973.64, 1334.71, 1215.77, 1765.43, 1226.80, 623.34, 1203.55, 1092.02, 1192.89, 1089.11, 1264.65, 1132.30, 889.80, 1101.24, 1058.08, 1398.20, 935.78, 934.40, 1056.20, 1465.87, 1398.88, 1588.26, 1482.53, 1327.14, 1330.88, 1419.80, 1295.33, 1171.50, 1219.46, 1301.04, 1400.97, 849.30, 1332.63, 1430.61, 1799.15, 874.80, 1426.30, 875.14, 1440.80, 854.40, 1630.67, 1822.33, 870.75, 1342.55, 1518.42, 830.10, 1362.43, 1142.14, 1346.86, 951.23, 1038.39, 1662.03, 889.33, 1218.11, 1387.15, 1167.05, 1049.55
    },
    {
      name: "Lbs Bought",
      data: orderlbs,
    },
  ];

  export const productLineChartDataPriceHistory = [{
    name: "Price History per case",
    data: [28.95, 30.45, 29.95, 30.45, 30.95, 30.45, 29.95, 29.95, 29.45, 29.45, 28.45, 27.45, 25.95, 24.95, 23.45, 21.95, 20.95, 20.95, 20.95, 20.95, 20.95, 20.45, 20.95, 21.45, 20.95, 20.95, 20.95, 20.4, 19.95, 19.95, 18.95, 19.45, 18.95, 18.95, 19.45, 19.45, 17.95, 17.95, 17.95, 17.45, 17.45, 17.45, 17.45, 17.45, 16.45, 16.45, 16.95, 17.45, 17.45, 17.45, 17.45, 17.45, 17.45, 17.45, 17.45, 17.45, 16.95, 16.95, 16.95, 16.95] // Ensure this is an array of numbers
  },
];

export const priceHistoryDates = ["5/8/24", "5/10/24", "5/17/24", "5/20/24", "5/24/24", "5/29/24", "6/01/24", "6/05/24", "6/08/24", "6/12/24", "6/15/24", "6/19/24", "6/22/24", "6/26/24", "07/03/24", "7/06/24", "7/11/24", "07/13/24", "07/17/24", "07/20/24", "07/23/24", "07/26/24", "07/29/24", "8/02/24", "08/05/24", "08/08/24", "08/10/24", "08/12/24", "08/16/24", "08/19/24", "08/24/24", "08/28/24", "08/31/24", "09/04/24", "09/07/24", "09/11/24", "09/14/24", "09/16/24", "09/19/24", "09/23/24", "09/26/24", "09/28/24", "10/02/24", "10/07/24", "10/10/24", "10/14/24", "10/17/24", "10/23/24", "10/25/24", "10/28/24", "11/01/24", "11/04/24", "11/05/24", "11/09/24", "11/14/24", "11/20/24", "11/23/24", "11/27/24", "11/29/24", "12/02/24", "12/7/24", "12/11/24", "12/13/24", "12/16/24", "12/20/24", "12/23/24"];

  export const lineChartOptionsPriceHistory = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: orderdates,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: Math.min(...productLineChartDataPriceHistory[0]?.data) - 1,
      max: Math.max(...productLineChartDataPriceHistory[0]?.data) + 1,
      tickAmount: 7, // Optional, defines the number of gridlines/ticks
      labels: {
        style: {
          fontSize: '12px',
          colors: '#A0AEC0',
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
    color: ["#7551FF", "#39B8FF"],
  };

  export const lineChartOptionsTotalSpent = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: orderdates,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 3500,
      tickAmount: 7, // Optional, defines the number of gridlines/ticks
      labels: {
        style: {
          fontSize: '12px',
          colors: '#A0AEC0',
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
    color: ["#7551FF", "#39B8FF"],
  };