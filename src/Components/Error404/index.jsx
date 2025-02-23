import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
        Oops! Trang bạn tìm kiếm không tồn tại.
      </Typography>
      <Button variant="contained" component={Link} to="/" color="primary">
        Quay về trang chủ
      </Button>
    </Box>
  );
};

export default Error404;
