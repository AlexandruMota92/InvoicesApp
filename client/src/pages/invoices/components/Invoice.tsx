import { Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../utils/api/ApiClient";

const Invoice = (props: any) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["invoiceData", props.invoiceId],
    queryFn: () => {
      return apiClient.get(`/invoices/${props.invoiceId}`);
    },
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Grid container spacing={2}>
        <Grid>
          <TextField
            fullWidth
            label="Vendor Name"
            value={data.vendor_name}
            disabled
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Amount"
            value={data.amount}
            disabled
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Due Date"
            value={data.due_date}
            disabled
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="User ID"
            value={data.user_id}
            disabled
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Description"
            value={data.description}
            disabled
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            multiline
            minRows={4}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Paid"
            value={data.paid ? "Yes" : "No"}
            disabled
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Invoice;
