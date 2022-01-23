import { useLocation } from "react-router";

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
      <button style={{ padding: 10, marginTop: 20 }}>עבור לעמוד הבית</button>
    </div>
  );
};

export default Success;
