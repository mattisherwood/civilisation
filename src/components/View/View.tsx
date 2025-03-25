"use client"

import { useRef, useState } from "react"
import styles from "./View.module.css"

type Props = {
  children: React.ReactNode
  viewMode: "2D" | "3D"
}

export const View = ({ children, viewMode }: Props) => {
  const [
    cameraPosition,
    // setCameraPosition
  ] = useState({ x: 0, y: 0 })
  //   console.log("cameraPosition", cameraPosition)
  const ref = useRef<HTMLDivElement>(null)

  //   const moveCamera = (x: number, y: number) => {
  //     setCameraPosition({
  //       x: cameraPosition.x + x,
  //       y: cameraPosition.y + y,
  //     })
  //   }

  //   useEffect(() => {
  //     // Assign arrow key presses to move camera movement
  //     // This is a simple example, you can add more complex logic here
  //     window.addEventListener("keydown", (event) => {
  //       switch (event.key) {
  //         case "ArrowUp":
  //           moveCamera(0, 1)
  //           break
  //         case "ArrowDown":
  //           moveCamera(0, -1)
  //           break
  //         case "ArrowLeft":
  //           moveCamera(1, 0)
  //           break
  //         case "ArrowRight":
  //           moveCamera(-1, 0)
  //           break
  //       }
  //     })
  //   })

  //   window.addEventListener("wheel", (event) => {
  //     moveCamera(event.deltaX, event.deltaY)
  //     event.preventDefault()
  //   })
  // }, [])

  return (
    <div
      ref={ref}
      className={styles.view}
      style={
        {
          marginTop: viewMode === "3D" ? "-30vh" : 0,
          "--cameraPositionX": `${cameraPosition.x}px`,
          "--cameraPositionY": `${cameraPosition.y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
