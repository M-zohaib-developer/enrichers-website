'use client'

export function YouTubeApiModeHelp() {
  return (
    <div
      style={{
        marginBottom: 16,
        padding: 12,
        border: '1px solid #bae6fd',
        background: '#f0f9ff',
        borderRadius: 4,
        fontSize: 13,
        color: '#0c4a6e',
      }}
    >
      API mode fetches the entire channel automatically. Paste your YouTube API key in{' '}
      <strong>Globals → Settings → YouTube</strong>. Need a key? That tab has step-by-step
      instructions and a <strong>Test connection</strong> button.
    </div>
  )
}
