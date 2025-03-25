import { resourceOptions } from "@/config"
import { ResourceAmount } from "@/types/global"
import styles from "./ResourceBar.module.css"

type Props = { resources: ResourceAmount }

export const ResourceBar = ({ resources }: Props) => {
  return (
    <div className={styles.resourceBar}>
      {Object.entries(resources)
        .filter(([resource, amount]) => amount > 0)
        .map(([resource, amount]) => (
          <div key={resource}>
            {
              resourceOptions.find(
                (resourceOption) => resourceOption.name === resource
              )?.icon
            }
            {amount}
          </div>
        ))}
    </div>
  )
}
