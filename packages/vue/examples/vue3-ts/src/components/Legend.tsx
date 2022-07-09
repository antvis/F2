/** @jsxImportSource @antv/f2 */
import { withLegend } from "@antv/f2-vue"

// 自定义 Legend
const Legend = withLegend((props: Record<string, unknown>) => {
  const { items = [], itemWidth } = props

  return (
    <group
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
        //@ts-ignore
        items.map((item) => {
          const { color, name } = item
          return (
            <group
              className="legend-item"
              style={{
                width: itemWidth as number,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-item={item}
            >
              <text
                attrs={{
                  fill: color,
                  text: name,
                }}
              />
            </group>
          )
        })
      }
    </group>
  )
})

export default Legend
