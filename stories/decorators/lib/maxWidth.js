export default maxWidth => (storyFn) => (
  <div style={{
    maxWidth: `${maxWidth}px`
  }}>
    { storyFn() }
  </div>
)
