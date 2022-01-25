import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const FeaturedInfo = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">הכנסה</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2415 ₪</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">בהשוואה לחודש שעבר</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">מכירות</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4415 ₪</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">בהשוואה לחודש שעבר</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">כלויות</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2225 ₪</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">בהשוואה לחודש שעבר</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
