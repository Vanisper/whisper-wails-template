<template>
  <div
    :class="{ onLockLogin: showLogin }"
    class="lockscreen"
    @keyup="onLockLogin(true)"
    @mousedown.stop
    @contextmenu.prevent
  >
    <template v-if="!showLogin">
      <div class="lock-box">
        <div class="lock">
          <span class="lock-icon" title="解锁屏幕" @click="onLockLogin(true)">
            <a-icon>
              <icon-lock />
            </a-icon>
          </span>
        </div>
      </div>
      <!--充电-->
      <recharge
        :battery="battery"
        :battery-status="batteryStatus"
        :calc-discharging-time="calcDischargingTime"
        :calc-charging-time="calcChargingTime"
      />

      <div class="local-time">
        <div class="time">{{ hour }}:{{ minute }}</div>
        <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
      </div>
      <div class="computer-status">
        <span :class="{ offline: !online }" class="network">
          <icon-wifi class="network" />
        </span>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="api" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 00-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 000 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 00-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 00-11.3 0L363 475.3l-43-43a7.85 7.85 0 00-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 000 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 01-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 01-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"></path></svg>
      </div>
    </template>

    <!--登录-->
    <template v-if="showLogin">
      <div class="login-box">
        <a-avatar :size="128">
          <a-icon>
            <icon-user />
          </a-icon>
        </a-avatar>
        <div class="username">{{ loginParams.username }}</div>
        <a-input
          type="password"
          autofocus
          v-model:value="loginParams.password"
          @keyup.enter="onLogin"
          placeholder="请输入登录密码"
        >
          <template #suffix>
            <a-icon @click="onLogin" style="cursor: pointer">
              <icon-loading v-if="loginLoading" />
              <icon-arrow-right v-else />
            </a-icon>
          </template>
        </a-input>

        <div style="display: flex;width: 100%;" v-if="isLoginError">
          <span style="--tw-text-opacity: 1;color: rgba(239,68,68,var(--tw-text-opacity));">{{ errorMsg }}</span>
        </div>

        <div class="login-btn">
          <div><a @click="showLogin = false">返回</a></div>
          <div><a @click="goLogin">重新登录</a></div>
          <div><a @click="onLogin">进入系统</a></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { ResultEnum } from '@/enum/httpEnum';
import recharge from './re-charge.vue';
// import {
//     LockOutlined,
//     LoadingOutlined,
//     UserOutlined,
//     ApiOutlined,
//     ArrowRightOutlined,
//     WifiOutlined,
// } from '@vicons/antd';

import { useRouter, useRoute } from 'vue-router';
import { useOnline } from '@/hooks/useOnline';
import { useTime } from '@/hooks/useTime';
import { useBattery } from '@/hooks/useBattery';
import { useLockscreenStore } from '@/store/modules/lockscreen';
import { useUserStore } from '@/store';
import { aesEcb } from '@/utils/encrypt';

export default defineComponent({
    name: 'Lockscreen',
    components: {
        recharge,
    },
    setup() {
        const useLockscreen = useLockscreenStore();
        const userStore = useUserStore();

        // 获取时间
        const { month, day, hour, minute, second, week } = useTime();
        const { online } = useOnline();

        const router = useRouter();
        const route = useRoute();

        const { battery, batteryStatus, calcDischargingTime, calcChargingTime } = useBattery();
        const userInfo = userStore.userInfo;
        const username = userInfo.name;
        const state = reactive({
            showLogin: false,
            loginLoading: false, // 正在登录
            isLoginError: false, //密码错误
            errorMsg: '密码错误',
            loginParams: {
                username: username || '',
                password: '',
            },
        });

        // 解锁登录
        const onLockLogin = (value: boolean) => (state.showLogin = value);

        // 登录
        const onLogin = async () => {
            // if (!state.loginParams.password.trim()) {
            //     return;
            // }
            const params = {
                isLock: true,
                username: state.loginParams.username,
                password: aesEcb.encrypt(state.loginParams.password),
            };
            console.log(params);
            
            state.loginLoading = true;
            // const { code, message } = await userStore.login(params);
            // if (code === ResultEnum.SUCCESS) {
            onLockLogin(false);
            useLockscreen.setLock(false);
            // } else {
            //     state.errorMsg = message;
            //     state.isLoginError = true;
            // }
            state.loginLoading = false;
        };

        //重新登录
        const goLogin = () => {
            onLockLogin(false);
            useLockscreen.setLock(false);
            // router.replace({
            //     path: '/login',
            //     query: {
            //         redirect: route.fullPath,
            //     },
            // });
        };

        return {
            ...toRefs(state),
            online,
            month,
            day,
            hour,
            minute,
            second,
            week,
            battery,
            batteryStatus,
            calcDischargingTime,
            calcChargingTime,
            onLockLogin,
            onLogin,
            goLogin,
        };
    },
});
</script>

<style lang="less" scoped>
  .lockscreen {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    background: #000;
    color: white;
    overflow: hidden;
    z-index: 9999;

    &.onLockLogin {
      background-color: rgba(25, 28, 34, 0.88);
      backdrop-filter: blur(7px);
    }

    .login-box {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > * {
        margin-bottom: 14px;
      }

      .username {
        font-size: 30px;
      }

      .login-btn {
        display: flex;
        margin-bottom: 14px;
        margin-top: .25rem;
        justify-content: space-around;
        width: 100%;

        a {
          color: #2d8cf0;
          background: transparent;
          text-decoration: none;
          outline: none;
          cursor: pointer;
          transition: color .2s ease;
        }
      }
    }

    .lock-box {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 34px;
      z-index: 100;

      .tips {
        color: white;
        cursor: text;
      }

      .lock {
        display: flex;
        justify-content: center;

        .lock-icon {
          cursor: pointer;

          .anticon-unlock {
            display: none;
          }

          &:hover .anticon-unlock {
            display: initial;
          }

          &:hover .anticon-lock {
            display: none;
          }
        }
      }
    }

    .local-time {
      position: absolute;
      bottom: 60px;
      left: 60px;
      font-family: helvetica;

      .time {
        font-size: 70px;
      }

      .date {
        font-size: 40px;
      }
    }

    .computer-status {
      position: absolute;
      bottom: 60px;
      right: 60px;
      font-size: 24px;

      > * {
        margin-left: 14px;
      }

      .network {
        position: relative;

        &.offline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 28px;
          transform: translate(-50%, -50%) rotate(45deg);
          background-color: red;
          z-index: 10;
        }
      }
    }
  }
</style>
