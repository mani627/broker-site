import React from "react";

const Invoice = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Invoice</h1>
      <div>
        <h3>Bill To:</h3>
        <p>Customer Name</p>
        <p>Address Line 1</p>
        <p>City, State, ZIP</p>
      </div>

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Item</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>Sample Item</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>2</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>$50</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>$100</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "20px" }}>Total: $100</h3>
    </div>
  );
});

export default Invoice;
