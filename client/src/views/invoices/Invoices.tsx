import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import CustomModal from "../common/CustomModal";
import { useState } from "react";
import Invoice from "./Invoice";
import { Box } from "@mui/material";

import "./Invoices.css";

const columns: GridColDef[] = [
  { field: "vendor_name", headerName: "Vendor Name", width: 70 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "due_date", headerName: "Date Due", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "user_id", headerName: "User Id", width: 130 },
  { field: "paid", headerName: "Has Paid", width: 70 },
];

const Invoices = () => {
  const [open, setOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const token = useSelector((state: any) => state.token.token);

  const { isPending, error, data } = useQuery({
    queryKey: ["invoiceData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/invoices", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
  });

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedInvoiceId(null);
  };

  const handleOpenModal: GridEventListener<"rowClick"> = (params) => {
    setOpen(true);
    setSelectedInvoiceId(params.row.id);
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Box className="wrapper">
      <CustomModal open={open} onClose={handleCloseModal}>
        <Invoice invoiceId={selectedInvoiceId} />
      </CustomModal>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={columns}
        // initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        onRowClick={handleOpenModal}
      />
    </Box>
  );
};

export default Invoices;
