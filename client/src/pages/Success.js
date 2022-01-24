import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  const orderId = location.state.orderId;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        direction: "rtl",
      }}
    >
      {orderId
        ? `ההזמנה נוצרה בהצלחה. מספר ההזמנה שלך הוא ${orderId}`
        : `ההזמנה שלך בהכנה...`}
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <button style={{ padding: 10, marginTop: 20 }}>עבור לעמוד הבית</button>
      </Link>
    </div>
  );
};

export default Success;
