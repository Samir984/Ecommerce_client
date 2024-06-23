import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/lib/utils";
import { cancelOrder, getUserOrders } from "@/services/orderapi";
import { useMutation, useQuery, useQueryClient } from "react-query";

type OrderItem = {
  deliveryCharged: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
};

type Order = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deliveryCharged: number;
  marked: string;
  orderItem: OrderItem;
  paymentMethod: string;
  phoneNumber: string;
  shippingAddress: string;
  status: string;
  store_id: string;
  totalPrice: number;
  user_id: string;
};

export default function UserOrders() {
  const { isLoading, data } = useQuery("userOrders", getUserOrders);

  const orders: Order[] = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center w-full min-h-32">
          <div className="loader animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-6">
          {orders.length === 0 ? (
            <div className="text-center text-xl font-medium text-gray-600">
              No order found
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Your Orders
              </h2>
              <div className="space-y-6">
                {orders.map((order) => (
                  <UserOrderCard order={order} key={order._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type UserOrderCardProps = {
  order: Order;
};

function UserOrderCard({ order }: UserOrderCardProps) {
  const queryClient = useQueryClient();

  const { mutate: cancelOrderByUser, isLoading: isCanceling } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries("userOrders");
    },
  });

  const handleCancelOrder = (orderId: string) => {
    cancelOrderByUser(orderId);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <img
          src={order.orderItem.image}
          alt={order.orderItem.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Order ID: {order._id}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                order.status === "pending"
                  ? "bg-yellow-300 text-yellow-800"
                  : order.status === "completed"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-gray-600">
            <p>
              <strong>Product:</strong> {order.orderItem.name}
            </p>
            <p>
              <strong>Quantity:</strong> {order.orderItem.quantity}
            </p>
            <p>
              <strong>Price:</strong> Rs.{" "}
              {formatNumberWithCommas(order.totalPrice)}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Shipping Address:</strong> {order.shippingAddress}
            </p>
            <p>
              <strong>Phone Number:</strong> {order.phoneNumber}
            </p>
          </div>
          {order.status === "pending" && (
            <Button
              className="mt-4"
              size={"sm"}
              onClick={() => handleCancelOrder(order._id)}
              disabled={isCanceling}
            >
              {isCanceling ? "Canceling..." : "Cancel Order"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
