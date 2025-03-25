import styles from "./Settings.module.css"

type Props = {
  viewMode: "2D" | "3D"
  setViewMode: (viewMode: "2D" | "3D") => void
}

export const Settings = ({ viewMode, setViewMode }: Props) => (
  <div className={styles.settings}>
    <button
      style={{ paddingBlock: 4, paddingInline: 8, cursor: "pointer" }}
      onClick={() => setViewMode(viewMode === "3D" ? "2D" : "3D")}
    >
      👁️
    </button>
  </div>
)
