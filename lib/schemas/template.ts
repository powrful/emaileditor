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

export type ElementType = z.infer<typeof ElementSchema>;

// Column with children
export const ColumnWithChildrenSchema = ColumnSchema.extend({
  id: z.string(),
  type: z.literal("column"),
  children: z.array(ElementSchema),
});

export type ColumnWithChildrenType = z.infer<typeof ColumnWithChildrenSchema>;

// Row with children
export const RowWithChildrenSchema = RowSchema.extend({
  id: z.string(),
  type: z.literal("row"),
  children: z.array(ColumnWithChildrenSchema),
});

export type RowWithChildrenType = z.infer<typeof RowWithChildrenSchema>;

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
        title: "Logo Row",
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
            title: "Logo Column",
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
                title: "Logo",
                type: "image",
                src: "https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/66eeb045df9d4c640308457d_Layers.svg",
                alt: "Company Logo",
                width: 50,
                height: 20,
              },
            ],
          },
        ],
      },
      // Hero Image Section
      {
        id: "row-hero-image",
        title: "Hero Image Row",
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
            title: "Hero Image Column",
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
                title: "Hero Image",
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
        title: "Content Row",
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
            title: "Content Column",
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
                title: "Welcome Heading",
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
                title: "Intro Text",
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
                title: "Get Started Button",
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
        title: "Feature Grid Row",
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
            title: "Feature 1 Column",
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
                title: "Feature 1 Image",
                type: "image",
                src: "https://picsum.photos/seed/sample1/200/200",
                alt: "Feature 1",
                width: 200,
                height: 100,
              },
              {
                id: "heading-feature-1",
                title: "Feature 1 Heading",
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
                title: "Feature 1 Text",
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
            title: "Feature 2 Column",
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
                title: "Feature 2 Image",
                type: "image",
                src: "https://picsum.photos/seed/sample2/200/200",
                alt: "Feature 2",
                width: 200,
                height: 100,
              },
              {
                id: "heading-feature-2",
                title: "Feature 2 Heading",
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
                title: "Feature 2 Text",
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
            title: "Feature 3 Column",
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
                title: "Feature 3 Image",
                type: "image",
                src: "https://picsum.photos/seed/sample3/200/200",
                alt: "Feature 3",
                width: 200,
                height: 100,
              },
              {
                id: "heading-feature-3",
                title: "Feature 3 Heading",
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
                title: "Feature 3 Text",
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
        title: "Footer Row",
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
            title: "Footer Column",
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
                title: "Footer Text",
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
                title: "Unsubscribe Link",
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
