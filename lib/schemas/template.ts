import {
  ButtonSchema,
  ColumnSchema,
  ContainerSchema,
  HeadingSchema,
  HrSchema,
  ImgSchema,
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
                type: "image",
                src: "https://pub-e63b17b4d990438a83af58c15949f8a2.r2.dev/type/ideaa.png",
                title: "Company Logo",
                width: "20%",
                height: "20%",
                align: "left",
                shape: "square",
                spacing: 0,
              },
            ],
          },
        ],
      },

      // HR row
      {
        id: "row-hr",
        title: "HR Row",
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
            id: "col-hr",
            title: "HR Column",
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
                id: "hr-1",
                type: "hr",
                title: "HR",
                width: "100%",
                thickness: "2px",
                color: "#000000",
                horizontalMargin: 0,
                verticalMargin: 0,
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
                type: "image",
                src: "https://picsum.photos/seed/hero/600/300",
                title: "Welcome Hero Image",
                width: "100%",
                height: "100%",
                align: "center",
                shape: "rounded",
                spacing: 0,
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
                text: "Welcome to Our Platform! 👋",
                color: "#000000",
                horizontalPadding: 0,
                verticalPadding: 0,
                horizontalMargin: 0,
                verticalMargin: 0,
                lineHeight: 1.5,
                fontWeight: "400",
                fontFamily: "Arial, Helvetica, sans-serif",
                textAlign: "left",
              },
              {
                id: "text-intro",
                title: "Intro Text",
                type: "text",
                html: "We're excited to have you on board. Here's everything you need to know to get started.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.5,
                fontWeight: "400",
                fontFamily: "Arial, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "16px",
              },
              {
                id: "button-1",
                title: "Button 1",
                type: "button",
                text: "Click me",
                fontFamily: "Arial, Helvetica, sans-serif",
                href: "#",
                align: "left",
                width: "50%",
                height: 10,
                spacing: 0,
                backgroundColor: "#000000",
                color: "#ffffff",
                fontSize: "16px",
                borderRadius: 4,
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
                type: "image",
                src: "https://picsum.photos/seed/sample1/200/200",
                title: "Feature 1",
                width: "100%",
                height: "100%",
                align: "center",
                shape: "rounded",
                spacing: 0,
              },
              {
                id: "heading-1",
                title: "Heading 1",
                type: "heading",
                as: "h3",
                text: "Heading 1",
                horizontalPadding: 1,
                verticalPadding: 1,
                horizontalMargin: 0,
                verticalMargin: 0,
                color: "#000000",
                lineHeight: 1.5,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "400",
                textAlign: "left",
              },
              {
                id: "text-feature-1",
                title: "Feature 1 Text",
                type: "text",
                html: "Discover amazing possibilities.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.5,
                fontWeight: "400",
                fontFamily: "Arial, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "16px",
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
                type: "image",
                src: "https://picsum.photos/seed/sample2/200/200",
                title: "Feature 2",
                width: "100%",
                height: "100%",
                align: "center",
                shape: "rounded",
                spacing: 0,
              },
              {
                id: "heading-2",
                title: "Heading 2",
                type: "heading",
                as: "h3",
                text: "Heading 2",
                horizontalPadding: 1,
                verticalPadding: 1,
                horizontalMargin: 0,
                verticalMargin: 0,
                color: "#000000",
                lineHeight: 1.5,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "400",
                textAlign: "left",
              },
              {
                id: "text-feature-2",
                title: "Feature 2 Text",
                type: "text",
                html: "Build something great.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.5,
                fontWeight: "400",
                fontFamily: "Arial, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "16px",
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
                type: "image",
                src: "https://picsum.photos/seed/sample3/200/200",
                title: "Feature 3",
                width: "100%",
                height: "100%",
                align: "center",
                shape: "rounded",
                spacing: 0,
              },
              {
                id: "heading-3",
                title: "Heading 3",
                type: "heading",
                as: "h3",
                text: "Heading 3",
                horizontalPadding: 1,
                verticalPadding: 1,
                horizontalMargin: 0,
                verticalMargin: 0,
                color: "#000000",
                lineHeight: 1.5,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "400",
                textAlign: "left",
              },
              {
                id: "text-feature-3",
                title: "Feature 3 Text",
                type: "text",
                html: "Achieve your goals.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.5,
                fontWeight: "400",
                fontFamily: "Arial, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "16px",
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
                html: "© 2024 Your Company. All rights reserved.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.5,
                fontWeight: "400",
                fontFamily: "Arial, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "16px",
              },
              {
                id: "unsubscribe-link",
                title: "Unsubscribe Link",
                type: "text",
                html: "<a href='#'>Unsubscribe</a>",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.5,
                fontWeight: "400",
                fontFamily: "Arial, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "12px",
              },
            ],
          },
        ],
      },
    ],
  },
};
