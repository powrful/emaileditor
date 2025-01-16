import { nanoid } from "@/utils";
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

import { BorderSchema, PaddingSchema } from "@/components/blocks/schema";

// Base style schemas that can be shared across elements
const BaseStyleSchema = z.object({
  padding: PaddingSchema.optional(),
  backgroundColor: z.string().optional(),
  border: BorderSchema.optional(),
  width: z.string().optional(),
  align: z.enum(["left", "center", "right"]).optional(),
});

// Individual element schemas
const HeadingSchema = z.object({
  id: z.string(),
  type: z.literal("heading"),
  text: z.string(),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]),
  style: BaseStyleSchema.extend({
    fontSize: z.string().optional(),
    color: z.string().optional(),
  }),
});

const TextSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  content: z.string(),
  style: BaseStyleSchema.extend({
    fontSize: z.string().optional(),
    color: z.string().optional(),
    lineHeight: z.string().optional(),
  }),
});

const ButtonSchema = z.object({
  id: z.string(),
  type: z.literal("button"),
  text: z.string(),
  href: z.string().url(),
  style: BaseStyleSchema.extend({
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
  }),
});

const ImageSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  src: z.string().url(),
  alt: z.string(),
  style: BaseStyleSchema.extend({
    maxWidth: z.string().optional(),
  }),
});

const DividerSchema = z.object({
  id: z.string(),
  type: z.literal("divider"),
  style: BaseStyleSchema.extend({
    color: z.string().optional(),
    thickness: z.string().optional(),
  }),
});

const SpacerSchema = z.object({
  id: z.string(),
  type: z.literal("spacer"),
  height: z.string(),
});

type ColumnType = {
  id: string;
  type: "column";
  width: string;
  elements: Array<z.infer<typeof ElementSchema>>;
};

const ColumnSchema: z.ZodType<ColumnType> = z.object({
  id: z.string(),
  type: z.literal("column"),
  width: z.string(),
  elements: z.lazy(() => ElementSchema.array()),
});

const ColumnsSchema = z.object({
  id: z.string(),
  type: z.literal("columns"),
  columns: z.array(ColumnSchema),
  style: BaseStyleSchema,
});

// Combined element schema using discriminated union
const ElementSchema = z.discriminatedUnion("type", [
  HeadingSchema,
  TextSchema,
  ButtonSchema,
  ImageSchema,
  DividerSchema,
  SpacerSchema,
  ColumnsSchema,
]);

// Section schema
const SectionSchema = z.object({
  id: z.string(),
  style: BaseStyleSchema,
  elements: ElementSchema.array(),
});

// Update the TemplateSchema
const TemplateSchema = z.object({
  container: z.object({
    style: BaseStyleSchema,
    sections: SectionSchema.array().optional(),
    elements: ElementSchema.array().optional(),
  }),
});

export type TemplateType = z.infer<typeof TemplateSchema>;

type EmailSchema = {
  title: string;
  template: TemplateType;
};

export const template: TemplateType = {
  container: {
    style: {
      padding: {
        paddingTop: "20px",
        paddingRight: "20px",
        paddingBottom: "20px",
        paddingLeft: "20px",
      },
      backgroundColor: "#ffffff",
      border: {
        borderWidth: "1px",
        borderColor: "#eaeaea",
        borderRadius: "14px",
      },
      width: "600px",
      align: "center",
    },
    sections: [
      {
        id: nanoid(),
        style: {
          backgroundColor: "#f9f9f9",
          padding: {
            paddingTop: "32px",
            paddingRight: "32px",
            paddingBottom: "32px",
            paddingLeft: "32px",
          },
        },
        elements: [
          {
            id: nanoid(),
            type: "heading",
            text: "Welcome to Our Newsletter",
            level: "h2",
            style: {
              // fontSize: "24px",
              color: "#333333",
              align: "center",
            },
          },
          {
            id: nanoid(),
            type: "spacer",
            height: "20px",
          },
          {
            id: nanoid(),
            type: "text",
            content: "We're excited to share our latest updates with you!",
            style: {
              fontSize: "16px",
              color: "#666666",
              lineHeight: "1.5",
              align: "center",
            },
          },
        ],
      },
      {
        id: nanoid(),
        style: {
          padding: {
            paddingTop: "32px",
            paddingRight: "32px",
            paddingBottom: "32px",
            paddingLeft: "32px",
          },
        },
        elements: [
          {
            id: nanoid(),
            type: "columns",
            style: {
              padding: {
                paddingTop: "20px",
                paddingRight: "0",
                paddingBottom: "20px",
                paddingLeft: "0",
              },
            },
            columns: [
              {
                id: nanoid(),
                type: "column",
                width: "50%",
                elements: [
                  {
                    id: nanoid(),
                    type: "image",
                    src: "https://picsum.photos/1000/1000",
                    alt: "Product 1",
                    style: {
                      maxWidth: "100%",
                    },
                  },
                  {
                    id: nanoid(),
                    type: "text",
                    content: "Check out our new product!",
                    style: {
                      fontSize: "16px",
                      align: "center",
                    },
                  },
                ],
              },
              {
                id: nanoid(),
                type: "column",
                width: "50%",
                elements: [
                  {
                    id: nanoid(),
                    type: "image",
                    src: "https://picsum.photos/1000/1000",
                    alt: "Product 2",
                    style: {
                      maxWidth: "100%",
                      padding: {
                        paddingTop: "20px",
                        paddingRight: "0",
                        paddingBottom: "20px",
                        paddingLeft: "0",
                      },
                    },
                  },
                  {
                    id: nanoid(),
                    type: "text",
                    content: "Another amazing product!",
                    style: {
                      fontSize: "16px",
                      align: "center",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: nanoid(),
        style: {
          backgroundColor: "#f0f0f0",
          padding: {
            paddingTop: "32px",
            paddingRight: "32px",
            paddingBottom: "32px",
            paddingLeft: "32px",
          },
        },
        elements: [
          {
            id: nanoid(),
            type: "button",
            text: "Shop Now",
            href: "https://example.com/shop",
            style: {
              backgroundColor: "#007bff",
              color: "#ffffff",
              padding: {
                paddingTop: "12px",
                paddingRight: "24px",
                paddingBottom: "12px",
                paddingLeft: "24px",
              },
              align: "center",
              border: {
                borderRadius: "4px",
                borderWidth: "1px",
                borderColor: "#007bff",
              },
            },
          },
          {
            id: nanoid(),
            type: "spacer",
            height: "20px",
          },
          {
            id: nanoid(),
            type: "divider",
            style: {
              color: "#dddddd",
              thickness: "1px",
            },
          },
        ],
      },
    ],
  },
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

export function Email({ title, template }: EmailSchema) {
  const renderElement = (element: z.infer<typeof ElementSchema>) => {
    switch (element.type) {
      case "heading":
        return (
          <Heading
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
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          >
            {element.content}
          </Text>
        );

      case "button":
        return (
          <Button
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
            src={element.src}
            alt={element.alt}
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          />
        );

      case "divider":
        return (
          <Hr
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          />
        );

      case "spacer":
        return (
          <div
            data-element-id={element.id}
            style={{ height: element.height, lineHeight: element.height }}
          >
            &nbsp;
          </div>
        );

      case "columns":
        return (
          <Row
            data-element-id={element.id}
            style={flattenStyles(element.style)}
          >
            {element.columns.map((column) => (
              <Column
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
