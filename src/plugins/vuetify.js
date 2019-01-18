import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VNavigationDrawer,VFooter,VToolbar,VBtn,
  VCard,VCombobox,VDatePicker,VDivider,VHover,VIcon,
  VInput,VItemGroup,VList,VMenu,VResponsive,
  VSelect,VSubheader,VSystemBar,VTabs,VTextarea,
  VTextField,VBadge
} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VApp, // required
    VNavigationDrawer,VFooter,VToolbar,VBtn,
    VCard,VCombobox,VDatePicker,VDivider,VHover,VIcon,
    VInput,VItemGroup,VList,VMenu,VResponsive,
    VSelect,VSubheader,VSystemBar,VTabs,VTextarea,
    VTextField,VBadge
  },
  theme: {
    primary: '#1E88E5',
    secondary: '#455A64',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
