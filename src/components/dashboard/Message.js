"use client";
import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Message = ({ id }) => {
  // const router = useRouter();
  const { data: session } = useSession();
  const [messagesList, setMessagesList] = useState([]);
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Please Enter Message"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_LIVE}/api/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: session?.user?.sub,
              to: id,
              message: values?.message,
            }),
          }
        );
        if (res?.ok) {
          resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getMessages = async () => {
    try {
      const messages = await fetch(`http://localhost:3000/api/getmessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: session?.user?.sub,
          to: id,
        }),
      });

      const data = await messages.json();
      if (Array.isArray(data)) setMessagesList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let counter = 0;

    const intervalId = setInterval(() => {
      if (counter >= 2) {
        clearInterval(intervalId);
      } else {
        counter++;
        getMessages();
      }
    }, 2000);

    // Initial call to getMessages
    getMessages();

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [session?.user?.sub, id, formik.values]);

  return (
    <>
      <div className="account-pages my-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={10} xl={10}>
              <div className="text-center mb-4">
                <h4>Chat App, Messages Section</h4>
              </div>
              <Card style={{ borderRadius: "10px" }}>
                <CardBody className="p-4">
                  <div
                    className="p-2"
                    style={{
                      backgroundColor: "#f0eff5",
                      borderRadius: "8px",
                      overflowY: "auto",
                      minHeight: "63vh",
                      maxHeight: "65vh",
                    }}
                  >
                    {messagesList.map((msg, index) => (
                      <div
                        key={index}
                        style={{
                          float: `${
                            session?.user?.sub === msg?.from?._id
                              ? "right"
                              : "left"
                          }`,
                          clear: "both",
                        }}
                      >
                        <span
                          className="p-2"
                          style={{
                            display: "block",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            maxWidth: "50vw",
                          }}
                        >
                          {msg?.message}
                        </span>
                        <div
                          className="mt-1"
                          style={{
                            textAlign: `${
                              session?.user?.sub === msg?.from?._id
                                ? "right"
                                : "left"
                            }`,
                          }}
                        >
                          {msg?.from?.username}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Form
                    onSubmit={formik.handleSubmit}
                    className="mt-3"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2px",
                    }}
                  >
                    <InputGroup className="bg-soft-light rounded-3">
                      <span
                        className="input-group-text text-muted"
                        id="basic-addon3"
                      >
                        <i className="ri-wechat-2-fill"></i>
                      </span>
                      <Input
                        type="text"
                        id="message"
                        name="message"
                        className="form-control form-control-lg border-light bg-soft-light"
                        placeholder="Enter Message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        invalid={
                          formik.touched.message && formik.errors.message
                            ? true
                            : false
                        }
                      />
                      {formik.touched.message && formik.errors.message ? (
                        <FormFeedback type="invalid">
                          {formik.errors.message}
                        </FormFeedback>
                      ) : null}
                    </InputGroup>
                    <Button
                      color="primary"
                      className="waves-effect waves-light"
                      type="submit"
                      style={{ minWidth: "100px", maxHeight: "42px" }}
                    >
                      Send
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Message;
