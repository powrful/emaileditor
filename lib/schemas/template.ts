import {
  ButtonSchema,
  ColumnSchema,
  ContainerSchema,
  HeadingSchema,
  HrSchema,
  ImgSchema,
  LinkSchema,
  RowSchema,
  TextSchema,
} from "@/components/elements";
import { z } from "zod";

// Define element schemas
const ElementSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("button"),
    ...ButtonSchema.shape,
  }),
  z.object({
    type: z.literal("heading"),
    ...HeadingSchema.shape,
  }),
  z.object({
    type: z.literal("hr"),
    ...HrSchema.shape,
  }),
  z.object({
    type: z.literal("image"),
    ...ImgSchema.shape,
  }),
  z.object({
    type: z.literal("link"),
    ...LinkSchema.shape,
  }),
  z.object({
    type: z.literal("text"),
    ...TextSchema.shape,
    children: z.array(z.string()).optional(),
  }),
]);

// Column with children
const ColumnWithChildrenSchema = ColumnSchema.extend({
  id: z.string(),
  type: z.literal("column"),
  children: z.array(ElementSchema),
});

// Row with children
const RowWithChildrenSchema = RowSchema.extend({
  id: z.string(),
  type: z.literal("row"),
  children: z.array(ColumnWithChildrenSchema),
});

// Container with children
const ContainerWithChildrenSchema = ContainerSchema.extend({
  type: z.literal("container"),
  children: z.array(RowWithChildrenSchema),
});

// Font schema
const FontSchema = z.object({
  family: z.string().optional().default("Arial"),
  fallback: z.array(z.string()).optional().default(["Helvetica", "sans-serif"]),
  weight: z.array(z.number()).optional().default([400, 700]),
});

// Main template schema
export const TemplateSchema = z.object({
  title: z.string(),
  preview: z.string(),
  font: FontSchema,
  container: ContainerWithChildrenSchema,
});

export type TemplateSchemaType = z.infer<typeof TemplateSchema>;

// Example template with default values
export const defaultTemplate: TemplateSchemaType = {
  title: "Welcome Email Template",
  preview: "Welcome to our platform! Here's what you need to know",
  font: {
    family: "Inter",
    fallback: ["Helvetica", "sans-serif"],
    weight: [400, 500, 600, 700],
  },
  container: {
    id: "container-1",
    type: "container",
    style: {
      backgroundColor: "#ffffff",
      maxWidth: "600px",
      paddingTop: "10px",
      paddingRight: "10px",
      paddingBottom: "10px",
      paddingLeft: "10px",
      borderRadius: "0px",
      borderColor: "#000000",
      borderWidth: "0px",
      borderStyle: "none",
    },
    children: [
      // Logo Row
      {
        id: "row-logo",
        type: "row",
        columns: "100",
        gap: "0",
        style: {
          backgroundColor: "#ffffff",
          paddingTop: "5px",
          paddingRight: "5px",
          paddingBottom: "5px",
          paddingLeft: "5px",
        },
        children: [
          {
            id: "col-logo",
            type: "column",
            style: {
              width: "100%",
              backgroundColor: "transparent",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
              paddingLeft: "5px",
              align: "left",
              textAlign: "left",
              verticalAlign: "middle",
              borderRadius: "0px",
              borderColor: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
            },
            children: [
              {
                id: "logo",
                type: "image",
                src: "https://picsum.photos/seed/logo/120/40",
                alt: "Company Logo",
                width: 120,
                height: 40,
              },
            ],
          },
        ],
      },
      // Hero Image Section
      {
        id: "row-hero-image",
        type: "row",
        columns: "100",
        gap: "0",
        style: {
          backgroundColor: "#ffffff",
          paddingTop: "5px",
          paddingRight: "5px",
          paddingBottom: "5px",
          paddingLeft: "5px",
        },
        children: [
          {
            id: "col-hero-image",
            type: "column",
            style: {
              width: "100%",
              backgroundColor: "transparent",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
              paddingLeft: "5px",
              align: "left",
              textAlign: "left",
              verticalAlign: "middle",
              borderRadius: "0px",
              borderColor: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
            },
            children: [
              {
                id: "hero-image",
                type: "image",
                src: "https://picsum.photos/seed/hero/600/300",
                alt: "Welcome Hero Image",
                width: 600,
                height: 300,
              },
            ],
          },
        ],
      },
      // Content Section
      {
        id: "row-content",
        type: "row",
        columns: "100",
        gap: "0",
        style: {
          backgroundColor: "#ffffff",
          paddingTop: "5px",
          paddingRight: "5px",
          paddingBottom: "5px",
          paddingLeft: "5px",
        },
        children: [
          {
            id: "col-content",
            type: "column",
            style: {
              width: "100%",
              backgroundColor: "transparent",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
              paddingLeft: "5px",
              align: "left",
              textAlign: "left",
              verticalAlign: "middle",
              borderRadius: "0px",
              borderColor: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
            },
            children: [
              {
                id: "heading-welcome",
                type: "heading",
                as: "h1",
                text: "Welcome to Our Platform!",
                style: {
                  color: "#000000",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  marginLeft: "0px",
                  marginRight: "0px",
                },
              },
              {
                id: "text-intro",
                type: "text",
                text: "We're excited to have you on board. Here's everything you need to know to get started.",
                style: {
                  fontWeight: "normal",
                  color: "#000000",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  letterSpacing: "0",
                  textAlign: "left",
                },
              },
              {
                id: "button-getting-started",
                type: "button",
                href: "#",
                full: false,
                text: "Get Started",
                align: "left",
                style: {
                  backgroundColor: "#000000",
                  borderRadius: "50px",
                  color: "#ffffff",
                  paddingTop: "15px",
                  paddingRight: "30px",
                  paddingBottom: "15px",
                  paddingLeft: "30px",
                  fontSize: "14px",
                  textAlign: "center",
                },
              },
            ],
          },
        ],
      },
      // Feature Grid with Images
      {
        id: "row-features",
        type: "row",
        columns: "33/33/33",
        gap: "16px",
        style: {
          backgroundColor: "#ffffff",
          paddingTop: "5px",
          paddingRight: "5px",
          paddingBottom: "5px",
          paddingLeft: "5px",
        },
        children: [
          {
            id: "col-feature-1",
            type: "column",
            style: {
              width: "100%",
              backgroundColor: "transparent",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
              paddingLeft: "5px",
              align: "left",
              textAlign: "left",
              verticalAlign: "middle",
              borderRadius: "0px",
              borderColor: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
            },
            children: [
              {
                id: "image-feature-1",
                type: "image",
                src: "https://picsum.photos/seed/sample1/200/200",
                alt: "Feature 1",
                width: 200,
                height: 100,
              },
              {
                id: "heading-feature-1",
                type: "heading",
                as: "h2",
                text: "Feature One",
                style: {
                  color: "#000000",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  marginLeft: "0px",
                  marginRight: "0px",
                },
              },
              {
                id: "text-feature-1",
                type: "text",
                text: "Discover amazing possibilities.",
                style: {
                  fontWeight: "normal",
                  color: "#000000",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  letterSpacing: "0",
                  textAlign: "left",
                },
              },
            ],
          },
          {
            id: "col-feature-2",
            type: "column",
            style: {
              width: "100%",
              backgroundColor: "transparent",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
              paddingLeft: "5px",
              align: "left",
              textAlign: "left",
              verticalAlign: "middle",
              borderRadius: "0px",
              borderColor: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
            },
            children: [
              {
                id: "image-feature-2",
                type: "image",
                src: "https://picsum.photos/seed/sample2/200/200",
                alt: "Feature 2",
                width: 200,
                height: 100,
              },
              {
                id: "heading-feature-2",
                type: "heading",
                as: "h2",
                text: "Feature Two",
                style: {
                  color: "#000000",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  marginLeft: "0px",
                  marginRight: "0px",
                },
              },
              {
                id: "text-feature-2",
                type: "text",
                text: "Build something great.",
                style: {
                  fontWeight: "normal",
                  color: "#000000",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  letterSpacing: "0",
                  textAlign: "left",
                },
              },
            ],
          },
          {
            id: "col-feature-3",
            type: "column",
            style: {
              width: "100%",
              backgroundColor: "transparent",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
              paddingLeft: "5px",
              align: "left",
              textAlign: "left",
              verticalAlign: "middle",
              borderRadius: "0px",
              borderColor: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
            },
            children: [
              {
                id: "image-feature-3",
                type: "image",
                src: "https://picsum.photos/seed/sample3/200/200",
                alt: "Feature 3",
                width: 200,
                height: 100,
              },
              {
                id: "heading-feature-3",
                type: "heading",
                as: "h2",
                text: "Feature Three",
                style: {
                  color: "#000000",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  marginLeft: "0px",
                  marginRight: "0px",
                },
              },
              {
                id: "text-feature-3",
                type: "text",
                text: "Achieve your goals.",
                style: {
                  fontWeight: "normal",
                  color: "#000000",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  letterSpacing: "0",
                  textAlign: "left",
                },
              },
            ],
          },
        ],
      },
      // Footer
      {
        id: "row-footer",
        type: "row",
        columns: "100",
        gap: "0",
        style: {
          backgroundColor: "#ffffff",
          paddingTop: "5px",
          paddingRight: "5px",
          paddingBottom: "5px",
          paddingLeft: "5px",
        },
        children: [
          {
            id: "col-footer",
            type: "column",
            style: {
              width: "100%",
              backgroundColor: "transparent",
              paddingTop: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
              paddingLeft: "5px",
              align: "left",
              textAlign: "left",
              verticalAlign: "middle",
              borderRadius: "0px",
              borderColor: "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
            },
            children: [
              {
                id: "text-footer",
                type: "text",
                text: "© 2024 Your Company. All rights reserved.",
                style: {
                  fontWeight: "normal",
                  color: "#000000",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  letterSpacing: "0",
                  textAlign: "left",
                },
              },
              {
                id: "link-unsubscribe",
                type: "link",
                href: "#",
                text: "Unsubscribe",
                style: {
                  textDecoration: "underline",
                  fontWeight: "bold",
                  color: "#155dfc",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
