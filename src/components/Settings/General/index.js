import React from 'react'
import styles from '../settings.module.css'
import CardBasic from '../../@core/cards/cardBasic'
import StackedListBasic from '../../@core/lists/stackedListBasic'
import StackedListBasicItem from '../../@core/lists/stackedListBasicItem'

const SettingsGeneral = () => {
    return (
        <CardBasic title={'General'} subtitle={'General application preferences'}>
            <StackedListBasic>
                <StackedListBasicItem>
                    <p className={styles.listItemLabel}>
                        App Theme
                    </p>
                </StackedListBasicItem>
            </StackedListBasic>
        </CardBasic>
    )
}

export default SettingsGeneral