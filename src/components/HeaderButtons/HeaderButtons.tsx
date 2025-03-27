import clsx from "clsx"
import styles from "./HeaderButtons.module.css"

type Props = {
  align?: "left" | "right"
  buttons: { icon: string; isActive?: boolean; onClick: () => void }[]
  className?: string
}

export const HeaderButtons = ({
  align = "left",
  buttons,
  className,
}: Props) => (
  <div
    className={clsx(
      styles.settings,
      align === "right" && styles.alignRight,
      className
    )}
  >
    {buttons.map(({ icon, isActive, onClick }, i) => (
      <button
        key={i}
        className={clsx(styles.button, isActive && styles.active)}
        onClick={onClick}
      >
        {icon}
      </button>
    ))}
  </div>
)
