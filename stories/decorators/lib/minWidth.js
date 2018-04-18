export default minWidth => (storyFn) => (
  <div style={{
    minWidth: `${minWidth}px`
  }}>
    { storyFn() }
  </div>
)
