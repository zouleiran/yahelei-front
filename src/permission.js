import router from "./router";
// eslint-disable-next-line no-unused-vars
import store from "./store";
// eslint-disable-next-line no-unused-vars
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
// eslint-disable-next-line no-unused-vars
import {getCookie, removeToken} from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import { getToken } from '@/utils/auth'
NProgress.configure({ showSpinner: false }); // NProgress Configuration

// eslint-disable-next-line no-unused-vars
router.beforeEach(async(to, from, next) => {
      next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
