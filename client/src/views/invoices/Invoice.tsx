import { Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Invoice = (props: any) => {
  const token = useSelector((state: any) => state.token.token);
  const { isPending, error, data } = useQuery({
    queryKey: ["invoiceData", props.invoiceId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/invoices/${props.invoiceId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Amount"
            value={data.amount}
            disabled
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Due Date"
            value={data.due_date}
            disabled
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="User ID"
            value={data.user_id}
            disabled
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Description"
            value={data.description}
            disabled
            variant="outlined"
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Invoice;
