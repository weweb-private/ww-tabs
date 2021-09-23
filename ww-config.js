export default {
    "editor": {
        "label": {
            "en": "Firstbase Tabs",
            "fr": "Onglets Firstbase"
        }
    },
    properties: {
        subTabLayouts: {
            defaultValue: [],
            hidden: true,
        },
        tabsListActive: {
            defaultValue: [],
            hidden: true,
        },
        tabsList: {
            defaultValue: [],
            hidden: true,
        },
        tabsContent: {
            defaultValue: [],
            hidden: true,
        },
        editActiveTabs: {
            defaultValue: false,
            editorOnly: true,
        },
            
        numberOfTabs: {
            label: { en: 'Number of tabs', fr: 'Nombre de tabs' },
            section: 'settings',
            type: 'TextSelect',
            options: {
                options: [
                    { value: '1', label: { en: '1', fr: '1' } },
                    { value: '2', label: { en: '2', fr: '2' } },
                    { value: '3', label: { en: '3', fr: '3' } },
                    { value: '4', label: { en: '4', fr: '4' } },
                    { value: '5', label: { en: '5', fr: '5' } },
                    { value: '6', label: { en: '6', fr: '6' } },
                    { value: '7', label: { en: '7', fr: '7' } },
                    { value: '8', label: { en: '8', fr: '8' } },
                    { value: '9', label: { en: '9', fr: '9' } },
                    { value: '10', label: { en: '10', fr: '10' } },
                ],
            },
            defaultValue: '6',
        },
        tabsPosition: {
            label: {
                en: 'Tabs position',
                fr: 'Position des tabs',
            },
            section: 'settings',
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'top', label: 'Top' },
                    { value: 'bottom', label: 'Bottom' },
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' },
                ],
            },
            defaultValue: 'left',
        },
        tabsContentWidth: {
            type: 'Length',
            label: { en: 'Ajust width', fr: 'Ajust width' },
            section: 'settings',
            options: {
                unitChoices: [{ value: '%', label: '%', min: 0, max: 100, step: 1 }],
            },
            defaultValue: '50%',
        },
        maxItemsPerLine: {
            type: 'Number',
            label: { en: 'Items per line', fr: 'Élements par ligne' },
            section: 'settings',
            options: {
                min: 0,
                max: 6,
                step: 1,
            },
            defaultValue: 2,
        },
        transition: {
            label: { en: 'Transition', fr: 'Transition' },
            section: 'settings',
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'none', label: { en: 'None', fr: 'Aucune' } },
                    { value: 'fade', label: { en: 'Fade', fr: 'Fade' } },
                    { value: 'fadeTopBottom', label: { en: 'Fade top / bottom', fr: 'Fade top / bottom' } },
                    { value: 'fadeLeftRight', label: { en: 'Fade right / left', fr: 'Fade right / left' } },
                ],
            },
            defaultValue: 'fade',
        },
        transitionDuration: {
            type: 'Number',
            label: { en: 'Transition duration', fr: 'Durée de la transition' },
            section: 'settings',
            options: {
                min: 0,
                max: 5,
                step: 0.1,
            },
            defaultValue:0.5 ,
        },
        turnOnOffAsctiveState: {
            type: 'Button',
            editorOnly: true,
            options: (content, sidepanelContent) => {
                if(sidepanelContent.editActiveTabs){
                    return {
                        text: { en: 'Edit unactive state', fr: "Editer l'état inactif" },
                        color: 'blue',
                        action: 'turnOffAsctiveState',
                    }
                }
                else {
                    return {
                        text: { en: 'Edit active state', fr: "Editer l'état actif" },
                        color: 'blue',
                        action: 'turnOnAsctiveState',
                    }
                }
            }
        },
    }
}
