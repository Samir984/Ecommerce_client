import Table from "@/components/Table";

export default function OrderTable() {
  return (
    <div className="">
      <Table
        columns={[
          "Name",
          "Number",
          "Product",
          "Quantity",
          "ShippingAddress",
          "PaymentMethod",
          "Status",
          "Total",
          "OrderDate",
        ]}
        data={"data"}
      />
    </div>
  );
}
