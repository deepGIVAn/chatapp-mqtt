"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Enter proper email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      try {
        const resUserExists = await fetch("api/userexists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: values?.username }),
        });
        const { user } = await resUserExists.json();
        console.log("user", user);
        if (user) {
          console.log("user Exists!!");
          return;
        }

        const res = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values?.username,
            email: values?.email,
            password: values?.password,
          }),
        });
        if (res?.ok) {
          router.push("/");
        } else {
          console.log("User registration failed.");
        }
      } catch (error) {
        console.log("Error during registration: ", error);
      }
    },
  });
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-4">
                <h4>Register Now</h4>
                <p className="">Chat App</p>
              </div>

              <Card>
                <CardBody className="p-4">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                      // return false;
                    }}
                  >
                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <span className="input-group-text text-muted">
                          <i className="ri-mail-line"></i>
                        </span>
                        <Input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          invalid={
                            formik.touched.email && formik.errors.email
                              ? true
                              : false
                          }
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <FormFeedback type="invalid">
                            {formik.errors.email}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Username</Label>
                      <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                        <span className="input-group-text border-light text-muted">
                          <i className="ri-user-2-line"></i>
                        </span>
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          invalid={
                            formik.touched.username && formik.errors.username
                              ? true
                              : false
                          }
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <FormFeedback type="invalid">
                            {formik.errors.username}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <FormGroup className="mb-4">
                      <Label className="form-label">Password</Label>
                      <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                        <span className="input-group-text border-light text-muted">
                          <i className="ri-lock-2-line"></i>
                        </span>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          invalid={
                            formik.touched.password && formik.errors.password
                              ? true
                              : false
                          }
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <FormFeedback type="invalid">
                            {formik.errors.password}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </FormGroup>

                    <div className="d-grid">
                      <Button
                        color="primary"
                        block
                        className=" waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>

              <div className="mt-3 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link href="/" className="font-weight-medium text-primary">
                    {" "}
                    Signin{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Signup;
