"use client";
import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Alert,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup,
} from "reactstrap";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const columns = [
  { field: "id", headerName: "S.No.", width: 70 },
  { field: "username", headerName: "Username", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => <>{params.row.action}</>,
  },
];

const Dashboard = () => {
  const { data: session } = useSession();
  // const router = useRouter();
  const [rows, setRows] = React.useState([]);
  const id = session?.user?.sub;
  useEffect(() => {
    const getUsers = async () => {
      const users = await fetch("api/allusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const usersData = await users.json();
      // const finalData = usersData.filter(
      //   (item) => item.username != session?.user?._doc?.username
      // );
      const result = usersData.map((item, index) => {
        return {
          id: index + 1,
          username: item?.username,
          action: (
            <Link
              href={`/dashboard/${item?._id}`}
              color="primary"
              className=" waves-effect waves-light"
            >
              Message Now
            </Link>
          ),
        };
      });

      setRows(result || []);
    };
    getUsers();
  }, [session?.user?._doc?.username]);

  console.log(rows);
  // log;
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={9} xl={7}>
              <div className="text-center mb-4">
                <h4>Select the Person with you want to talk</h4>
              </div>
              <Card>
                <CardBody className="p-4">
                  <div className="p-3">
                    <div className="mb-3">
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        //   checkboxSelection
                        disableColumnMenu={true}
                      />
                    </div>
                    <div className="d-grid">
                      <Button
                        color="primary"
                        block
                        className=" waves-effect waves-light"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
