import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import Card from "../card/Card.js";
import PieChart from "../charts/PieChart";
import { VSeparator } from "../separator/Separator";
import React, { useState, useEffect } from "react";

export default function Conversion(props) {
  const { initialDistributors, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Function to generate a random color
  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  // State for distributors with colors and percentages
  const [distributorsWithColors, setDistributorsWithColors] = useState([]);
  const [percentages, setPercentages] = useState([]);

  // Effect to update the distributors and percentages when initialDistributors changes
  useEffect(() => {
    if (initialDistributors && initialDistributors.length > 0) {
      // Generate an array of random colors, one for each distributor
      if (distributorsWithColors.length == 0){
        const randomColors = initialDistributors.map(() => generateRandomColor());

        // Map over distributors and assign each one a random color
        const distributorsWithColor = initialDistributors.map((distributor, index) => ({
          ...distributor,
          color: randomColors[index], // Assign corresponding color from the randomColors array
        }));

        // Set distributors with color
        setDistributorsWithColors(distributorsWithColor);

        const percArray = distributorsWithColor.map(
          (distributor) => distributor.percentage
        );
        setPercentages(percArray);
      }
    }
  }, [initialDistributors]);

  // Pie chart options
  // const colors = distributorsWithColors.map((distributor) => distributor.color);
  const pieChartOptions = {
    labels: distributorsWithColors.map((distributor) => distributor.name),
    colors: distributorsWithColors.map((distributor) => distributor.color), // Ensure the same color for the pie slices
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
      show: true, // Ensure the legend is visible
      position: "bottom", // You can also control the position if necessary
    },
    dataLabels: {
      enabled: false
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true, // Enable donut labels
            formatter: (val) => `${parseFloat(val).toFixed(2)}%`, // Format donut labels to two decimal places
          },
        },
      },
    },
    fill: {
      colors: distributorsWithColors.map((distributor) => distributor.color), // Use the same colors for pie slices
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: (value) => `${parseFloat(value).toFixed(2)}%`, // Format tooltip values to two decimal places
      },
    },
  };
  

  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Distributor Breakdown
        </Text>
        <Select
          fontSize="sm"
          variant="subtle"
          defaultValue="monthly"
          width="unset"
          fontWeight="700"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>
      </Flex>

      {/* PieChart */}
      <Box w="100%" h="300px">
        {distributorsWithColors.length > 0 && percentages.length > 0 ? (
          <PieChart
            chartData={percentages} // Pass the dynamic data to PieChart
            chartOptions={pieChartOptions}
          />
        ) : (
          <Text>No data available for the pie chart</Text>
        )}
      </Box>

      {/* Distributor Info */}
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="max-content"
        p="15px"
        px="20px"
        mt="-100px"
        mx="auto"
      >
        {distributorsWithColors.map((distributor, index) => (
          <React.Fragment key={index}>
            <Flex direction="column" py="5px">
              <Flex align="center">
                <Box
                  h="8px"
                  w="8px"
                  bg={distributor.color} // Use the same color for each distributor in the legend
                  borderRadius="50%"
                  me="4px"
                />
                <Text
                  fontSize="xs"
                  color="secondaryGray.600"
                  fontWeight="700"
                  mb="5px"
                >
                  {distributor.name}
                </Text>
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="700">
                {distributor.percentage.toFixed(2)}%
              </Text>
            </Flex>
            {index < distributorsWithColors.length - 1 && (
              <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
            )}
          </React.Fragment>
        ))}
      </Card>
    </Card>
  );
}
