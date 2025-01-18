import {
  Button,
  Column,
  Container,
  Heading,
  Hr,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { z } from "zod";

import type { ColumnType } from "@/components/blocks/column";
import {
  ElementsSchema,
  type TemplateType,
} from "@/components/blocks/elements";

type EmailSchema = {
  title: string;
  template: TemplateType;
};

const flattenStyles = (style: any) => {
  if (!style) return {};

  const flatStyle = { ...style };

  // Handle padding object
  if (style.padding) {
    Object.assign(flatStyle, style.padding);
    delete flatStyle.padding;
  }

  if (style.margin) {
    Object.assign(flatStyle, style.margin);
    delete flatStyle.margin;
  }

  // Handle border object
  if (style.border) {
    Object.assign(flatStyle, style.border);
    delete flatStyle.border;
  }

  return flatStyle;
};

export function Email({ template }: EmailSchema) {
  const renderElement = (element: z.infer<typeof ElementsSchema>) => {
    switch (element.type) {
      case "heading":
        return (
          <Heading
            key={element.id}
            as={element.level}
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          >
            {element.text}
          </Heading>
        );

      case "text":
        return (
          <Text
            key={element.id}
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          >
            {element.content}
          </Text>
        );

      case "button":
        return (
          <Button
            key={element.id}
            href={element.href}
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          >
            {element.text}
          </Button>
        );

      case "image":
        return (
          <Img
            key={element.id}
            src={element.src}
            alt={element.alt}
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          />
        );

      case "divider":
        return (
          <Hr
            key={element.id}
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          />
        );

      case "spacer":
        return (
          <div
            key={element.id}
            data-element-id={element.id}
            style={{ height: element.height, lineHeight: element.height }}
          >
            &nbsp;
          </div>
        );

      case "row":
        return (
          <Row
            key={element.id}
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          >
            {element.row.map((column: ColumnType) => (
              <Column
                key={column.id}
                data-column-id={column.id}
                style={{ width: column.width }}
              >
                {column.elements.map(renderElement)}
              </Column>
            ))}
          </Row>
        );
    }
  };

  return (
    <Container style={flattenStyles(template.container.style)}>
      {template.container.sections?.map((section) => (
        <Section
          key={section.id}
          data-section-id={section.id}
          style={flattenStyles(section.style)}
        >
          {section.elements.map(renderElement)}
        </Section>
      ))}
      {template.container.elements?.map(renderElement)}
    </Container>
  );
}
