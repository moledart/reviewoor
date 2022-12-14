import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, BubbleMenu, FloatingMenu, Content } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";
import reviewForm from "../atoms/reviewFormData";
import { useEffect, useState } from "react";
import { langSwitcherAtom } from "../atoms/lang";
import formLabels from "../lang/formLabels";

const PieceTextEditor = () => {
  const [reviewContent, setReviewContent] = useAtom(reviewForm.contentAtom);
  const [lang] = useAtom(langSwitcherAtom);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Placeholder.configure({ placeholder: "Start typing" }),
      ],

      content: reviewContent as Content,
      onUpdate({ editor }) {
        const content = editor.getJSON();
        setReviewContent(content);
      },
    },
    []
  );

  return (
    <Stack spacing={8}>
      <Text size="sm">{formLabels.content[lang]}</Text>

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
