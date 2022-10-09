import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import {
    createTheme,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";
  import { useHistory } from "react-router-dom";
  import { CryptoState } from "../CryptoContext";
  import AuthModal from "./Authentication/AuthModal";
  import UserSidebar from "./Authentication/UserSidebar";
  
  const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  
  function Header() {
    const classes = useStyles();
    const { currency, setCurrency, user } = CryptoState();
  
    const history = useHistory();
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => history.push(`/`)}
                variant="h6"
                className={classes.title}
              >
                Crypto Hunter
              </Typography>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 85, height: 40 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"AED"}>AED</MenuItem>
                <MenuItem value={"ARS"}>ARS</MenuItem>
                <MenuItem value={"AUD"}>AUD</MenuItem>
                <MenuItem value={"BDT"}>BDT</MenuItem>
                <MenuItem value={"BHD"}>BHD</MenuItem>
                <MenuItem value={"BMD"}>BMD</MenuItem>
                <MenuItem value={"BRL"}>BRL</MenuItem>
                <MenuItem value={"CAD"}>CAD</MenuItem>
                <MenuItem value={"CHF"}>CHF</MenuItem>
                <MenuItem value={"CLP"}>CLP</MenuItem>
                <MenuItem value={"CNY"}>CNY</MenuItem>
                <MenuItem value={"CZK"}>CZK</MenuItem>
                <MenuItem value={"DKK"}>DKK</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"GBP"}>GBP</MenuItem>
                <MenuItem value={"HKD"}>HKD</MenuItem>
                <MenuItem value={"JPY"}>JPY</MenuItem>
                <MenuItem value={"KRW"}>KRW</MenuItem>
                <MenuItem value={"KWD"}>KWD</MenuItem>
                <MenuItem value={"LKR"}>LKR</MenuItem>
                <MenuItem value={"MMK"}>MMK</MenuItem>
                <MenuItem value={"MXN"}>MXN</MenuItem>
                <MenuItem value={"MYR"}>MYR</MenuItem>
                <MenuItem value={"NGN"}>NGN</MenuItem>
                <MenuItem value={"NOK"}>NOK</MenuItem>
                <MenuItem value={"NZD"}>NZD</MenuItem>
                <MenuItem value={"PHP"}>PHP</MenuItem>
                <MenuItem value={"PKR"}>PKR</MenuItem>
                <MenuItem value={"PLN"}>PLN</MenuItem>
                <MenuItem value={"RUB"}>RUB</MenuItem>
                <MenuItem value={"SAR"}>SAR</MenuItem>
                <MenuItem value={"SEK"}>SEK</MenuItem>
                <MenuItem value={"SGD"}>SGD</MenuItem>
                <MenuItem value={"THB"}>THB</MenuItem>
                <MenuItem value={"TRY"}>TRY</MenuItem>
                <MenuItem value={"TWD"}>TWD</MenuItem>
                <MenuItem value={"UAH"}>UAH</MenuItem>
                <MenuItem value={"VEF"}>VEF</MenuItem>
                <MenuItem value={"VND"}>VND</MenuItem>
                <MenuItem value={"ZAR"}>ZAR</MenuItem>
              </Select>
  
              {user ? <UserSidebar /> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;