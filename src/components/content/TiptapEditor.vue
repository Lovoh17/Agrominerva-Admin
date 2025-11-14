<template>
    <div class="editor-container border border-neutral-300 rounded-lg bg-white shadow-soft">
        <!-- Menu de herramientas -->
        <div v-if="editor"
            class="menu-bar border-b border-neutral-200 p-3 bg-neutral-50 flex flex-wrap items-center gap-2">
            <!-- Encabezados -->
            <select v-model="headingLevel" @change="setHeading"
                class="px-3 py-1.5 border border-neutral-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors">
                <option value="">Párrafo</option>
                <option value="1">Título 1</option>
                <option value="2">Título 2</option>
                <option value="3">Título 3</option>
            </select>

            <!-- Separador -->
            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Botones de formato de texto -->
            <button @click="editor.chain().focus().toggleBold().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('bold') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Negrita">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 6h8m-8 6h13m-13 6h8M15 6v12a3 3 0 0 0 3-3" />
                </svg>
            </button>

            <button @click="editor.chain().focus().toggleItalic().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('italic') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Cursiva">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 20l4-16m2 16l4-16M6 4h4m4 0h4" />
                </svg>
            </button>

            <button @click="editor.chain().focus().toggleStrike().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('strike') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Tachado">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12M4 4h16M4 20h16" />
                </svg>
            </button>

            <button @click="editor.chain().focus().toggleCode().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('code') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Código en línea">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </button>

            <!-- Separador -->
            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Listas -->
            <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('bulletList') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Lista con viñetas">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('orderedList') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Lista numerada">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16M8 6v12M12 6v12" />
                </svg>
            </button>

            <!-- Separador -->
            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Bloques -->
            <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('blockquote') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Cita">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>

            <button @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive('codeBlock') ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Bloque de código">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </button>

            <!-- Separador -->
            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Alineación -->
            <button @click="editor.chain().focus().setTextAlign('left').run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive({ textAlign: 'left' }) ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Alinear a la izquierda">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16" />
                </svg>
            </button>

            <button @click="editor.chain().focus().setTextAlign('center').run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive({ textAlign: 'center' }) ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Centrar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M8 12h8M4 18h16" />
                </svg>
            </button>

            <button @click="editor.chain().focus().setTextAlign('right').run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive({ textAlign: 'right' }) ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Alinear a la derecha">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <button @click="editor.chain().focus().setTextAlign('justify').run()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', editor.isActive({ textAlign: 'justify' }) ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'text-neutral-700']"
                title="Justificar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Separador -->
            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Imágenes -->
            <button @click="addImage"
                class="p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200 text-neutral-700 border border-transparent hover:border-neutral-300"
                title="Insertar imagen">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>

            <!-- Separador -->
            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Deshacer/Rehacer -->
            <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', !editor.can().undo() ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700']"
                title="Deshacer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h10a8 8 0 018 8v0M3 10l6 6m-6-6l6-6" />
                </svg>
            </button>

            <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()"
                :class="['p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200', !editor.can().redo() ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700']"
                title="Rehacer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14 10l6-6m0 0l-6-6m6 6h-8a8 8 0 000 16h4" />
                </svg>
            </button>

            <!-- Separador -->
            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Limpiar formato -->
            <button @click="editor.chain().focus().unsetAllMarks().run()"
                class="p-2 rounded-md hover:bg-neutral-200 transition-colors duration-200 text-neutral-700 border border-transparent hover:border-neutral-300"
                title="Limpiar formato">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>

        <!-- Área del editor -->
        <editor-content :editor="editor"
            class="editor-content p-6 min-h-[400px] max-w-none prose prose-lg focus:outline-none" />

        <!-- Contador de caracteres y palabras -->
        <div v-if="editor"
            class="border-t border-neutral-200 px-6 py-3 bg-neutral-50 flex justify-between text-sm text-neutral-600 rounded-b-lg">
            <span class="font-medium">
                {{ editor.storage.characterCount.characters() }} caracteres •
                {{ editor.storage.characterCount.words() }} palabras
            </span>
            <span v-if="isUploading" class="text-primary-600 font-medium flex items-center">
                <svg class="w-4 h-4 inline animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Subiendo imagen...
            </span>
        </div>

        <!-- Input oculto para subir imágenes -->
        <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" class="hidden" multiple />
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    onImageUpload: {
        type: Function,
        default: null
    },
    placeholder: {
        type: String,
        default: 'Escribe tu contenido aquí...'
    }
})

const emit = defineEmits(['update:modelValue', 'imageUpload'])

const headingLevel = ref('')
const fileInput = ref(null)
const isUploading = ref(false)

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit.configure({
            codeBlock: {
                HTMLAttributes: {
                    class: 'code-block',
                },
            },
        }),
        Image.configure({
            HTMLAttributes: {
                class: 'editor-image',
            },
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        CharacterCount,
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-lg max-w-none focus:outline-none min-h-[350px]',
            placeholder: props.placeholder,
        },
        handleDrop: (view, event, slice, moved) => {
            if (!moved && event.dataTransfer?.files?.[0]) {
                const file = event.dataTransfer.files[0]
                if (file.type.startsWith('image/')) {
                    event.preventDefault()
                    handleFile(file)
                    return true
                }
            }
            return false
        },
        handlePaste: (view, event) => {
            if (event.clipboardData?.files?.[0]) {
                const file = event.clipboardData.files[0]
                if (file.type.startsWith('image/')) {
                    event.preventDefault()
                    handleFile(file)
                    return true
                }
            }
            return false
        },
    },
    onUpdate: () => {
        const html = editor.value.getHTML()
        emit('update:modelValue', html)
        updateHeadingLevel()
    },
})

const updateHeadingLevel = () => {
    if (!editor.value) return

    if (editor.value.isActive('heading', { level: 1 })) {
        headingLevel.value = '1'
    } else if (editor.value.isActive('heading', { level: 2 })) {
        headingLevel.value = '2'
    } else if (editor.value.isActive('heading', { level: 3 })) {
        headingLevel.value = '3'
    } else {
        headingLevel.value = ''
    }
}

const setHeading = () => {
    if (!editor.value) return
    headingLevel.value === ''
        ? editor.value.chain().focus().setParagraph().run()
        : editor.value.chain().focus().toggleHeading({ level: parseInt(headingLevel.value) }).run()
}

const addImage = () => {
    fileInput.value?.click()
}

const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach(handleFile)
    event.target.value = ''
}

const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona solo archivos de imagen.')
        return
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 5MB.')
        return
    }

    // Crear URL temporal
    const tempUrl = URL.createObjectURL(file)

    // Insertar imagen temporal en el editor
    if (editor.value) {
        editor.value.chain().focus().setImage({
            src: tempUrl,
            alt: file.name,
            title: 'Subiendo...'
        }).run()
    }

    // Subir imagen al servidor
    isUploading.value = true
    try {
        const permanentUrl = await uploadImageToServer(file)

        // Reemplazar URL temporal por permanente en el contenido
        replaceImageUrl(tempUrl, permanentUrl)

        // Emitir evento para que el padre sepa que hay una nueva imagen
        emit('imageUpload', {
            tempUrl,
            permanentUrl,
            filename: file.name,
            fileSize: file.size,
            fileType: file.type
        })

    } catch (error) {
        console.error('Error subiendo imagen:', error)
        alert('Error al subir la imagen. Por favor, intenta nuevamente.')
        // Remover la imagen del editor si falla el upload
        removeFailedImage(tempUrl)
    } finally {
        isUploading.value = false
        // Liberar URL temporal
        URL.revokeObjectURL(tempUrl)
    }
}

const uploadImageToServer = async (file) => {
    // Si el padre proporcionó una función custom, usarla
    if (props.onImageUpload) {
        return await props.onImageUpload(file)
    }

    // Implementación por defecto (simulada para desarrollo)
    return await defaultImageUpload(file)
}

const defaultImageUpload = async (file) => {
    // Simular upload - en producción reemplaza con tu API real
    return new Promise((resolve) => {
        setTimeout(() => {
            // En desarrollo, usamos la URL temporal como "permanente"
            const tempUrl = URL.createObjectURL(file)
            resolve(tempUrl)
        }, 1000)
    })
}

const replaceImageUrl = (tempUrl, permanentUrl) => {
    if (!editor.value) return

    const currentContent = editor.value.getHTML()
    const newContent = currentContent.replace(
        new RegExp(`src="[^"]*${escapeRegExp(tempUrl)}[^"]*"`, 'g'),
        `src="${permanentUrl}"`
    )

    if (newContent !== currentContent) {
        editor.value.commands.setContent(newContent, false)
    }
}

const removeFailedImage = (tempUrl) => {
    if (!editor.value) return

    const currentContent = editor.value.getHTML()
    const newContent = currentContent.replace(
        new RegExp(`<img[^>]*src="[^"]*${escapeRegExp(tempUrl)}[^"]*"[^>]*>`, 'g'),
        ''
    )

    if (newContent !== currentContent) {
        editor.value.commands.setContent(newContent, false)
    }
}

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Sincronizar cambios externos
watch(() => props.modelValue, (value) => {
    if (value !== editor.value?.getHTML()) {
        editor.value?.commands.setContent(value, false)
        updateHeadingLevel()
    }
})

// Limpiar el editor cuando el componente se desmonte
onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy()
    }
})
</script>

<style scoped>
.editor-content :deep(.ProseMirror) {
    outline: none;
    min-height: 350px;
    padding: 0;
}

.editor-content :deep(.ProseMirror h1) {
    font-size: 2.5em;
    font-weight: bold;
    margin: 0.67em 0;
    color: #1f2937;
    border-bottom: 2px solid #22c55e;
    padding-bottom: 0.3em;
}

.editor-content :deep(.ProseMirror h2) {
    font-size: 2em;
    font-weight: bold;
    margin: 0.83em 0;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.2em;
}

.editor-content :deep(.ProseMirror h3) {
    font-size: 1.5em;
    font-weight: bold;
    margin: 1em 0;
    color: #1f2937;
}

.editor-content :deep(.ProseMirror p) {
    margin: 1em 0;
    line-height: 1.6;
    color: #374151;
}

.editor-content :deep(.ProseMirror ul) {
    list-style-type: disc;
    padding-left: 1.5em;
    margin: 1em 0;
}

.editor-content :deep(.ProseMirror ol) {
    list-style-type: decimal;
    padding-left: 1.5em;
    margin: 1em 0;
}

.editor-content :deep(.ProseMirror li) {
    margin: 0.5em 0;
    line-height: 1.6;
}

.editor-content :deep(.ProseMirror blockquote) {
    border-left: 4px solid #22c55e;
    padding-left: 1em;
    margin: 1.5em 0;
    font-style: italic;
    color: #6b7280;
    background-color: #f9fafb;
    padding: 1em;
    border-radius: 0 0.5em 0.5em 0;
}

.editor-content :deep(.ProseMirror .code-block) {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1em;
    border-radius: 0.5em;
    overflow-x: auto;
    margin: 1.5em 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

.editor-content :deep(.ProseMirror code) {
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 0.25em;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: #dc2626;
}

/* Estilos para imágenes en el editor */
.editor-content :deep(.ProseMirror .editor-image) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5em;
    margin: 1.5em 0;
    border: 2px solid #e5e7eb;
    transition: all 0.2s ease;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.editor-content :deep(.ProseMirror .editor-image:hover) {
    border-color: #22c55e;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.editor-content :deep(.ProseMirror .ProseMirror-selectednode .editor-image) {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
}

/* Estilos para texto seleccionado y placeholders */
.editor-content :deep(.ProseMirror .is-editor-empty:first-child::before) {
    color: #9ca3af;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

.editor-content :deep(.ProseMirror:focus) {
    outline: none;
}

/* Estilos para texto alineado */
.editor-content :deep(.ProseMirror .text-align-left) {
    text-align: left;
}

.editor-content :deep(.ProseMirror .text-align-center) {
    text-align: center;
}

.editor-content :deep(.ProseMirror .text-align-right) {
    text-align: right;
}

.editor-content :deep(.ProseMirror .text-align-justify) {
    text-align: justify;
}

/* Scrollbar personalizado para el editor */
.editor-content :deep(.ProseMirror) {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
}

.editor-content :deep(.ProseMirror::-webkit-scrollbar) {
    width: 6px;
}

.editor-content :deep(.ProseMirror::-webkit-scrollbar-track) {
    background: #f1f5f9;
    border-radius: 3px;
}

.editor-content :deep(.ProseMirror::-webkit-scrollbar-thumb) {
    background: #cbd5e1;
    border-radius: 3px;
}

.editor-content :deep(.ProseMirror::-webkit-scrollbar-thumb:hover) {
    background: #94a3b8;
}
</style>