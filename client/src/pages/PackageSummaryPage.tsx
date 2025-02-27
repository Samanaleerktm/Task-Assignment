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

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between">
          
     
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Package Details</h2>
            <div className="border-b my-2"></div>

            {order?.OrderItems?.map((pkg: any, index: number) => (
              <div key={index} className="mb-4">
                <p><strong>Package Type:</strong> {pkg.BoxType ? pkg.BoxType.name : "Custom Box"}</p>
                <p><strong>Dimensions:</strong> {pkg.length}cm × {pkg.width}cm × {pkg.height}cm</p>
                <p><strong>Quantity:</strong> {pkg.quantity}</p>
                <p><strong>Price per unit:</strong> ${pkg.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

         
          <div className="w-1/2 text-right">
            <h2 className="text-lg font-semibold">Total Price Summary</h2>
            <div className="border-b my-2"></div>

            <p><strong>Box A Price:</strong> ${order?.OrderItems?.find((item: any) => item.BoxType?.name === "Box A")?.price.toFixed(2) || 0}</p>
            <p><strong>Box B Price:</strong> ${order?.OrderItems?.find((item: any) => item.BoxType?.name === "Box B")?.price.toFixed(2) || 0}</p>
            <p><strong>Delivery Charge:</strong> ${order?.delivery_charge.toFixed(2) || 0}</p>
            <p className="text-lg font-bold"><strong>Total:</strong> ${order?.total_price.toFixed(2) || 0}</p>
          </div>
        </div>
      </div>

     
      <div className="w-[900px] flex justify-start mt-6">
        <Button
          className="!bg-orange-500 !text-white hover:bg-orange-700 shadow-custom px-8 py-2 rounded-md w-[100px]"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default PackageSummary;
