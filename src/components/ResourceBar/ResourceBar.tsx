import { resourceOptions } from "@/config"
import { ResourceAmount } from "@/types/global"
import clsx from "clsx"
import { useState } from "react"
import styles from "./ResourceBar.module.css"

type Props = { hidden?: boolean; resources: ResourceAmount }

const isFood = (resource: string) =>
  resource === "bread" ||
  resource === "fish" ||
  resource === "meat" ||
  resource === "wheat"

export const ResourceBar = ({ hidden, resources }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const foodResources = Object.entries(resources).filter(
    ([resource, amount]) => isFood(resource) && amount > 0
  )
  const otherResources = Object.entries(resources).filter(
    ([resource]) => !isFood(resource)
  )
  const totalFood = foodResources.reduce((acc, [_, amount]) => acc + amount, 0)

  return (
    <>
      <div className={clsx(styles.resourceBar, hidden && styles.hidden)}>
        {foodResources.length === 0 ? (
          <div key='wheat' className={styles.resourceItem}>
            🌾 0
          </div>
        ) : foodResources.length === 1 ? (
          <div key={foodResources[0][0]} className={styles.resourceItem}>
            {`${
              resourceOptions.find(
                (resourceOption) => resourceOption.name === foodResources[0][0]
              )?.icon
            } ${foodResources[0][1]}`}
          </div>
        ) : (
          <>
            <div
              key='food'
              className={clsx(
                styles.resourceItem,
                styles.resourceSummaryItem,
                isOpen && styles.open
              )}
              onClick={() => setIsOpen(!isOpen)}
            >{`🍽️ ${totalFood}`}</div>
            {isOpen && (
              <div className={styles.foodDrawer}>
                {foodResources.map(([resource, amount]) => (
                  <div key={resource} className={styles.resourceItem}>
                    {`${
                      resourceOptions.find(
                        (resourceOption) => resourceOption.name === resource
                      )?.icon
                    } ${amount}`}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {otherResources.map(([resource, amount]) => (
          <div key={resource} className={styles.resourceItem}>
            {`${
              resourceOptions.find(
                (resourceOption) => resourceOption.name === resource
              )?.icon
            } ${amount}`}
          </div>
        ))}
      </div>
    </>
  )
}
