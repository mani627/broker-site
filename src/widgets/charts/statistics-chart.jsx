import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

export function StatisticsChart({ color, chart, title, description }) {
  return (
    <Card className="w-full cursor-pointer max-w-md mx-auto border border-gray-200 shadow-sm rounded-lg transition-all hover:scale-100 hover:shadow-md duration-300">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={true}
        className="rounded-t-lg"
      >
        {/* <Chart {...chart} /> */}
      </CardHeader>
      <CardBody className="px-6 pt-4 pb-8">
        <Typography variant="small" color="blue-gray" className="font-bold text-lg">
          {title}
        </Typography>
        <Typography variant="h5" className="font-normal text-blue-gray-600 mt-2">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
