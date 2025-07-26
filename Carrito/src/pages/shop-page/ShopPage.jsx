import { useLocation, useParams, useNavigate, Outlet } from "react-router-dom";

import { Heading } from "@chakra-ui/react";

export default function ShopPage() {
  const { category } = useParams();
  return (
    <>
      <Heading
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={3}
        fontSize={["lg", "xl"]}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Heading>
      <Outlet></Outlet>
    </>
  );
}
