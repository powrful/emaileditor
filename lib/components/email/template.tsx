import {
  Button,
  Column,
  Container,
  Heading,
  Hr,
  Img,
  Row,
  Text,
} from "@/components/elements";
import { type TemplateSchemaType } from "@/lib/schemas/template";
import { Body, Font, Head, Html, Preview } from "@react-email/components";
import React from "react";

interface EmailTemplateProps {
  template: TemplateSchemaType;
}

export const EmailTemplate = ({ template }: EmailTemplateProps) => {
  const renderElement = (element: any) => {
    switch (element.type) {
      case "button":
        return <Button {...element} />;
      case "heading":
        return <Heading {...element} />;
      case "hr":
        return <Hr {...element} />;
      case "image":
        return <Img {...element} />;
      case "text":
        return <Text {...element} />;
      default:
        return null;
    }
  };

  return (
    <Html>
      <Head>
        <title>{template.title}</title>
        <Font
          fontFamily={template.font.family}
          fallbackFontFamily={[]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={template.font.weight.join(", ")}
        />
      </Head>
      <Preview>{template.preview}</Preview>
      <Body style={{ margin: "0", padding: "0" }}>
        <Container {...template.container}>
          {template.container.children.map((row) => (
            <Row key={row.id} {...row}>
              {row.children.map((column) => (
                <Column key={column.id} {...column}>
                  {column.children.map((element, index) => (
                    <React.Fragment key={index}>
                      {renderElement(element)}
                    </React.Fragment>
                  ))}
                </Column>
              ))}
            </Row>
          ))}
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
