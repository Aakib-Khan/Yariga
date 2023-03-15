import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Modal,
  Paper,
  InputAdornment,
  Tooltip,
  
} from "@pankod/refine-mui";
import { useTable } from "@pankod/refine-core";

import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo, useState } from "react";
import CustomButton from "components/common/CustomButton";
import PropertyCard from "components/common/PropertyCard";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();
  // console.log(data);
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  
  const allProperties = data?.data ?? [];

  
  const currentPrice = sorter.find((item) => item.field === "price")?.order;
  
  const agent = localStorage.getItem("agent");

  
  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      propertyType:
        logicalFilters.find((item) => item.field === "propertyType")?.value ||
        "",
    };
  }, [filters]);
  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography
            fontSize={25}
            marginLeft="35px"
            fontWeight={700}
            color="#11142d"
          >
            {!allProperties.length
              ? "There are no properties"
              : "All Properties"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
              // justifyContent='space-evenly'
            >
              <CustomButton
                title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("price")}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <Paper elevation={3}>
                <TextField
                  variant="outlined"
                  color="warning"
                  placeholder="Search by title"
                  value={currentFilterValues.title}
                  onChange={(e) => {
                    setFilters([
                      {
                        field: "title",
                        operator: "contains",
                        value: e.currentTarget.value
                          ? e.currentTarget.value
                          : undefined,
                      },
                    ]);
                  }}
                />
              </Paper>

              <Paper elevation={3}>
                <Select
                  variant="outlined"
                  color="info"
                  displayEmpty
                  required
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue=""
                  value={currentFilterValues.propertyType}
                  onChange={(e) => {
                    setFilters(
                      [
                        {
                          field: "propertyType",
                          operator: "eq",
                          value: e.target.value,
                        },
                      ],
                      "replace"
                    );
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {[
                    "Apartment",
                    "Villa",
                    "Farmhouse",
                    "Condos",
                    "Townhouse",
                    "Duplex",
                    "Studio",
                    "Chalet",
                  ].map((type) => (
                    <MenuItem key={type} value={type.toLowerCase()}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </Paper>

              {/* <CustomButton
                title="Real Estate Agent Login"
                handleClick={() => navigate("/properties/create")}
                backgroundColor="#FF0000"
                color="#fcfcfc"
                // icon={<Add />}
              /> */}
            {/* {
              !agent && (

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#03396c",
                  color: "#ffffff",
                  fontWeight: 700,
                  textTransform: "capitalize",
                }}
                // style={{ backgroundColor: backgroundColor, color: color }}
                onClick={handleOpen}
              >
                Real Estate Agent Login
              </Button>
              )
            } */}
             
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          fontSize={25}
          fontWeight={500}
          marginLeft="35px"
          color="#11142d"
        >
          {!allProperties.length ? "No properties to show" : "All Properties"}
        </Typography>
        {agent && (
          <CustomButton
            title="Add Property"
            handleClick={() => navigate("/properties/create")}
            backgroundColor="#475be8"
            color="#fcfcfc"
            icon={<Add />}
          />
        )}
      </Stack>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo}
          />
        ))}
      </Box>

      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
            color="black"
          >
            {/* <Paper sx={{height:"45px",width:"100px"

            }}     elevation={3} variant="outlined"> */}
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
            {/* </Paper> */}
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Paper elevation={3}>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={10}
              onChange={(e) =>
                setPageSize(e.target.value ? Number(e.target.value) : 10)
              }
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <MenuItem key={size} value={size}>
                  Show {size}
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
