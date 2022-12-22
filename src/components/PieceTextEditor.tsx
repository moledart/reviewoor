import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";
import reviewForm from "../atoms/reviewFormData";

const CustomDocument = Document.extend({
  content: "heading block*",
});

const PieceTextEditor = () => {
  const [reviewContent, setReviewContent] = useAtom(reviewForm.contentAtom);
  const [, setReviewTitle] = useAtom(reviewForm.titleAtom);

  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Heading";
          }

          return "Paragraph";
        },
      }),
    ],
    content: reviewContent,
    onUpdate({ editor }) {
      const content = editor.getJSON();
      const title = content.content
        ?.find((element) => element.type === "heading")
        ?.content?.at(0)?.text;
      setReviewContent(content);
      setReviewTitle(title || "");
    },
  });

  return (
    <Stack spacing={8}>
      <Text size="sm">Write your review here</Text>

      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        {editor && (
          <>
            <BubbleMenu editor={editor} className="gap-2">
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
              </RichTextEditor.ControlsGroup>
            </BubbleMenu>
            <FloatingMenu editor={editor}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
                <RichTextEditor.BulletList />
              </RichTextEditor.ControlsGroup>
            </FloatingMenu>
          </>
        )}

        <RichTextEditor.Content />
      </RichTextEditor>
    </Stack>
  );
};

export default PieceTextEditor;
