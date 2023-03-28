import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => {

    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const breakPoint = useMediaQuery("(min-width:600px)");
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    async function getItems() {
      const items = await fetch(
        "http://localhost:1337/api/items?populate=image",
        { method: "GET" }
      );
      const itemsJson = await items.json();
      dispatch(setItems(itemsJson.data));
    }
  
    useEffect(() => {
      getItems();
    }, []); 
  
    const oneYear = items.filter(
      (item) => item.attributes.category === "oneYear"
    );
    const threeYear = items.filter(
      (item) => item.attributes.category === "threeYear"
    );
    const fiveYears = items.filter(
      (item) => item.attributes.category === "fiveYears"
    );



  return (
    <Box width="80%" margin="80px auto">
    <Typography variant="h3" textAlign="center">
      Our Featured <b>Products</b>
    </Typography>
    <Tabs
      textColor="primary"
      indicatorColor="primary"
      value={value}
      onChange={handleChange}
      centered
      TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
      sx={{
        m: "25px",
        "& .MuiTabs-flexContainer": {
          flexWrap: "wrap",
        },
      }}
    >
      <Tab label="ALL" value="all" />
      <Tab label="Age 1-2" value="oneYear" />
      <Tab label="Age 2-3" value="threeYear" />
      <Tab label="Age 4-5" value="fiveYears" />
    </Tabs>
    <Box
      margin="0 auto"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, 300px)"
      justifyContent="space-around"
      rowGap="20px"
      columnGap="1.33%"
    >
      {value === "all" &&
        items.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      {value === "oneYear" &&
        oneYear.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      {value === "threeYear" &&
        threeYear.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      {value === "fiveYears" &&
        fiveYears.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
    </Box>
  </Box>
  )
}

export default ShoppingList