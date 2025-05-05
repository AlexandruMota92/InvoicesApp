import { useQuery } from "@tanstack/react-query";
import { GridEventListener } from "@mui/x-data-grid";
import CustomModal from "../../components/CustomModal";
import { useState } from "react";
import Invoice from "./components/Invoice";
import { Box } from "@mui/material";
import {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
} from "@tanstack/react-table";

import "./Invoices.css";
import { apiClient } from "../../utils/api/ApiClient";
import { DataTable } from "@/components/ui/data-table";

const columns: ColumnDef<any>[] = [
  { accessorKey: "vendor_name", header: "Vendor Name" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "due_date", header: "Date Due" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "user_id", header: "User Id" },
  { accessorKey: "paid", header: "Has Paid" },
];

const Invoices = () => {
  const [open, setOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["invoiceData"],
    queryFn: () => {
      return apiClient.get("/invoices");
    },
  });

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedInvoiceId(null);
  };

  const handleOpenModal: any = (params: any) => {
    setOpen(true);
    setSelectedInvoiceId(params.id);
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Box className="wrapper">
      <CustomModal title="Invoice Data" open={open} onClose={handleCloseModal}>
        <Invoice invoiceId={selectedInvoiceId} />
      </CustomModal>
      <DataTable onRowClick={handleOpenModal} columns={columns} data={data} />
    </Box>
  );
};

export default Invoices;
