import {useContext, useState, useEffect} from 'react';
import AuthContext from "../context/AuthContext";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import {TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {format as formatDate} from 'date-fns';
const theme = createTheme();


const PaymentPage = () => {
    const {authTokens} = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateValue, setDateValue] = useState(null);
    const [cardValid, setCardValid] = useState(false);
    const [postalValid, setPostalValid] = useState(false);
    const [validCvc, setValidCvc] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/user/profile/payment_info/list', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if(data.results)
                setPayments(data);
            setLoading(false);
        });
        fetch('http://localhost:8000/user/payment/history/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens
            }
        }).then((res) => {
            return res.json();
        }
        ).then((data) => {
            if(data.results)
                setPaymentHistory(data);
            setLoading(false);
        }
        );
    }, [authTokens, loading]);

        
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/user/profile/payment_info/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens
                },
                body: JSON.stringify({  
                    card_number: e.target.card_number.value,
                    postal_code: e.target.postal_code.value,
                    cvv: e.target.cvc.value,
                    expiry: formatDate(dateValue, 'yyyy-MM-dd')
                })}
        ).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            setLoading(true);
        });
        return;
    }

    function DeleteButton (props) {
        
        return (
        <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
                fetch('http://localhost:8000/user/profile/payment_info/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authTokens
                        },
                        body: JSON.stringify({
                            payment_info_id: props.id
                        })}
                ).then((res) => {
                    return res.json();
                }).then((data) => {
                    setLoading(true);
                });
            }}
        >Delete</Button>)
    }

    const cardInput = (e) => {
        if (e.target.value.length > 16 || e.target.value.length < 15)
            setCardValid(true);
        else {
            let checksum = 0; // running checksum total
            let j = 1; // takes value of 1 or 2
            let val = String(e.target.value);
            // Process each digit one by one starting from the last
            for (let i = val.length - 1; i >= 0; i--) {
              let calc = 0;
              // Extract the next digit and multiply by 1 or 2 on alternative digits.
              calc = Number(val.charAt(i)) * j;
        
              // If the result is in two digits add 1 to the checksum total
              if (calc > 9) {
                checksum = checksum + 1;
                calc = calc - 10;
              }
        
              // Add the units element to the checksum total
              checksum = checksum + calc;
        
              // Switch the value of j
              if (j == 1) {
                j = 2;
              } else {
                j = 1;
              }
            }
          
            //Check if it is divisible by 10 or not.
            setCardValid(!((checksum % 10) == 0));
        }
        
    }

    const cvcInput = (e) => {
        if (e.target.value.length > 4 || e.target.value.length < 3)
            setValidCvc(true);
        else
            setValidCvc(false);
    }

    const postalInput = (e) => {
        // Check if e.target.value is a a valid canadian postal code
        if(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(e.target.value))
            setPostalValid(false);
        else
            setPostalValid(true);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'card_number', headerName: 'Card Number', width: 200 },
        { field: 'expiry', headerName: 'Expiry Date', width: 200 },
        { field: 'postal_code', headerName: 'Postal Code', width: 200 }
    ];

    const dataGrid = (
        <DataGrid getRowId={(row) => row.payment_info_id} rows={payments.results} columns={columns} pageSize={5} />
    )

    return (
    <ThemeProvider theme={theme}>
    <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
    <Typography component="h1" variant="h5">
        Existing Payment Cards
    </Typography>
    <TableContainer component={Paper}>
    <CssBaseline />


    <Table aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>Card Number</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Delete</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {payments.results ? payments.results.map((payment) => (payment.visible &&
        (<TableRow key={payment.payment_info_id}>
            <TableCell>{payment.card_number}</TableCell>
            <TableCell>{payment.expiry}</TableCell>
            <TableCell>{payment.postal_code}</TableCell>
            <TableCell><DeleteButton id={payment.payment_info_id}/></TableCell>
        </TableRow>)
        )): (<TableRow><TableCell>No Payment Info</TableCell></TableRow>)}
        </TableBody>
    </Table>

    </TableContainer>
    <Typography component="h1" variant="h5">
        Add Payment Card
    </Typography>
    <Container maxWidth="xs" component="main">

    <Box component="form" onSubmit={handleSubmit} sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <TextField id="card_number" label="Card Number" variant="outlined" type="number" fullWidth required onInput={cardInput} error={cardValid}/>
        <LocalizationProvider dateAdapter={AdapterDateFns} required >
        <DesktopDatePicker 
            label="Expiry Date" 
            inputFormat="yyyy-MM-dd" 
            value={dateValue} 
            sx={{mt:1}} 
            fullWidth 
            onChange={(newValue) => {setDateValue(newValue)}} 
            renderInput={(params) => <TextField sx={{mt:1}} fullWidth required {...params} />} 
        />
        <TextField id="cvc" label="CVC" variant="outlined" type="number" fullWidth required error={validCvc} onInput={cvcInput} sx={{mt:1}}/>
        <TextField id="postal_code" label="Postal Code" variant="outlined" fullWidth required onInput={postalInput} error={postalValid} sx={{mt:1}}/>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={cardValid || postalValid}
        >Submit</Button>
        </LocalizationProvider>

    </Box>

    </Container>

    <Table aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Subscription</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {paymentHistory.results ? paymentHistory.results.map((payment) => (
        (<TableRow key={payment.payment_id}>
            <TableCell>{payment.amount}</TableCell>
            <TableCell>{Date(payment.processed_on)}</TableCell>
            <TableCell>{payment.subscription}</TableCell>
        </TableRow>)
        )): (<TableRow><TableCell>No Payment Info</TableCell></TableRow>)}
        </TableBody>
    </Table>

    </Box>

    </ThemeProvider>
    );
}

export default PaymentPage;


const validateCardNumber = number => {
    //Check if the number contains only numeric value  
    //and is of between 13 to 19 digits
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(number)){
        return false;
    }
  
    return luhnCheck(number);
}

const luhnCheck = val => {
    let checksum = 0; // running checksum total
    let j = 1; // takes value of 1 or 2

    // Process each digit one by one starting from the last
    for (let i = val.length - 1; i >= 0; i--) {
      let calc = 0;
      // Extract the next digit and multiply by 1 or 2 on alternative digits.
      calc = Number(val.charAt(i)) * j;

      // If the result is in two digits add 1 to the checksum total
      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }

      // Add the units element to the checksum total
      checksum = checksum + calc;

      // Switch the value of j
      if (j == 1) {
        j = 2;
      } else {
        j = 1;
      }
    }
  
    //Check if it is divisible by 10 or not.
    return (checksum % 10) == 0;
}