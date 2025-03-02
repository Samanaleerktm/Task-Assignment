import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { getLastOrder } from "../apis/orderapi";

const PackageSummary: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const navigate = useNavigate();

  // Fetch the latest order details
  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        const data = await getLastOrder();
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch last order:", error);
      }
    };

    fetchLastOrder();
  }, []);

  const formatPrice = (price: number) => {
    return price ? price.toFixed(2) : "0.00";
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between">
          {/* Package Details */}
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Package Details</h2>
            <div className="border-b my-2"></div>

            {order?.OrderItems?.map((pkg: any, index: number) => (
              <div key={index} className="mb-4">
                <p><strong>Package Type:</strong> {pkg.BoxType?.name || "Custom Box"}</p>
                <p><strong>Dimensions:</strong> {pkg.length} x {pkg.width} x {pkg.height} cm</p>
                <p><strong>Quantity:</strong> {pkg.quantity}</p>
                <p><strong>Price:</strong> ${formatPrice(pkg.price)}</p>
              </div>
            ))}
          </div>

          {/* Total Price Summary */}
          <div className="w-1/2 text-right">
            <h2 className="text-lg font-semibold">Total Price Summary</h2>
            <div className="border-b my-2"></div>

            {/* Display each box's price */}
            {['Box A', 'Box B', 'Box C'].map((boxType) => (
              <p key={boxType}>
                <strong>{boxType} Price:</strong> ${formatPrice(
                  order?.OrderItems?.find((item: any) => item.BoxType?.name === boxType)?.price || 0
                )}
              </p>
            ))}

            {/* Delivery Charge and Total Price */}
            <p><strong>Delivery Charge:</strong> ${formatPrice(order?.delivery_charge || 0)}</p>
            <p className="text-lg font-bold"><strong>Total:</strong> ${formatPrice(order?.total_price || 0)}</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="w-[900px] flex justify-start mt-6">
        <Button
          className="!bg-orange-500 !text-white hover:bg-orange-700 shadow-custom px-8 py-2 rounded-md w-[100px]"
          onClick={() => navigate("/details", { state: { packages: order?.OrderItems || [] } })}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default PackageSummary;