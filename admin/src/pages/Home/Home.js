import React, { useEffect } from "react";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import "./home.css";
import { useUserStats } from "../../hooks/useUserStats";
import Chart from "../../components/chart/Chart";
const Home = () => {
  const { userStats, getStats } = useUserStats();

  useEffect(() => {
    getStats();
  }, [getStats]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="פעילות שנתית" grid dataKey="Active User" />
    </div>
  );
};

export default Home;
