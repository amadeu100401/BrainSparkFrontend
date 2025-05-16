import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-dark.css'
import { BubbleButton } from './BubbleButton'
import { FloatMenuButton } from './FloatMenuButton'
import {
    RxFontBold,
    RxFontItalic,
    RxStrikethrough,
    RxCode,
    RxChevronDown,
    RxChatBubble
} from 'react-icons/rx'

const lowlight = createLowlight();

lowlight.register('js', js)

export interface EditorProps {}

export function Editor(props: EditorProps) {
    const extensions = [
        StarterKit,
        CodeBlockLowlight.configure({
            lowlight,
        })
    ]
    const content = '<p>Novo documento</p>'

     const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'outline-none',
            }
        }
    })

    return (
        <>
            <EditorContent
                className="max-w-[1200px] mx-auto pt-16 prose prose-violet" 
                editor={editor}
            />
            {editor && (
                <FloatingMenu editor={editor} 
                shouldShow={({ state }) => {
                    const { $from } = state.selection

                    const currentLineText = $from.nodeBefore?.textContent 

                    return currentLineText === '/';
                }}
                className='bg-zinc-800 
                            py-2 px-1 
                            gap-1
                            shadow-xl 
                            border-zinc-600 
                            shadow-black/20
                            rounded-lg
                            overflow-hidden
                            flex flex-col'
                >
                    <FloatMenuButton
                        imageUrl="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOC41NTYgMTlxLS4yNTggMC0uNDQ1LS4xOHQtLjE4OC0uNDM2VjYuMjVIMy42MzVxLS4yNjUgMC0uNDUtLjE4NFQzIDUuNjE5dC4xOC0uNDQxVDMuNjE1IDVoOS44NDZxLjI2NSAwIC40NS4xOHQuMTg1LjQzOHQtLjE4LjQ0NHQtLjQzNS4xODhIOS4xNzN2MTIuMTE2cTAgLjI2NC0uMTguNDQ5VDguNTU2IDE5bTguODY1IDBxLS4yNTcgMC0uNDM1LS4xOHEtLjE3OC0uMTc5LS4xNzgtLjQzNnYtNy4yM0gxNC40OHEtLjI2NSAwLS40NS0uMTg0dC0uMTg1LS40NDd0LjE4LS40NDF0LjQzNi0uMTc4aDUuOTA0cS4yNjQgMCAuNDQ5LjE4dC4xODUuNDM4dC0uMTguNDQ0dC0uNDM1LjE4OGgtMi4zNDZ2Ny4yM3EwIC4yNTctLjE4LjQzNnEtLjE4LjE4LS40MzguMTgiLz48L3N2Zz4="
                        alt="Texto"
                        title="Texto"
                        subtitle="Apenas um texto simples"
                        onClick={() => console.log('')}
                    />
                    <FloatMenuButton
                        imageUrl="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNiAxNi41di05aDF2NGg1di00aDF2OWgtMXYtNEg3djR6bTExIDB2LThoLTJ2LTFoM3Y5eiIvPjwvc3ZnPg=="
                        alt="Heading 1"
                        title="Cabeçalho 1"
                        subtitle="Cabeçalho principal de uma seção"
                        onClick={() => console.log('')}
                    />
                    <FloatMenuButton
                        imageUrl="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNCAxNi41di05aDF2NGg1di00aDF2OWgtMXYtNEg1djR6bTkgMHYtMy4zODRxMC0uNjY3LjQ3NS0xLjE0MXQxLjE0LS40NzVoMy43N3EuMjY5IDAgLjQ0Mi0uMTczdC4xNzMtLjQ0MnYtMS43N3EwLS4yNjktLjE3My0uNDQydC0uNDQyLS4xNzNIMTN2LTFoNS4zODVxLjY2NiAwIDEuMTQuNDc1VDIwIDkuMTE1djEuNzdxMCAuNjY2LS40NzUgMS4xNHQtMS4xNC40NzVoLTMuNzdxLS4yNjkgMC0uNDQyLjE3M3QtLjE3My40NDNWMTUuNWg2djF6Ii8+PC9zdmc+"
                        alt="Heading 2"
                        title="Cabeçalho 2"
                        subtitle="Cabeçalho médio de uma seção"
                        onClick={() => console.log('')}
                    />
                    <FloatMenuButton
                        imageUrl="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNCAxNi41di05aDF2NGg1di00aDF2OWgtMXYtNEg1djR6bTkgMHYtMWg1LjM4NXEuMjY5IDAgLjQ0Mi0uMTczdC4xNzMtLjQ0MlYxMi41aC00di0xaDRWOS4xMTZxMC0uMjctLjE3My0uNDQzdC0uNDQyLS4xNzNIMTN2LTFoNS4zODVxLjY2NiAwIDEuMTQuNDc1VDIwIDkuMTE1djUuNzdxMCAuNjY2LS40NzUgMS4xNHQtMS4xNC40NzV6Ii8+PC9zdmc+"
                        alt="Heading 3"
                        title="Cabeçalho 3"
                        subtitle="Cabeçalho pequeno de uma seção"
                        onClick={() => console.log('')}
                    />
                </FloatingMenu>
            )}

            { editor && (
                <BubbleMenu className='bg-zinc-700 
                                        shadow-xl 
                                        border-zinc-600 
                                        shadow-black/20
                                        rounded-lg
                                        overflow-hidden
                                        flex
                                        divide-x 
                                        divide-zinc-600' editor={editor}
                            tippyOptions={{ duration: 100 }}
                >
                    
                    <BubbleButton>
                        Text
                        <RxChevronDown className='w-4 h-4'/>
                    </BubbleButton>
                    <BubbleButton>
                        Comment
                        <RxChatBubble className='w-4 h-4'/>
                    </BubbleButton>
                    <div className='flex items-center'>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            data-active={editor.isActive('bold')}
                        >
                            <RxFontBold className='w-4 h-4'/>
                        </BubbleButton>

                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            data-active={editor.isActive('italic')}
                        >
                            <RxFontItalic className='w-4 h-4'/>
                        </BubbleButton>

                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            data-active={editor.isActive('strik')}
                        >
                            <RxStrikethrough className='w-4 h-4'/>
                        </BubbleButton>

                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            data-active={editor.isActive('code')}
                        >
                            <RxCode className='w-4 h-4'/>
                        </BubbleButton>
                    </div>
                </BubbleMenu>             
            )}
        </>
    )
}