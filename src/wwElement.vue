<template>
    <div class="tabs-object" :class="content.tabsPosition" :style="cssVariables">
        <div v-if="tabsNumber" class="tabs-container" :class="content.tabsPosition" :style="itemsPerLines">
            <div v-for="index in tabsNumber" :key="index" class="layout-container" @click="changeTab(index)">
                <div class="layout-sublayout">
                    <wwLayout
                        v-if="currentTabIndex === index || content.editActiveTabs"
                        class="layout -layout"
                        :class="{ isEditing: isEditing }"
                        :path="`tabsListActive[${index}]`"
                    />
                    <wwLayout
                        v-else
                        class="layout -layout"
                        :class="{ isEditing: isEditing }"
                        :path="`tabsList[${index}]`"
                    />
                </div>
            </div>
        </div>
        <transition :name="activeTransition" mode="out-in">
            <div :key="currentTabIndex" class="tabs-content">
                <wwLayout
                    class="layout -layout"
                    :class="{ isEditing: isEditing }"
                    :path="`tabsContent[${currentTabIndex}]`"
                />
            </div>
        </transition>
    </div>
</template>

<script>
import { getSettingsConfigurations } from './configuration';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content'],
    wwDefaultContent: {
        numberOfTabs: '6',
        tabsPosition: 'left',
        maxItemsPerLine: 2,
        transition: 'fade',
        transitionDuration: 0.5,
        tabsContentWidth: '50%',
        order: null,
        editActiveTabs: false,
        tabsContent: [],
        tabsList: [],
        tabsListActive: [],
        subTabLayouts: [],
    },
    /* wwEditor:start */
    wwEditorConfiguration({ content }) {
        return getSettingsConfigurations(content);
    },
    /* wwEditor:end */
    data() {
        return {
            currentTabIndex: 1,
            tabsNumber: 3,
            activeTransition: 'fade',
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        cssVariables() {
            return {
                '--tab-transition-duration': this.content.transitionDuration + 's',
                '--tab-width-repartition': this.content.tabsContentWidth,
                '--content-width-repartition':
                    this.content.tabsPosition === 'top' || this.content.tabsPosition === 'bottom'
                        ? '100%'
                        : `calc(100% - ${this.content.tabsContentWidth})`,
            };
        },
        itemsPerLines() {
            return {
                '--items-per-line': 100 / this.content.maxItemsPerLine + '%',
            };
        },
        getSublayoutHeight() {
            const elHeight = document.querySelectorAll('.tabs-sublayout-container');
            if (elHeight && elHeight.length && elHeight[this.currentTabIndex]) {
                return `${elHeight[this.currentTabIndex].offsetHeight}px`;
            }

            return '24px';
        },
    },
    watch: {
        'content.numberOfTabs'() {
            this.tabsNumber = parseInt(this.content.numberOfTabs);
        },
    },
    mounted() {
        this.turnOffAsctiveState();
        if (this.content.numberOfTabs) this.tabsNumber = parseInt(this.content.numberOfTabs);
    },
    beforeUnmount() {
        this.turnOffAsctiveState();
    },
    methods: {
        changeTab(index) {
            if (this.isEditing) return;
            this.order = index > this.currentTabIndex ? 'after' : 'before';
            this.handleTransition(this.order);
            this.currentTabIndex = index;
        },
        handleTransition(order) {
            switch (this.content.transition) {
                case 'fade':
                    this.activeTransition = 'fade';
                    break;
                case 'none':
                    this.activeTransition = '';
                    break;
                case 'fadeTopBottom':
                    this.activeTransition = order === 'after' ? 'fadeTop' : 'fadeBottom';
                    break;
                case 'fadeLeftRight':
                    this.activeTransition = order === 'after' ? 'fadeLeft' : 'fadeRight';
                    break;
                default:
                    this.activeTransition = 'fade';
            }
        },
        turnOnAsctiveState() {
            this.$emit('update:content', { editActiveTabs: true });
        },
        turnOffAsctiveState() {
            this.$emit('update:content', { editActiveTabs: false });
        },
    },
};
</script>

<style lang="scss" scoped>
.tabs-object {
    --tab-transition-duration: 0.5s;
    --tab-leftRight-position: 30%;
    --tab-topBottom-position: -50%;
    --content-width-repartition: 50%;
    --tab-width-repartition: 50%;

    position: relative;
    min-width: 100px;
    min-height: 100px;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    overflow: visible;

    @media (max-width: 767.98px) {
        flex-wrap: wrap;
    }

    @media (max-width: 991.98px) {
        flex-wrap: wrap;
    }

    &.bottom {
        flex-direction: column-reverse;
    }
    &.left {
        flex-direction: row;
    }
    &.right {
        flex-direction: row-reverse;
    }

    .tabs-content {
        width: var(--content-width-repartition);

        @media (max-width: 767.98px) {
            width: 100% !important;
        }

        .layout {
            flex-direction: column;
            min-width: 200px;

            &.isEditing {
                border: 1px dashed var(--ww-color-dark-500);
            }
        }
    }

    .tabs-container {
        --items-per-line: 50%;

        width: var(--tab-width-repartition);
        margin: auto;

        z-index: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        position: relative;
        min-width: 390px;

        @media (max-width: 767.98px) {
            width: 100% !important;
        }

        &.left {
            width: 50%;
            flex-direction: row;
            align-items: flex-end;
        }

        &.right {
            width: 50%;
            flex-direction: row;
            align-items: flex-start;
        }

        .layout-container {
            flex: 0 var(--items-per-line);

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .layout-sublayout {
                flex-direction: row;
                justify-content: center;
                align-items: center;

                .layout {
                    flex-direction: column;
                    width: fit-content;
                    height: fit-content;
                    min-width: 80px;

                    &.isEditing {
                        border: 1px dashed var(--ww-color-dark-500);
                    }

                    &:hover {
                        cursor: pointer;
                    }
                }

                .sublayout {
                    flex-direction: column;

                    &.isEditing {
                        border: 1px dashed var(--ww-color-dark-500);
                    }
                }
            }
        }
    }
}

// FADE

.fade-enter-active,
.fade-leave-active {
    transition: opacity var(--tab-transition-duration);
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

// FADE TOP

.fadeTop-enter-active,
.fadeTop-leave-active {
    transition: all var(--tab-transition-duration);
}
.fadeTop-enter {
    opacity: 0;
    transform: translateY(8px);
}
.fadeTop-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

// FADE BOTTOM

.fadeBottom-enter-active,
.fadeBottom-leave-active {
    transition: all var(--tab-transition-duration);
}
.fadeBottom-enter {
    opacity: 0;
    transform: translateY(-8px);
}
.fadeBottom-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

// FADE LEFT

.fadeLeft-enter-active,
.fadeLeft-leave-active {
    transition: all var(--tab-transition-duration);
}
.fadeLeft-enter {
    opacity: 0;
    transform: translateX(8px);
}
.fadeLeft-leave-to {
    opacity: 0;
    transform: translateX(-8px);
}

// FADE RIGHT

.fadeRight-enter-active,
.fadeRight-leave-active {
    transition: all var(--tab-transition-duration);
}
.fadeRight-enter {
    opacity: 0;
    transform: translateX(-8px);
}
.fadeRight-leave-to {
    opacity: 0;
    transform: translateX(8px);
}
</style>
