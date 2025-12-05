import type { Monaco } from '@monaco-editor/react'
import { Button } from '@heroui/react'
import Editor from '@monaco-editor/react'
import { RotateCcw, Save } from 'lucide-react'
import React, { use, useEffect, useRef, useState } from 'react'
import ThemeJson from '@/assets/edite-theme/dark.json'
import { useAppStore, useConfig } from '@/store'
import { WindowLocalContext } from '../Window/WindowLocalContext'
import styles from './SystemSettings.module.scss'
import '@/utils/monaco-setup'

const VALID_FONT_ALIASES: any = {
  'line-through': 'strikethrough',
}

function normalizeFontStyleString(fontStyle?: string): string {
  if (!fontStyle) return ''

  const styles = new Set(
    fontStyle
      .split(/[\s,]+/)
      .map((style) => style.trim().toLowerCase())
      .map((style) => VALID_FONT_ALIASES[style] || style)
      .filter(Boolean)
  )

  return VALID_FONT_STYLES.filter((style) => styles.has(style)).join(' ')
}
const VALID_FONT_STYLES = [
  'italic',
  'bold',
  'underline',
  'strikethrough',
] as const
function normalizeColor(
  color: string | string[] | undefined
): string | undefined {
  // Some themes have an array of colors (not yet sure why), here we pick the first one
  // https://github.com/shikijs/shiki/issues/894
  // https://github.com/shikijs/textmate-grammars-themes/pull/117
  if (Array.isArray(color)) color = color[0]

  if (!color) return undefined

  color = (color.charCodeAt(0) === 35 ? color.slice(1) : color).toLowerCase()

  // #RGB => #RRGGBB - Monaco does not support hex color with 3 or 4 digits
  if (color.length === 3 || color.length === 4)
    color = color
      .split('')
      .map((c) => c + c)
      .join('')

  return color
}
function textmateThemeToMonacoTheme(theme: any): any {
  let rules = 'rules' in theme ? (theme.rules as any['rules']) : undefined

  if (!rules) {
    rules = []
    const themeSettings = theme.settings || theme.tokenColors

    for (const {
      scope,
      settings: { foreground, background, fontStyle } = {},
    } of themeSettings) {
      if (!foreground && !background && !fontStyle) continue
      const scopes = Array.isArray(scope) ? scope : scope ? [scope] : []

      const normalizedFontStyle = normalizeFontStyleString(fontStyle)
      const normalizedForeground = normalizeColor(foreground)
      const normalizedBackground = normalizeColor(background)

      rules.push(
        ...scopes.map((s) => ({
          token: s,
          foreground: normalizedForeground,
          background: normalizedBackground,
          fontStyle: normalizedFontStyle,
        }))
      )
    }
  }

  const colors = Object.fromEntries(
    Object.entries(theme.colors || {}).map(([key, value]) => [
      key,
      `#${normalizeColor(value as string)}`,
    ])
  )

  return {
    base: theme.type === 'light' ? 'vs' : 'vs-dark',
    inherit: false,
    colors,
    rules,
  }
}
export const SystemSettings: React.FC = () => {
  const config = useConfig()
  const updateConfig = useAppStore((state) => state.updateConfig)
  const { handleDragStart } = use(WindowLocalContext)

  const [jsonContent, setJsonContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  // Initialize local state with current config
  useEffect(() => {
    setJsonContent(JSON.stringify(config, null, 2))
  }, [config])

  const handleEditorChange = (value: string | undefined) => {
    setJsonContent(value || '')
    setIsDirty(true)
    setError(null)
  }

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonContent)
      updateConfig(parsedConfig)
      setIsDirty(false)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleReset = () => {
    setJsonContent(JSON.stringify(config, null, 2))
    setIsDirty(false)
    setError(null)
  }

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme(
      'otab-dark',
      textmateThemeToMonacoTheme(ThemeJson)
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header} onPointerDown={handleDragStart}>
        <h2>System Settings</h2>
        <div
          className={styles.actions}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Button
            variant="flat"
            color="default"
            onPress={handleReset}
            isDisabled={!isDirty}
            startContent={<RotateCcw size={16} />}
          >
            Reset
          </Button>
          <Button
            color="primary"
            onPress={handleSave}
            isDisabled={!isDirty}
            startContent={<Save size={16} />}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <Editor
          height="100%"
          defaultLanguage="json"
          theme="otab-dark"
          value={jsonContent}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
        {error && <div className={styles.error}>Error: {error}</div>}
      </div>
    </div>
  )
}
