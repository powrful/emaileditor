import {
  Button,
  Column,
  Container,
  Heading,
  Img,
  Link,
  Row,
  Text,
} from "@/components/elements";
import { Body, Font, Head, Html, Preview } from "@react-email/components";

const template = {
  title: "This is email title",
  font: {},
  preview: "This is email preview",
  container: {
    style: {},
    children: [
      {
        row: {
          id: "row-1",
          type: "100",
          gap: "10px",
          style: {},
          children: [
            {
              column: {
                id: "column-1",
                style: {},
                children: [],
              },
            },
          ],
        },
      },

      {
        row: {
          id: "row-2",
          type: "50/50",
          gap: "10px",
          style: {},
          children: [
            {
              column: {
                id: "column-2",
                style: {},
                children: [
                  {
                    img: {
                      src: "https://picsum.photos/600/300",
                      alt: "Placeholder",
                    },
                  },
                ],
              },
            },

            {
              column: {
                id: "column-3",
                style: {},
                children: [
                  {
                    button: {
                      text: "Click me",
                      href: "https://www.example.com",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

export const EmailTemplate = () => {
  return (
    <Html lang="en" dir="ltr">
      <Preview>{template.preview}</Preview>
      <Head>
        <title>{template.title}</title>
        <Font fontFamily="Inter" fallbackFontFamily={["Arial"]} />
      </Head>

      <Body>
        <Container
          style={{
            backgroundColor: "red",
            maxWidth: "680px",
            paddingTop: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            paddingLeft: "20px",
            borderRadius: "10px",
            borderColor: "#000000",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <Row
            type="33/33/33"
            gap="10px"
            style={{
              backgroundColor: "#ffffff",
              paddingTop: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
              paddingLeft: "20px",
            }}
          >
            <Column
              style={{
                backgroundColor: "#f1f1f1",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                paddingLeft: "10px",
                borderWidth: "2px",
                borderColor: "#000000",
                borderRadius: "10px",
                align: "left",
                textAlign: "left",
                borderStyle: "dotted",
                verticalAlign: "top",
              }}
            >
              <p>
                lorem ipsum dolor sit amet consectetur adipiscing elit lorem
                ipsum dolor sit amet consectetur adipiscing elit lorem ipsum
                dolor sit amet consectetur adipiscing elit
              </p>
            </Column>
            <Column
              style={{
                backgroundColor: "#ffffff",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                paddingLeft: "10px",
                borderWidth: "2px",
                borderColor: "#000000",
                borderRadius: "0",
                align: "center",
                textAlign: "left",
                borderStyle: "dashed",
                verticalAlign: "middle",
              }}
            >
              <Button
                text="Click me"
                align="center"
                full={true}
                href="https://www.example.com"
                style={{
                  backgroundColor: "#14f195",
                  color: "#000000",
                  paddingTop: "8px",
                  paddingRight: "15px",
                  paddingBottom: "8px",
                  paddingLeft: "15px",
                  borderRadius: "25px",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              />
            </Column>
            <Column
              style={{
                backgroundColor: "#ffffff",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                paddingLeft: "10px",
                borderWidth: "2px",
                borderColor: "#000000",
                borderRadius: "0",
                align: "left",
                textAlign: "center",
                borderStyle: "dashed",
                verticalAlign: "middle",
                width: "100%",
              }}
            >
              <Img
                src="https://picsum.photos/600/300"
                alt="Placeholder"
                height={120}
              />
            </Column>
          </Row>
          <Row
            type="70/30"
            gap="10px"
            style={{
              backgroundColor: "#ffffff",
              paddingTop: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
              paddingLeft: "20px",
            }}
          >
            <Img src="https://picsum.photos/600/300" alt="Placeholder" />
            <Img src="https://picsum.photos/600/300" alt="Placeholder" />
          </Row>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
