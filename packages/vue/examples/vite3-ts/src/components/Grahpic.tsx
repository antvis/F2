/** @jsxImportSource @antv/f2 */
function View(props: Record<string, unknown>) {
  const { coord, year } = props
  // @ts-ignore
  const { left, top, width, height } = coord
  const x = left + width / 2
  const y = top + height / 2
  return (
    <group>
      <text
        attrs={{
          x,
          y,
          text: year as string,
          textAlign: "center",
          // textBaseline: 'bottom',
          fontSize: 80,
          // fontWeight: 'bold',
          fill: "#ddd",
        }}
      />
    </group>
  )
}

export default View
