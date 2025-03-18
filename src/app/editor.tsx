"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Highlight from "@tiptap/extension-highlight"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    ChevronDown,
    Heading1,
    Heading2,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    UnderlineIcon,
} from "lucide-react"
import { useState } from "react"

// Define highlight colors
const HIGHLIGHT_COLORS = [
    { name: "Yellow", color: "#FEF08A" },
    { name: "Red", color: "#FECACA" },
    { name: "Green", color: "#BBF7D0" },
    { name: "Blue", color: "#BFDBFE" },
    { name: "Purple", color: "#DDD6FE" },
    { name: "Pink", color: "#FBCFE8" },
]

export default function TiptapEditor() {
    const [editorContent, setEditorContent] = useState("<p>Hello, this is a basic Tiptap editor!</p>")
    const [activeHighlightColor, setActiveHighlightColor] = useState(HIGHLIGHT_COLORS[0])

    const editor = useEditor({
        extensions: [StarterKit, Underline, Highlight.configure({ multicolor: true })],
        content: editorContent,
        onUpdate: ({ editor }) => {
            setEditorContent(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "focus:outline-none min-h-[150px] prose max-w-none",
            },
        },
    })

    if (!editor) {
        return <div>Loading editor...</div>
    }

    const toggleFormat = (format: string) => {
        switch (format) {
            case "bold":
                editor.chain().focus().toggleBold().run()
                break
            case "italic":
                editor.chain().focus().toggleItalic().run()
                break
            case "strike":
                editor.chain().focus().toggleStrike().run()
                break
            case "underline":
                editor.chain().focus().toggleUnderline().run()
                break
            case "h1":
                editor.chain().focus().toggleHeading({ level: 1 }).run()
                break
            case "h2":
                editor.chain().focus().toggleHeading({ level: 2 }).run()
                break
            case "bulletList":
                editor.chain().focus().toggleBulletList().run()
                break
            case "orderedList":
                editor.chain().focus().toggleOrderedList().run()
                break
            case "alignLeft":
                editor.chain().focus().setTextAlign("left").run()
                break
            case "alignCenter":
                editor.chain().focus().setTextAlign("center").run()
                break
            case "alignRight":
                editor.chain().focus().setTextAlign("right").run()
                break
            default:
                break
        }
    }

    const applyHighlight = (color: string) => {
        editor.chain().focus().toggleHighlight({ color }).run()
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="border rounded-lg overflow-hidden shadow-sm bg-card">
                <div className="bg-muted/40 p-2 border-b flex flex-wrap gap-1 items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("bold")}
                        className={editor.isActive("bold") ? "bg-accent text-accent-foreground" : ""}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("italic")}
                        className={editor.isActive("italic") ? "bg-accent text-accent-foreground" : ""}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("strike")}
                        className={editor.isActive("strike") ? "bg-accent text-accent-foreground" : ""}
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("underline")}
                        className={editor.isActive("underline") ? "bg-accent text-accent-foreground" : ""}
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex gap-1 h-8 px-2 items-center">
                                <div className="flex items-center gap-1">
                                    <Highlighter className="h-4 w-4" />
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: activeHighlightColor.color }} />
                                    <ChevronDown className="h-3 w-3" />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {HIGHLIGHT_COLORS.map((color) => (
                                <DropdownMenuItem
                                    key={color.name}
                                    onClick={() => {
                                        applyHighlight(color.color)
                                        setActiveHighlightColor(color)
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color.color }} />
                                    <span>{color.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="h-6 w-px bg-border mx-1"></div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("h1")}
                        className={editor.isActive("heading", { level: 1 }) ? "bg-accent text-accent-foreground" : ""}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("h2")}
                        className={editor.isActive("heading", { level: 2 }) ? "bg-accent text-accent-foreground" : ""}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>

                    <div className="h-6 w-px bg-border mx-1"></div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("bulletList")}
                        className={editor.isActive("bulletList") ? "bg-accent text-accent-foreground" : ""}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("orderedList")}
                        className={editor.isActive("orderedList") ? "bg-accent text-accent-foreground" : ""}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>

                    <div className="h-6 w-px bg-border mx-1"></div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("alignLeft")}
                        className={editor.isActive({ textAlign: "left" }) ? "bg-accent text-accent-foreground" : ""}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("alignCenter")}
                        className={editor.isActive({ textAlign: "center" }) ? "bg-accent text-accent-foreground" : ""}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFormat("alignRight")}
                        className={editor.isActive({ textAlign: "right" }) ? "bg-accent text-accent-foreground" : ""}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="p-4 bg-card">
                    <EditorContent
                        editor={editor}
                        className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                    />
                </div>
            </div>

            <div className="mt-4 p-4 border rounded-lg bg-muted/40">
                <h3 className="text-sm font-medium mb-2">HTML Output:</h3>
                <pre className="text-xs bg-card p-3 rounded overflow-auto max-h-[200px] border">{editorContent}</pre>
            </div>
        </div>
    )
}

