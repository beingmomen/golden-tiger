import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBarcode, faChartLine, faBacon, faUser, faUsers, faUserNinja, faHouse, faFile, faEnvelope, faCartShopping } from '@fortawesome/free-solid-svg-icons'
// import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


config.autoAddCss = false
library.add(faBarcode, faChartLine, faBacon, faUser, faUsers, faUserNinja, faFile, faTwitter, faHouse, faEnvelope, faCartShopping)
Vue.component('font-awesome-icon', FontAwesomeIcon)