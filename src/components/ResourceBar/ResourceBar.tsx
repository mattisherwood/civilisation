import { ResourceAmount } from "@/types/global"
import styles from "./ResourceBar.module.css"

type Props = { resources: ResourceAmount }

export const ResourceBar = ({ resources }: { resources: ResourceAmount }) => {
  return (
    <div className={styles.resourceBar}>
      {Object.entries(resources).map(([resource, amount]) => (
        <p key={resource}>
          {resource}: {amount}
        </p>
      ))}
    </div>
  )
}
