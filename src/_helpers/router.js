import Vue from 'vue';
import Router from 'vue-router';
import AuthMiddleware from '@/middleware/auth'
import GuestMiddleware from '@/middleware/guest'

import LoginPage from '@/pages/Auth/Login.vue'
import RegisterPage from '@/pages/Auth/Register.vue'
import VerifyEmailPage from '@/pages/Auth/VerifyEmail.vue'
import ForgotPasswordPage from '@/pages/Auth/ForgotPassword.vue'
import ResetPasswordPage from '@/pages/Auth/ResetPassword.vue'
import HomePage from '@/pages/Home.vue'
import ProfilePage from '@/pages/Profile.vue'

import TestPage from '@/pages/Test/Index.vue'
import ProcessBirthdayPage from '@/pages/Process/Birthday.vue'
import ProcessHeightPage from '@/pages/Process/Height.vue'
import TotalScorePage from '@/pages/TotalScore.vue'
import TodayScorePage from '@/pages/Test/TodayScore.vue'
import WarmUpsPage from '@/pages/Warmup/Index.vue'
import LogoutPage from '@/pages/Auth/Logout.vue'
import StartPage from '@/pages/Start/index.vue'
import TrainPage from '@/pages/Train/index.vue'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: LoginPage, meta: { middleware: GuestMiddleware, title: 'Login' } },
    { path: '/login', component: LoginPage, name: 'login', meta: { middleware: GuestMiddleware, title: 'Login' } },
    { path: '/signup', component: RegisterPage, name: 'register', meta: { middleware: GuestMiddleware, title: 'Signup' } },
    { path: '/verify/email/:token', component: VerifyEmailPage, name: 'verify-email', meta: { middleware: GuestMiddleware, title: 'Verify Email' } },
    { path: '/forgot/password', component: ForgotPasswordPage, name:'forgotPassword', meta: { middleware: GuestMiddleware, title: 'Forgot Password' } },
    { path: '/reset/password/:token', component: ResetPasswordPage, name: 'reset-password', meta: { middleware: GuestMiddleware, title: 'Reset Password' } },
    { path: '/home', component: HomePage, name: 'home', meta: { middleware: AuthMiddleware, title: 'Home' } },
    { path: '/tests', component: TestPage, name: 'test', meta: { middleware: AuthMiddleware, title: 'Tests' } },
    { path: '/process/birthday', component: ProcessBirthdayPage, name: 'birthday', meta: { middleware: AuthMiddleware, title: 'Birthday' } },
    { path: '/process/height', component: ProcessHeightPage, name: 'height', meta: { middleware: AuthMiddleware, title: 'Height' } },
    { path: '/total/score', component: TotalScorePage, name: 'total-score', meta: { middleware: AuthMiddleware, title: 'Total Score' } },
    { path: '/today/score', component: TodayScorePage, name: 'today-score', meta: { middleware: AuthMiddleware, title: 'Today Score' } },
    { path: '/warm-ups', component: WarmUpsPage, name: 'warm-ups', meta: { middleware: AuthMiddleware, title: 'Warm-Ups' } },
    { path: '/start', component: StartPage, name: 'start', meta: { middleware: AuthMiddleware, title: 'Start' } },
    { path: '/train', component: TrainPage, name: 'train', meta: { middleware: AuthMiddleware, title: 'Train' } },
    { path: '/profile', component: ProfilePage, name: 'profile', meta: { middleware: AuthMiddleware, title: 'Profile' } },
    { path: '/logout', component: LogoutPage, name: 'logout', meta: { middleware: AuthMiddleware, title: 'Logout' } },
  ]
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index,  1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});
