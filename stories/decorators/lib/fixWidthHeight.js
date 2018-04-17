export default (width, height) => (storyFn) => (
  <div style={{
    minWidth: `${width}px`,
    maxWidth: `${width}px`,
    hidth: `${width}px`,
    minHeight: `${height}px`,
    maxHeight: `${height}px`,
    height: `${height}px`
  }}>
    { storyFn() }
  </div>
)
